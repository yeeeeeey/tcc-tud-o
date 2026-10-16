
import React, { useState } from "react";
import {
  LayoutDashboard, Package, Warehouse, Truck as TruckIcon, Search as SearchIcon,
  ClipboardList, AlertTriangle, Users, Shield, Settings, ChevronDown, Bell,
  HelpCircle, CheckCircle2, Clock, Factory, Home, BarChart3, Car, MapPin, LogOut,
} from "lucide-react";
 
// ---------------------------------------------------------------------------
// Tela de Dashboard, primeira tela após o login. Mesma paleta do restante do
// site: fundo #0A0716, acento violeta (#8B5CF6/#7C3AED) com toques de ciano
// (#22D3EE), Space Grotesk nos títulos, Inter no corpo.
// ---------------------------------------------------------------------------
 
const navGroups = [
  {
    titulo: null,
    items: [{ label: "Dashboard", Icon: LayoutDashboard, active: true }],
  },
  {
    titulo: "Operações",
    items: [
      { label: "Produtos", Icon: Package },
      { label: "Armazém", Icon: Warehouse },
      { label: "Logística", Icon: TruckIcon },
      { label: "Rastreamento", Icon: SearchIcon },
    ],
  },
  {
    titulo: "Gestão",
    items: [
      { label: "Relatórios", Icon: ClipboardList },
      { label: "Alertas", Icon: AlertTriangle },
      { label: "Transportadora", Icon: TruckIcon },
      { label: "Veículos", Icon: Car },
    ],
  },
  {
    titulo: "Administração",
    items: [
      { label: "Usuários", Icon: Users },
      { label: "Perfis", Icon: Shield },
      { label: "Configuração", Icon: Settings },
    ],
  },
];
 
const stats = [
  { label: "Produtos Cadastrados", value: "248", delta: "+12% em relação ao mês anterior", positive: true, Icon: Package },
  { label: "Armazéns ativos", value: "8", link: "Ver detalhes", Icon: Warehouse },
  { label: "Em trânsito", value: "32", delta: "+6% em relação ao mês anterior", positive: true, Icon: TruckIcon },
  { label: "Entregas", value: "250", delta: "+16% em relação ao mês anterior", positive: true, Icon: CheckCircle2 },
  { label: "Atrasos", value: "5", delta: "-1% em relação ao mês anterior", positive: false, Icon: Clock },
];
 
const trackingSteps = [
  { label: "Fábrica", Icon: Factory, local: "Curitiba - PR", data: "20/05 8:30", done: true },
  { label: "Armazém", Icon: Warehouse, local: "Curitiba - PR", data: "20/05 8:30", done: true },
  { label: "Transporte", Icon: TruckIcon, local: "São Paulo - SP", data: "Em andamento", active: true },
  { label: "Centro de distribuição", Icon: MapPin, local: "São Paulo - SP", data: "21/05 12:50" },
  { label: "Cliente", Icon: Home, local: "São Paulo - SP", data: "22/06 10:30" },
];
 
const alerts = [
  { tone: "red", title: "Atraso na entrega", subtitle: "Produto #029014" },
  { tone: "orange", title: "Entrega do próximo prazo", subtitle: "Produto #629014" },
  { tone: "yellow", title: "Estoque baixo", subtitle: "Produto B — Lote L2026-05-08" },
  { tone: "cyan", title: "Manutenção programada", subtitle: "Sistema irá ficar indisponível em 25/08 às 20:00" },
];
 
const statusBreakdown = [
  { label: "Entregues", value: 142, color: "#4ADE80" },
  { label: "Em trânsito", value: 32, color: "#8B95C9" },
  { label: "Processando", value: 28, color: "#A78BFA" },
  { label: "Pendentes", value: 13, color: "#FACC15" },
  { label: "Atrasados", value: 5, color: "#F87171" },
];
 
const stockByWarehouse = [
  { label: "Armazém São Paulo", value: 2000 },
  { label: "Armazém Xique-Xique", value: 1500 },
  { label: "Armazém Curitiba", value: 1000 },
  { label: "Armazém Belo Horizonte", value: 500 },
  { label: "Armazém Não-Me-Toque", value: 250 },
  { label: "Armazém Feliz Natal", value: 50 },
];
 
const toneColors = {
  red: { bg: "rgba(248,113,113,0.14)", bar: "#F87171", text: "#FCA5A5" },
  orange: { bg: "rgba(251,146,60,0.14)", bar: "#FB923C", text: "#FDBA74" },
  yellow: { bg: "rgba(250,204,21,0.14)", bar: "#FACC15", text: "#FDE047" },
  cyan: { bg: "rgba(34,211,238,0.14)", bar: "#22D3EE", text: "#67E8F9" },
};
 
