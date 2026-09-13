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
