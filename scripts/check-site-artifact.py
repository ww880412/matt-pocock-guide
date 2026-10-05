"""Independent CI gate: website commits cannot redefine the approved release."""
import argparse, hashlib, json, pathlib, re, shutil, stat, sys, zipfile

def check(site, source, stage=None):
    site, source = pathlib.Path(site), pathlib.Path(source)
    target = json.loads((source / 'packaging/release-target.json').read_text())
    release = json.loads((source / 'packaging/release-artifact.json').read_text())
    version = json.loads((source / 'packaging/codex-native.json').read_text())['version']
    assert release['version'] == version, 'release lock version differs from source'
    targets, locks = target.get('artifacts', {}), release.get('artifacts', {})
    assert isinstance(targets, dict) and isinstance(locks, dict), 'artifact approvals must be objects'
    assert set(targets) == set(locks), 'artifact target and lock hosts differ'
    assert set(targets) <= {'claude', 'devin'}, 'unknown additional host'
    artifacts = {'codex': {'downloadPath': target['downloadPath'], 'version': version, 'sha256': release['sha256']}}
    for host, location in targets.items():
        assert set(location) == {'downloadPath'}, 'invalid artifact target'
        assert set(locks[host]) == {'version', 'sha256'}, 'invalid artifact lock'
        source_manifest = json.loads((source / f'packaging/{host}/matt-pocock/.{host}-plugin/plugin.json').read_text())
        assert locks[host]['version'] == source_manifest['version'], f'{host} lock version differs from source'
        artifacts[host] = {**location, **locks[host]}
    paths = [a['downloadPath'] for a in artifacts.values()]
    assert len(paths) == len(set(paths)), 'duplicate artifact paths'
    for host, artifact in artifacts.items():
        path = artifact['downloadPath']
        assert isinstance(artifact['version'], str) and artifact['version'], 'invalid artifact version'
        assert re.fullmatch(r'downloads/[a-z0-9][a-z0-9._-]*\.zip', path), 'unsafe artifact path'
        assert re.fullmatch(r'[a-f0-9]{64}', artifact['sha256']), 'invalid artifact hash'
        archive = site / path
        assert hashlib.sha256(archive.read_bytes()).hexdigest() == artifact['sha256'], f'{host} ZIP is not the approved release'
        assert pathlib.Path(str(archive) + '.sha256').read_text().split()[0] == artifact['sha256'], f'{host} checksum differs'
        prefix = f'matt-pocock-{host}'
        with zipfile.ZipFile(archive) as z:
            names = z.namelist()
            assert len(names) == len(set(names)), 'duplicate ZIP entries'
            assert all(not n.startswith('/') and '..' not in pathlib.PurePosixPath(n).parts and '\\' not in n for n in names), 'unsafe ZIP'
            assert all(not stat.S_ISLNK(i.external_attr >> 16) for i in z.infolist()), 'ZIP symlink'
            manifest = json.loads(z.read(f'{prefix}/plugins/matt-pocock/.{host}-plugin/plugin.json'))
            assert manifest['name'] == 'matt-pocock', f'{host} manifest name differs'
            assert manifest['version'] == artifact['version'], f'{host} manifest version differs'
            if host == 'codex':
                assert manifest['interface']['websiteURL'].rstrip('/') == target['siteURL'].rstrip('/'), 'wrong website'
            else:
                build = json.loads(z.read(f'{prefix}/plugins/matt-pocock/lib/BUILD.json'))
                assert build['host'] == host and build['version'] == artifact['version'], f'{host} build identity differs'
            assert (target['siteURL'] + 'guide.html') in z.read(f'{prefix}/README.md').decode(), 'wrong install guide'
    public_files = json.loads((source / 'packaging/site-files.json').read_text())
    expected = set(public_files) | {name for a in artifacts.values() for name in (a['downloadPath'], a['downloadPath'] + '.sha256')}
    for name in expected:
        path = pathlib.PurePosixPath(name)
        assert not path.is_absolute() and '..' not in path.parts, 'unsafe public path'
        for parent in (path, *path.parents):
            assert not (site / parent).is_symlink(), f'public symlink: {name}'
    observed = {p.name for p in site.iterdir() if p.suffix in ('.html', '.css', '.js')}
    for directory in ('assets', 'downloads'):
        assert not any(p.is_symlink() for p in (site / directory).rglob('*')), f'public symlink in {directory}'
        observed.update(p.relative_to(site).as_posix() for p in (site / directory).rglob('*') if p.is_file())
    assert observed == expected, f'public file set differs: {sorted(observed ^ expected)}'
    for name in public_files:
        assert (site / name).read_bytes() == (source / 'docs/site' / name).read_bytes(), f'{name} differs from approved source'
    for host, artifact in artifacts.items():
        assert f'href="{target["siteURL"]}{artifact["downloadPath"]}"' in (site / 'index.html').read_text(), f'{host} download link differs'
    for name in ('README.md','README.en.md'):
        for host, artifact in artifacts.items():
            assert artifact['version'] in (site / name).read_text(), f'{host} {name} version differs'
    assert (site / '.github/workflows/release.yml').read_bytes() == (source / 'packaging/github-pages/release.yml').read_bytes(), 'deployment workflow differs from approved source'
    if stage is not None:
        output = pathlib.Path(stage)
        output.mkdir(parents=True, exist_ok=False)
        for name in sorted(expected):
            destination = output / name
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(site / name, destination)
        (output / '.nojekyll').touch()
    print(json.dumps({'verdict':'PASS','version':version,'sha256':release['sha256'],'artifacts':artifacts}))

if __name__ == '__main__':
    try:
        parser = argparse.ArgumentParser()
        parser.add_argument('site')
        parser.add_argument('source')
        parser.add_argument('--stage')
        args = parser.parse_args()
        check(args.site, args.source, args.stage)
    except Exception as e:
        sys.exit(f'Release gate FAIL: {e}')
