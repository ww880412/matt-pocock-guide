// Shared by the website and the bundled, local guide. No network is required.
(() => {
  const url = new URL(location.href);
  const file = url.pathname.split('/').pop() || 'index.html';
  if (!/^(index|guide|architecture|harness-map)(\.en)?\.html$/.test(file)) return;
  const current = file.endsWith('.en.html') ? 'en' : 'zh';
  const explicit = url.searchParams.get('lang');
  let saved;
  try { saved = localStorage.getItem('matt-site-language'); } catch {}
  const chosen = ['zh','en'].includes(explicit) ? explicit : current === 'en' ? 'en' : saved === 'en' ? 'en' : 'zh';
  try { localStorage.setItem('matt-site-language', chosen); } catch {}
  if (chosen !== current) {
    const next = file.replace(/(\.en)?\.html$/, chosen === 'en' ? '.en.html' : '.html');
    url.pathname = url.pathname.slice(0, url.pathname.lastIndexOf('/') + 1) + next;
    location.replace(url.href);
    return;
  }
  const updateLinks = () => {
    const currentUrl = new URL(location.href);
    for (const link of document.querySelectorAll("[data-language]")) {
      const target = new URL(link.href, currentUrl);
      target.search = currentUrl.search;
      target.searchParams.set("lang", link.dataset.language);
      target.hash = currentUrl.hash;
      link.href = target.href;
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", updateLinks);
  else updateLinks();
  addEventListener("hashchange", updateLinks);
})();
