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

// A compact, accessible website view of the authored Archify graph.
const mapData = document.getElementById('site-map-data');
if (mapData) {
  const model = JSON.parse(mapData.textContent);
  const map = document.querySelector('.site-map');
  const svg = map.querySelector('.map-edges');
  const nodes = [...map.querySelectorAll('[data-map-node]')];
  const buttons = [...document.querySelectorAll('[data-map-view]')];
  const play = document.querySelector('.map-play');
  const detail = document.querySelector('.map-detail');
  const ns = 'http://www.w3.org/2000/svg';
  let selectedView = 'all', selectedNode = null, timer;
  const make = (tag, attrs) => {
    const element = document.createElementNS(ns, tag);
    for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
    return element;
  };
  const showDetail = (title, description) => {
    detail.querySelector('strong').textContent = title;
    detail.querySelector('p').textContent = description;
  };
  const stop = () => {
    clearTimeout(timer);
    map.classList.remove('is-playing');
    play.setAttribute('aria-pressed', 'false');
    play.textContent = '播放流向';
  };
  const highlight = () => {
    const view = model.views.find(item => item.id === selectedView);
    const activeEdges = model.edges.filter(edge => selectedNode ? edge.from === selectedNode || edge.to === selectedNode : !view || (view.focus.includes(edge.from) && view.focus.includes(edge.to)));
    const activeNodes = selectedNode ? new Set([selectedNode, ...activeEdges.flatMap(edge => [edge.from, edge.to])]) : new Set(view ? view.focus : model.nodes.map(n => n.id));
    nodes.forEach(n => {
      n.classList.toggle('is-dimmed', !activeNodes.has(n.dataset.mapNode));
      n.setAttribute('aria-pressed', String(n.dataset.mapNode === selectedNode));
    });
    const ids = new Set(activeEdges.map(edge => edge.id));
    svg.querySelectorAll('.map-edge').forEach(edge => edge.classList.toggle('is-dimmed', !ids.has(edge.dataset.edgeId)));
  };
  const draw = () => {
    const bounds = map.getBoundingClientRect();
    const rects = Object.fromEntries(nodes.map(node => {
      const r = node.getBoundingClientRect();
      return [node.dataset.mapNode, {l:r.left-bounds.left,r:r.right-bounds.left,t:r.top-bounds.top,b:r.bottom-bounds.top,x:r.left-bounds.left+r.width/2,y:r.top-bounds.top+r.height/2}];
    }));
    svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
    svg.replaceChildren();
    for (const edge of model.edges) {
      const a = rects[edge.from], b = rects[edge.to];
      let points, label;
      if (edge.id === 'verify-answer') {
        const middle = (a.b + b.t) / 2;
        points = [[a.x,a.b],[a.x,middle],[b.x,middle],[b.x,b.t]];
        label = [(a.x+b.x)/2,middle-11];
      } else if (Math.abs(a.x-b.x) < 1) {
        points = [[a.x,a.b],[b.x,b.t]];
        label = [a.x+38,(a.b+b.t)/2];
      } else {
        points = [[a.r,a.y],[b.l,b.y]];
        label = [(a.r+b.l)/2,a.y-12];
      }
      const d = points.map(([x,y], i) => `${i?'L':'M'}${x} ${y}`).join(' ');
      const group = make('g', {'class':'map-edge','data-edge-id':edge.id,'data-kind':edge.variant || 'default'});
      group.append(make('path',{d,'class':'edge-line'}), make('path',{d,'class':'edge-motion'}));
      const end = points.at(-1), prev = points.at(-2), angle = Math.atan2(end[1]-prev[1],end[0]-prev[0])*180/Math.PI;
      group.append(make('path',{d:'M0 0 L-7 -3.5 L-7 3.5 Z','class':'edge-arrow',transform:`translate(${end[0]} ${end[1]}) rotate(${angle})`}));
      const text = make('text',{x:label[0],y:label[1]});
      text.textContent = edge.label;
      group.append(text);
      svg.append(group);
    }
    highlight();
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    stop(); selectedNode = null; selectedView = button.dataset.mapView;
    buttons.forEach(b => b.setAttribute('aria-pressed',String(b === button)));
    const view = model.views.find(v => v.id === selectedView);
    showDetail(view ? view.label : '三类流向，一张完整图',view ? view.note : 'Agent 发起动作，任务核心维护状态，原生答复从宿主记录核验。选择流向或节点，可逐项查看。');
    highlight();
  }));
  nodes.forEach(node => node.addEventListener('click', () => {
    stop(); selectedNode = selectedNode === node.dataset.mapNode ? null : node.dataset.mapNode;
    if (!selectedNode) { buttons.find(b => b.dataset.mapView === selectedView).click(); return; }
    const current = model.nodes.find(n => n.id === selectedNode);
    const label = id => model.nodes.find(n => n.id === id).label;
    const relations = model.edges.filter(e => e.from === selectedNode || e.to === selectedNode).map(e => `${label(e.from)} → ${label(e.to)}：${e.label}`);
    showDetail(current.label, current.sublabel + '。' + relations.join('；') + '。');
    highlight();
  }));
  play.addEventListener('click', () => {
    if (map.classList.contains('is-playing')) { stop(); return; }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showDetail('已遵循减少动态效果设置','当前流向保持高亮，箭头说明方向；播放动画已停用。'); return;
    }
    map.classList.add('is-playing'); play.setAttribute('aria-pressed','true'); play.textContent = '停止播放';
    timer = setTimeout(stop,6000);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', stop);
  document.querySelector('.map-toolbar').hidden = false;
  new ResizeObserver(draw).observe(map);
  draw();
}