const PERFIS = {
  administrador: "Administrador",
  gerente_logistico: "Gerente logístico",
  operador: "Operador",
};

export default function DashboardScreen({ usuario, onSair }) {
  const nomeUsuario = usuario?.login ? usuario.login.split("@")[0] : "usuário";
  const inicial = nomeUsuario.charAt(0).toUpperCase();
  const perfilUsuario = PERFIS[usuario?.perfil] || "Operador";
  const [activeItem, setActiveItem] = useState("Dashboard");
 
  const totalStatus = statusBreakdown.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  const donutStops = statusBreakdown
    .map((s) => {
      const start = (acc / totalStatus) * 360;
      acc += s.value;
      const end = (acc / totalStatus) * 360;
      return `${s.color} ${start}deg ${end}deg`;
    })
    .join(", ");
 
  const maxStock = Math.max(...stockByWarehouse.map((w) => w.value));
 
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#0A0716",
        minHeight: "100vh",
        color: "#F4F2FB",
        display: "flex",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .db-display { font-family: 'Space Grotesk', sans-serif; }
 
        .db-sidebar {
          width: 240px; flex-shrink: 0; background: #0D0818;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column; padding: 20px 14px;
          position: sticky; top: 0; height: 100vh; overflow-y: auto;
        }
        .db-nav-group-title {
          font-size: 10.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
          color: #4A4568; margin: 20px 10px 8px;
        }
        .db-nav-item {
          display: flex; align-items: center; gap: 11px; padding: 9px 12px; border-radius: 10px;
          font-size: 13.5px; font-weight: 500; color: #9891B5; cursor: pointer;
          transition: background .18s ease, color .18s ease;
          border: none; background: transparent; width: 100%; text-align: left; font-family: 'Inter', sans-serif;
        }
        .db-nav-item:hover { background: rgba(255,255,255,0.04); color: #E9E6F5; }
        .db-nav-item.active {
          background: linear-gradient(135deg,#8B5CF6,#7C3AED); color: white;
          box-shadow: 0 6px 18px -8px rgba(139,92,246,0.6);
        }
        .db-sidebar-footer {
          margin-top: auto; display: flex; align-items: center; gap: 10px;
          padding: 12px; border-top: 1px solid rgba(255,255,255,0.07);
        }
        .db-avatar {
          width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg,#8B5CF6,#C084FC);
          display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;
        }
 
        .db-main { flex: 1; min-width: 0; padding: 26px 32px 60px; }
 
        .db-topbar { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-bottom: 26px; flex-wrap: wrap; }
        .db-greeting { display: flex; align-items: center; gap: 10px; }
        .db-greeting h1 { font-size: 22px; margin: 0; font-weight: 700; }
        .db-greeting p { font-size: 13px; color: #8981A8; margin: 2px 0 0; }
        .db-search {
          flex: 1; max-width: 420px; display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
          border-radius: 11px; padding: 9px 14px; color: #6E6890; min-width: 200px;
        }
        .db-search input { background: transparent; border: none; outline: none; color: #F4F2FB; font-size: 13.5px; width: 100%; }
        .db-topbar-icons { display: flex; align-items: center; gap: 14px; }
        .db-icon-btn { position: relative; color: #9891B5; cursor: pointer; }
        .db-badge {
          position: absolute; top: -6px; right: -7px; background: #F87171; color: white;
          font-size: 10px; font-weight: 700; border-radius: 999px; width: 16px; height: 16px;
          display: flex; align-items: center; justify-content: center;
        }
 
        .db-stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 22px; }
        .db-stat-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 16px 18px;
          transition: transform .2s ease, border-color .2s ease;
        }
        .db-stat-card:hover { transform: translateY(-3px); border-color: rgba(139,92,246,0.35); }
        .db-stat-icon {
          width: 38px; height: 38px; border-radius: 10px; margin-bottom: 12px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(139,92,246,0.14); color: #A78BFA;
        }
        .db-stat-value { font-size: 24px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
        .db-stat-label { font-size: 12px; color: #8981A8; margin-top: 2px; }
        .db-stat-delta { font-size: 11px; margin-top: 8px; }
        .db-stat-delta.up { color: #4ADE80; }
        .db-stat-delta.down { color: #F87171; }
        .db-stat-link { font-size: 11px; margin-top: 8px; color: #A78BFA; }
 
        .db-row-2 { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; margin-bottom: 16px; }
        .db-panel {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px; padding: 20px 22px;
        }
        .db-panel.accent-cyan { border-color: rgba(34,211,238,0.45); }
        .db-panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .db-panel-title { font-size: 15px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
        .db-panel-link {
          font-size: 12px; font-weight: 600; color: #A78BFA; background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.3); border-radius: 8px; padding: 5px 10px; cursor: pointer;
        }
 
        .db-track-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; font-size: 13px; color: #C9C3E0; }
        .db-track-pill {
          font-size: 11px; font-weight: 600; color: #A78BFA; background: rgba(139,92,246,0.12);
          border: 1px solid rgba(139,92,246,0.3); border-radius: 999px; padding: 3px 10px;
        }
        .db-track-row { display: flex; align-items: flex-start; justify-content: space-between; position: relative; margin-bottom: 20px; }
        .db-track-line {
          position: absolute; top: 20px; left: 5%; right: 5%; height: 2px;
          background: rgba(255,255,255,0.1); z-index: 0;
        }
        .db-track-node { flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 1; text-align: center; }
        .db-track-circle {
          width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.15); color: #8981A8; margin-bottom: 8px;
        }
        .db-track-node.done .db-track-circle { background: linear-gradient(135deg,#8B5CF6,#7C3AED); border-color: transparent; color: white; }
        .db-track-node.active .db-track-circle {
          background: linear-gradient(135deg,#8B5CF6,#7C3AED); border-color: transparent; color: white;
          box-shadow: 0 0 0 5px rgba(139,92,246,0.18);
        }
        .db-track-label { font-size: 12px; font-weight: 600; color: #E9E6F5; }
        .db-track-local { font-size: 10.5px; color: #8981A8; margin-top: 2px; }
        .db-track-data { font-size: 10.5px; color: #6E6890; }
        .db-track-node.active .db-track-data { color: #A78BFA; font-weight: 600; }
 
        .db-track-footer {
          display: flex; flex-wrap: wrap; gap: 10px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.07);
        }
        .db-track-chip {
          font-size: 11.5px; color: #9891B5; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 6px 12px;
        }
 
        .db-alert-item { display: flex; gap: 10px; padding: 12px 14px; border-radius: 12px; margin-bottom: 10px; }
        .db-alert-item:last-child { margin-bottom: 0; }
        .db-alert-icon { flex-shrink: 0; margin-top: 1px; }
        .db-alert-title { font-size: 13px; font-weight: 600; }
        .db-alert-subtitle { font-size: 11.5px; color: #C9C3E0; margin-top: 2px; opacity: .8; }
 
        .db-donut-wrap { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
        .db-donut {
          width: 170px; height: 170px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .db-donut-hole {
          width: 96px; height: 96px; border-radius: 50%; background: #100B20;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .db-donut-hole strong { font-size: 20px; font-family: 'Space Grotesk', sans-serif; }
        .db-donut-hole span { font-size: 10px; color: #8981A8; }
        .db-legend { display: flex; flex-direction: column; gap: 10px; font-size: 12.5px; }
        .db-legend-row { display: flex; align-items: center; gap: 8px; color: #C9C3E0; }
        .db-legend-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .db-legend-value { margin-left: auto; color: #8981A8; font-weight: 600; padding-left: 16px; }
 
        .db-stock-row { margin-bottom: 16px; }
        .db-stock-row:last-child { margin-bottom: 0; }
        .db-stock-top { display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 6px; }
        .db-stock-label { color: #C9C3E0; }
        .db-stock-value { color: #8981A8; font-weight: 600; }
        .db-stock-track { height: 6px; border-radius: 999px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .db-stock-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg,#8B5CF6,#22D3EE); }
 
        @media (max-width: 1100px) {
          .db-stats-grid { grid-template-columns: repeat(3, 1fr); }
          .db-row-2 { grid-template-columns: 1fr; }
        }
        @media (max-width: 760px) {
          .db-sidebar { display: none; }
          .db-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
 
      {/* SIDEBAR */}
      <aside className="db-sidebar">
        <div className="db-display" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 18, fontWeight: 700, padding: "6px 10px 18px" }}>
          <span
            style={{
              width: 26, height: 26, borderRadius: 8,
              background: "linear-gradient(135deg,#8B5CF6,#C084FC)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13,
            }}
          >
            ◆
          </span>
          Trilha
        </div>
 
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {group.titulo && <p className="db-nav-group-title">{group.titulo}</p>}
            {group.items.map(({ label, Icon }) => (
              <button
                key={label}
                className={`db-nav-item ${activeItem === label ? "active" : ""}`}
                onClick={() => setActiveItem(label)}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
        ))}
 
        <div className="db-sidebar-footer">
          <span className="db-avatar">{inicial}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{nomeUsuario}</div>
            <div style={{ fontSize: 11, color: "#8981A8" }}>{perfilUsuario}</div>
          </div>
          <button
            type="button"
            onClick={onSair}
            title="Sair"
            aria-label="Sair"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}
          >
            <LogOut size={16} color="#8981A8" />
          </button>
        </div>
      </aside>
 
      {/* MAIN */}
      <main className="db-main">
        {/* TOPBAR */}
        <div className="db-topbar">
          <div className="db-greeting">
            <div>
              <h1 className="db-display">Olá, {nomeUsuario}! 👋</h1>
              <p>Acompanhe toda a sua operação em tempo real.</p>
            </div>
          </div>
 
          <div className="db-search">
            <SearchIcon size={15} />
            <input placeholder="Buscar produtos, pedidos, armazéns..." />
          </div>
 
          <div className="db-topbar-icons">
            <span className="db-icon-btn">
              <Bell size={19} />
              <span className="db-badge">4</span>
            </span>
            <span className="db-icon-btn">
              <HelpCircle size={19} />
            </span>
            <span className="db-avatar" style={{ width: 32, height: 32, fontSize: 12 }}>F</span>
          </div>
        </div>
 
        {/* STATS */}
        <div className="db-stats-grid">
          {stats.map((s) => (
            <div className="db-stat-card" key={s.label}>
              <div className="db-stat-icon">
                <s.Icon size={18} />
              </div>
              <div className="db-stat-value">{s.value}</div>
              <div className="db-stat-label">{s.label}</div>
              {s.delta && (
                <div className={`db-stat-delta ${s.positive ? "up" : "down"}`}>{s.delta}</div>
              )}
              {s.link && <div className="db-stat-link">{s.link} →</div>}
            </div>
          ))}
        </div>
 
        {/* ROW 2: RASTREAMENTO + ALERTAS */}
        <div className="db-row-2">
          <div className="db-panel">
            <div className="db-panel-head">
              <span className="db-panel-title">Rastreamento em tempo real</span>
              <button className="db-panel-link">ver todos</button>
            </div>
 
            <div className="db-track-header">
              Produto <strong style={{ color: "#F4F2FB" }}>#098649</strong>
              <span className="db-track-pill">Em trânsito</span>
            </div>
 
            <div className="db-track-row">
              <div className="db-track-line" />
              {trackingSteps.map((step) => (
                <div key={step.label} className={`db-track-node ${step.done ? "done" : ""} ${step.active ? "active" : ""}`}>
                  <div className="db-track-circle">
                    {step.done ? <CheckCircle2 size={17} /> : <step.Icon size={16} />}
                  </div>
                  <div className="db-track-label">{step.label}</div>
                  <div className="db-track-local">{step.local}</div>
                  <div className="db-track-data">{step.data}</div>
                </div>
              ))}
            </div>
 
            <div className="db-track-footer">
              <span className="db-track-chip">Transportadora: Log.ul</span>
              <span className="db-track-chip">Veículo ABC-135</span>
              <span className="db-track-chip">Motorista: Zeila Cláudio</span>
              <span className="db-track-chip">Previsão de entrega: 22/07/2026 10:50</span>
            </div>
          </div>
 
          <div className="db-panel">
            <div className="db-panel-head">
              <span className="db-panel-title">Alertas recentes</span>
              <button className="db-panel-link">ver todos</button>
            </div>
            {alerts.map((a, i) => {
              const c = toneColors[a.tone];
              return (
                <div key={i} className="db-alert-item" style={{ background: c.bg }}>
                  <AlertTriangle size={16} color={c.bar} className="db-alert-icon" />
                  <div>
                    <div className="db-alert-title" style={{ color: c.text }}>{a.title}</div>
                    <div className="db-alert-subtitle">{a.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
 
        {/* ROW 3: STATUS + ESTOQUE */}
        <div className="db-row-2">
          <div className="db-panel">
            <div className="db-panel-head">
              <span className="db-panel-title">Entrega por status</span>
              <button className="db-panel-link">este mês</button>
            </div>
            <div className="db-donut-wrap">
              <div className="db-donut" style={{ background: `conic-gradient(${donutStops})` }}>
                <div className="db-donut-hole">
                  <strong>{totalStatus}</strong>
                  <span>pedidos</span>
                </div>
              </div>
              <div className="db-legend">
                {statusBreakdown.map((s) => (
                  <div className="db-legend-row" key={s.label}>
                    <span className="db-legend-dot" style={{ background: s.color }} />
                    {s.label}
                    <span className="db-legend-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          <div className="db-panel accent-cyan">
            <div className="db-panel-head">
              <span className="db-panel-title">Estoque por armazém</span>
              <button className="db-panel-link" style={{ color: "#67E8F9", background: "rgba(34,211,238,0.1)", borderColor: "rgba(34,211,238,0.3)" }}>ver todos</button>
            </div>
            {stockByWarehouse.map((w) => (
              <div className="db-stock-row" key={w.label}>
                <div className="db-stock-top">
                  <span className="db-stock-label">{w.label}</span>
                  <span className="db-stock-value">{w.value} uni</span>
                </div>
                <div className="db-stock-track">
                  <div className="db-stock-fill" style={{ width: `${(w.value / maxStock) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}