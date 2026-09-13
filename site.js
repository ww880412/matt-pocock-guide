const status = document.createElement('span');
status.className = 'sr-only';
status.setAttribute('role', 'status');
document.body.append(status);

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = document.getElementById(button.dataset.copy);
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = '已复制';
      status.textContent = '已复制，请在 Codex 输入框粘贴。';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = '请手动复制';
      status.textContent = '无法访问剪贴板，已选中文本，请手动复制。';
    }
    setTimeout(() => { button.textContent = '复制'; }, 2400);
  });
});

const links = [...document.querySelectorAll('.doc-nav a[href^="#"]')];
function setActive(id) {
  links.forEach((link) => {
    const active = link.hash === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
if (links.length) {
  const sections = links.map((link) => document.querySelector(link.hash)).filter(Boolean);
  let scheduled = false;
  const update = () => {
    const offset = document.querySelector('.header').offsetHeight + 52;
    let current = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top <= offset) current = section;
    if (current) setActive(current.id);
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('hashchange', () => requestAnimationFrame(update));
  update();
}

// Enlarge the same architecture diagram without hiding its inline overview.
const diagram = document.querySelector('.harness-map .desktop-map');
const diagramDialog = document.querySelector('.diagram-dialog');
const diagramOpen = document.querySelector('.diagram-open');
if (diagram && diagramDialog && diagramOpen) {
  const viewport = diagramDialog.querySelector('.diagram-viewport');
  const enlarged = diagram.cloneNode(true);
  // Keep SVG paint-server and accessibility IDs unique within the document.
  for (const element of [enlarged, ...enlarged.querySelectorAll('*')]) {
    if (element.id) element.id += '-enlarged';
    for (const attribute of [...element.attributes]) {
      if (attribute.name === 'aria-labelledby') {
        element.setAttribute(attribute.name, attribute.value.split(' ').map(id => id + '-enlarged').join(' '));
      } else if (attribute.value.includes('url(#')) {
        element.setAttribute(attribute.name, attribute.value.replace(/url\(#([^)]+)\)/g, 'url(#$1-enlarged)'));
      }
    }
  }
  viewport.append(enlarged);
  let scale = 1;
  const setScale = value => {
    scale = Math.max(0.2, Math.min(2.5, value));
    enlarged.style.width = (1120 * scale) + 'px';
  };
  const fit = () => setScale(Math.min(1, (viewport.clientWidth - 32) / 1120, (viewport.clientHeight - 32) / 690));
  diagramOpen.hidden = false;
  diagramOpen.addEventListener('click', () => {
    diagramDialog.showModal();
    setScale(1);
    viewport.scrollTo(0, 0);
  });
  diagramDialog.querySelector('[data-diagram-close]').addEventListener('click', () => diagramDialog.close());
  for (const button of diagramDialog.querySelectorAll('[data-zoom]')) {
    button.addEventListener('click', () => {
      if (button.dataset.zoom === 'fit') fit();
      else if (button.dataset.zoom === 'actual') setScale(1);
      else setScale(scale * (button.dataset.zoom === 'in' ? 1.25 : 0.8));
    });
  }
}
