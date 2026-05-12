/* InventiTrack — Dados integrados com a API Spring Boot */

window.IT = window.IT || {};

IT.SECTORS = [
  { id: 'mfg', name: 'Manufatura', color: '#C31D10' },
  { id: 'mnt', name: 'Manutenção', color: '#E42A5D' },
  { id: 'log', name: 'Logística', color: '#4A8DE0' },
  { id: 'qc',  name: 'Qualidade', color: '#2EA66A' },
  { id: 'ti',  name: 'TI', color: '#9B59E0' },
  { id: 'lab', name: 'Laboratório', color: '#E0A02E' },
];

IT.CATEGORIES = [
  { id: 'epi', name: 'EPI', icon: '🦺' },
  { id: 'fer', name: 'Ferramentas', icon: '🔧' },
  { id: 'med', name: 'Medição', icon: '📏' },
  { id: 'ti',  name: 'TI', icon: '💻' },
  { id: 'lab', name: 'Laboratório', icon: '🧪' },
  { id: 'cons', name: 'Consumíveis', icon: '📦' },
];

IT.REASONS = [
  'Manutenção preventiva',
  'Manutenção corretiva',
  'Uso diário / produção',
  'Troca de turno',
  'Treinamento',
];

// Inicializa arrays vazios
IT.PRODUCTS = [];
IT.USERS = [];
IT.WITHDRAWALS = [];

// Função assíncrona para buscar os dados reais do Java
window.IT_LoadData = async function() {
    try {
        const [resProd, resUsu, resRet] = await Promise.all([
            fetch('/api/produtos'),
            fetch('/api/usuarios'),
            fetch('/api/retiradas')
        ]);
        
        if (resProd.ok) IT.PRODUCTS = await resProd.json();
        if (resUsu.ok) IT.USERS = await resUsu.json();
        if (resRet.ok) IT.WITHDRAWALS = await resRet.json();
        
    } catch (e) {
        console.error("Erro ao conectar com a API:", e);
    }
};

// helpers
IT.userById = id => IT.USERS.find(u => u.id === id) || { name: 'Desconhecido', role: '', sector: 'mfg' };
IT.productById = id => IT.PRODUCTS.find(p => p.id === id) || { name: 'Deletado', sku: '---', cat: 'cons' };
IT.userByBadge = b => IT.USERS.find(u => u.badge === b);
IT.sectorById = id => IT.SECTORS.find(s => s.id === id) || IT.SECTORS[0];
IT.categoryById = id => IT.CATEGORIES.find(c => c.id === id) || IT.CATEGORIES[0];

IT.fmtBRL = v => 'R$ ' + Number(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
IT.fmtTime = iso => {
  if (!iso) return '--:--';
  const d = new Date(iso);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};
IT.fmtDate = iso => {
  if (!iso) return '--/--/----';
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
IT.fmtDateTime = iso => IT.fmtDate(iso) + ' ' + IT.fmtTime(iso);
IT.fmtRel = iso => {
  if (!iso) return '';
  const d = new Date(iso);
  const diff = (new Date() - d) / 1000;
  if (diff < 60) return 'agora';
  if (diff < 3600) return Math.floor(diff/60) + ' min atrás';
  if (diff < 86400) return Math.floor(diff/3600) + 'h atrás';
  if (diff < 86400*7) return Math.floor(diff/86400) + 'd atrás';
  return IT.fmtDate(iso);
};
IT.initials = name => (name || '').split(' ').filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase() || 'U';

// --- ADICIONE NO FINAL DO SEU data.js ---

window.IT_SalvarProduto = async function(produto) {
  try {
      await fetch('/api/produtos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(produto)
      });
      await window.IT_LoadData(); // Recarrega os dados atualizados do banco
  } catch (e) { console.error("Erro ao salvar produto:", e); }
};

window.IT_SalvarRetirada = async function(retirada) {
  try {
      await fetch('/api/retiradas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(retirada)
      });
      await window.IT_LoadData(); // Recarrega as retiradas
  } catch (e) { console.error("Erro ao salvar retirada:", e); }
};

window.IT_SalvarUsuario = async function(usuario) {
  try {
      await fetch('/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(usuario)
      });
      await window.IT_LoadData(); // Recarrega os dados do banco
  } catch (e) { console.error("Erro ao salvar usuário:", e); }
};