/* InventiTrack — theme + tweaks panel (vanilla JS, no React) */

(function(){
    const KEY = 'it-tweaks-v1';
    const DEFAULTS = /*EDITMODE-BEGIN*/{
      "theme": "dark",
      "style": "refined",
      "showLabels": true
    }/*EDITMODE-END*/;
  
    function load() {
      try {
        const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
        return Object.assign({}, DEFAULTS, saved);
      } catch { return Object.assign({}, DEFAULTS); }
    }
    function save(t) {
      localStorage.setItem(KEY, JSON.stringify(t));
    }
    function apply(t) {
      document.documentElement.dataset.theme = t.theme;
      document.documentElement.dataset.style = t.style;
    }
  
    // Apply ASAP — even before DOMContentLoaded — to avoid FOUC
    const tweaks = load();
    apply(tweaks);
    window.IT_TWEAKS = tweaks;
  
    // expose set
    window.IT_setTweak = function(patch) {
      Object.assign(tweaks, patch);
      save(tweaks);
      apply(tweaks);
      try {
        window.parent.postMessage({type: '__edit_mode_set_keys', edits: patch}, '*');
      } catch {}
      window.dispatchEvent(new CustomEvent('it-tweaks-change', {detail: tweaks}));
    };
  
    // ---------- panel HTML ----------
    function buildPanel() {
      if (document.getElementById('it-tweaks-panel')) return;
      const el = document.createElement('div');
      el.id = 'it-tweaks-panel';
      el.innerHTML = `
        <style>
          #it-tweaks-panel {
            position: fixed; right: 20px; bottom: 20px; z-index: 9999;
            width: 280px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            font-family: var(--font-sans);
            color: var(--text);
            font-size: 13px;
            overflow: hidden;
            display: none;
          }
          #it-tweaks-panel.open { display: block; }
          .tw-head {
            display: flex; align-items: center; justify-content: space-between;
            padding: 12px 14px;
            border-bottom: 1px solid var(--border);
          }
          .tw-title {
            font-weight: 600; font-size: 13px;
            display: flex; align-items: center; gap: 8px;
          }
          .tw-title::before {
            content: ""; width: 6px; height: 6px; border-radius: 50%;
            background: var(--accent);
          }
          .tw-x {
            background: transparent; border: 0; cursor: pointer;
            color: var(--muted); font-size: 18px; line-height: 1;
            padding: 2px 6px; border-radius: 4px;
          }
          .tw-x:hover { background: var(--surface-2); color: var(--text); }
          .tw-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 16px; }
          .tw-section { display: flex; flex-direction: column; gap: 8px; }
          .tw-label {
            font-size: 11px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--muted);
            font-weight: 600;
          }
          .tw-seg {
            display: grid; grid-template-columns: 1fr 1fr;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 3px;
            gap: 3px;
          }
          .tw-seg button {
            padding: 7px 10px;
            background: transparent;
            border: 0;
            border-radius: 4px;
            color: var(--muted);
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.15s var(--ease);
          }
          .tw-seg button.on {
            background: var(--surface);
            color: var(--text);
            box-shadow: var(--shadow-sm);
          }
          .tw-style-card {
            padding: 10px 12px;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            cursor: pointer;
            display: flex; gap: 10px; align-items: center;
            transition: all 0.15s var(--ease);
          }
          .tw-style-card.on { border-color: var(--accent); background: var(--accent-soft); }
          .tw-style-card .preview {
            width: 36px; height: 28px; border-radius: 4px; flex-shrink: 0;
            border: 1px solid var(--border);
            background: var(--brand-grad);
          }
          .tw-style-card .info { display: flex; flex-direction: column; gap: 2px; }
          .tw-style-card .info b { font-size: 12px; font-weight: 600; }
          .tw-style-card .info small { font-size: 11px; color: var(--muted); }
          #it-tweaks-toggle {
            position: fixed; right: 20px; bottom: 20px; z-index: 9998;
            width: 44px; height: 44px; border-radius: 50%;
            background: var(--surface);
            border: 1px solid var(--border);
            box-shadow: var(--shadow-md);
            cursor: pointer; display: grid; place-items: center;
            color: var(--text);
          }
          #it-tweaks-toggle:hover { background: var(--surface-2); }
          #it-tweaks-toggle.hidden { display: none; }
        </style>
        <div class="tw-head">
          <div class="tw-title">Tweaks</div>
          <button class="tw-x" data-tw-close>×</button>
        </div>
        <div class="tw-body">
          <div class="tw-section">
            <div class="tw-label">Tema</div>
            <div class="tw-seg" data-tw="theme">
              <button data-val="dark">Dark</button>
              <button data-val="light">Light</button>
            </div>
          </div>
          <div class="tw-section">
            <div class="tw-label">Estilo</div>
            <div class="tw-seg" data-tw="style">
              <button data-val="refined">Refinado</button>
              <button data-val="bold">Bold</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(el);
  
      const toggle = document.createElement('button');
      toggle.id = 'it-tweaks-toggle';
      toggle.title = 'Abrir Tweaks';
      toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
      document.body.appendChild(toggle);
  
      function update() {
        el.querySelectorAll('.tw-seg').forEach(seg => {
          const k = seg.dataset.tw;
          seg.querySelectorAll('button').forEach(b => {
            b.classList.toggle('on', b.dataset.val === tweaks[k]);
          });
        });
      }
      update();
  
      el.querySelectorAll('.tw-seg button').forEach(b => {
        b.addEventListener('click', () => {
          const k = b.parentElement.dataset.tw;
          const v = b.dataset.val;
          IT_setTweak({ [k]: v });
          update();
        });
      });
      el.querySelector('[data-tw-close]').addEventListener('click', close);
  
      function open() { el.classList.add('open'); toggle.classList.add('hidden'); }
      function close() {
        el.classList.remove('open'); toggle.classList.remove('hidden');
        try { window.parent.postMessage({type: '__edit_mode_dismissed'}, '*'); } catch {}
      }
      toggle.addEventListener('click', open);
  
      window.addEventListener('message', e => {
        if (!e.data || typeof e.data !== 'object') return;
        if (e.data.type === '__activate_edit_mode') open();
        if (e.data.type === '__deactivate_edit_mode') close();
      });
      try {
        window.parent.postMessage({type: '__edit_mode_available'}, '*');
      } catch {}
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildPanel);
    } else {
      buildPanel();
    }
  })();
  