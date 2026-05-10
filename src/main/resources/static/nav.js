/* InventiTrack — shared header (injected into pages) */

window.IT_renderNav = function(activeKey){
    const links = [
      { key: 'index', label: 'Início', href: 'index.html', icon: 'M3 12l9-9 9 9M5 10v10h14V10' },
      { key: 'retirada', label: 'Retirada', href: 'retirada.html', icon: 'M5 12h14M13 5l7 7-7 7' },
      { key: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: 'M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 9h8V3h-8z' },
      { key: 'admin', label: 'Administração', href: 'admin.html', icon: 'M12 4v16m-8-8h16' },
    ];
  
    const linksHtml = links.map(l => `
      <a href="${l.href}" class="nav-link ${activeKey === l.key ? 'active' : ''}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${l.icon}"/></svg>
        ${l.label}
      </a>
    `).join('');
  
    const now = new Date('2026-05-08T18:30:00');
    const dateStr = now.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });
  
    return `
      <nav class="nav">
        <a href="index.html" class="nav-brand">
          <div class="nav-brand-name">
            <span>InventiTrack</span>
          </div>
        </a>
        <div class="nav-links">${linksHtml}</div>
        <div class="nav-right">
          <span class="nav-pill"><span class="dot"></span> ${dateStr}</span>
          <div class="avatar" title="Você">AS</div>
        </div>
      </nav>
    `;
  };
  