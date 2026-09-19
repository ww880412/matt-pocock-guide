"""Independent CI gate: website commits cannot redefine the approved release."""
import hashlib, json, pathlib, sys, zipfile

def check(site, source):
    site, source = pathlib.Path(site), pathlib.Path(source)
    target = json.loads((source / 'packaging/release-target.json').read_text())
    release = json.loads((source / 'packaging/release-artifact.json').read_text())
    version = json.loads((source / 'packaging/codex-native.json').read_text())['version']
    assert release['version'] == version, 'release lock version differs from source'
    archive = site / target['downloadPath']
    assert hashlib.sha256(archive.read_bytes()).hexdigest() == release['sha256'], 'ZIP is not the approved release'
    assert archive.with_suffix('.zip.sha256').read_text().split()[0] == release['sha256'], 'checksum differs'
    with zipfile.ZipFile(archive) as z:
        names = z.namelist()
        assert len(names) == len(set(names)), 'duplicate ZIP entries'
        assert all(not n.startswith('/') and '..' not in pathlib.PurePosixPath(n).parts for n in names), 'unsafe ZIP'
        manifest = json.loads(z.read('matt-pocock-codex/plugins/matt-pocock/.codex-plugin/plugin.json'))
        assert manifest['version'] == version, 'manifest version differs'
        assert manifest['interface']['websiteURL'].rstrip('/') == target['siteURL'].rstrip('/'), 'wrong website'
        assert (target['siteURL'] + 'guide.html') in z.read('matt-pocock-codex/README.md').decode(), 'wrong install guide'
    for name in ('index.html', 'guide.html'):
        assert (site / name).read_bytes() == (source / 'docs/site' / name).read_bytes(), f'{name} differs from approved source'
    assert f'href="{target["siteURL"]}{target["downloadPath"]}"' in (site / 'index.html').read_text(), 'wrong download link'
    for name in ('README.md','README.en.md'):
        assert version in (site / name).read_text(), f'{name} version differs'
    assert (site / '.github/workflows/release.yml').read_bytes() == (source / 'packaging/github-pages/release.yml').read_bytes(), 'deployment workflow differs from approved source'
    print(json.dumps({'verdict':'PASS','version':version,'sha256':release['sha256']}))

if __name__ == '__main__':
    try:
        check(sys.argv[1], sys.argv[2])
    except Exception as e:
        sys.exit(f'Release gate FAIL: {e}')
