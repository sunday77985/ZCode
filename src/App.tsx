import { useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Copy,
  FileText,
  Globe2,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Plus,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react'
import { activity, projects, type Project } from './data/projects'

type View = '概览' | '启动项目' | '我的资产' | '文档'

function App() {
  const [activeView, setActiveView] = useState<View>('概览')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [toast, setToast] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showLaunchModal, setShowLaunchModal] = useState(false)

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const connectWallet = () => {
    setWalletConnected((current) => !current)
    notify(walletConnected ? '钱包已断开连接' : '演示钱包已连接')
  }

  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.symbol} ${project.description}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><span>z</span></div>
          <div>
            <strong>ZCode</strong>
            <small>PRIVACY PROTOCOL</small>
          </div>
        </div>
        <div className="network-pill"><i /> SOLANA 主网 <ChevronDown size={14} /></div>
        <nav className="main-nav" aria-label="主导航">
          {([
            ['概览', LayoutDashboard],
            ['启动项目', Rocket],
            ['我的资产', Wallet],
            ['文档', FileText],
          ] as const).map(([label, Icon]) => (
            <button key={label} className={activeView === label ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveView(label); setMobileOpen(false) }}>
              <Icon size={18} /> <span>{label}</span>
              {label === '启动项目' && <b>3</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="security-note">
            <ShieldCheck size={18} />
            <div><strong>隐私优先</strong><span>由 Zcash 保护的流动性</span></div>
          </div>
          <button className="help-link" onClick={() => setActiveView('文档')}><CircleHelp size={16} /> 帮助中心</button>
          <div className="sidebar-foot">v0.1.0 · 演示环境</div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="打开菜单"><Menu size={22} /></button>
          <div className="breadcrumb"><span>工作台</span><span>/</span><strong>{activeView}</strong></div>
          <div className="topbar-actions">
            <button className="icon-button" onClick={() => notify('目前没有新的通知')} aria-label="通知"><Bell size={18} /><i className="notification-dot" /></button>
            <button className={walletConnected ? 'wallet-button connected' : 'wallet-button'} onClick={connectWallet}>
              <Wallet size={16} /> {walletConnected ? '8xD...3mQ' : '连接钱包'}
            </button>
            <button className="avatar" aria-label="用户菜单">Z</button>
          </div>
        </header>

        <div className="page-wrap">
          {activeView === '概览' && <Overview searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredProjects={filteredProjects} notify={notify} setShowLaunchModal={setShowLaunchModal} />}
          {activeView === '启动项目' && <LaunchView setShowLaunchModal={setShowLaunchModal} />}
          {activeView === '我的资产' && <AssetsView notify={notify} />}
          {activeView === '文档' && <DocsView />}
        </div>
      </main>

      {showLaunchModal && <LaunchModal close={() => setShowLaunchModal(false)} notify={notify} />}
      {toast && <div className="toast"><Check size={17} /> {toast}</div>}
    </div>
  )
}

function Overview({ searchTerm, setSearchTerm, filteredProjects, notify, setShowLaunchModal }: { searchTerm: string; setSearchTerm: (value: string) => void; filteredProjects: Project[]; notify: (message: string) => void; setShowLaunchModal: (show: boolean) => void }) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> 新一代链上启动台</div>
          <h1>让好项目，<em>安全地</em><br />走向世界。</h1>
          <p>在 Solana 上发现、参与和构建下一代项目。<br />通过 Zcash 支持的流动性池，让资产隐私成为默认选择。</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>探索项目 <ArrowUpRight size={17} /></button><button className="text-button" onClick={() => setShowLaunchModal(true)}>发起一个项目 <Plus size={16} /></button></div>
        </div>
        <div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-core"><LockKeyhole size={34} /><span>ZK</span></div><div className="float-card float-card-top"><ShieldCheck size={16} /><span>隐私流动性</span><strong>已启用</strong></div><div className="float-card float-card-bottom"><BarChart3 size={17} /><span>总锁仓价值</span><strong>$2.84M</strong></div></div>
      </section>

      <section className="stats-strip"><div><span>平台总锁仓价值</span><strong>$2,840,612</strong><small className="positive">↗ 12.8%</small></div><div><span>已完成项目</span><strong>28</strong><small>过去 90 天</small></div><div><span>社区参与者</span><strong>14,892</strong><small>来自 61 个国家</small></div><div><span>平均参与回报</span><strong>24.6%</strong><small className="positive">链上数据</small></div></section>

      <section className="projects-section" id="projects"><div className="section-heading"><div><span className="section-kicker">发现机会</span><h2>正在进行的启动</h2></div><button className="outline-button" onClick={() => notify('已加载全部项目')} >查看全部 <ArrowUpRight size={15} /></button></div><div className="toolbar"><div className="search-box"><Search size={16} /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="搜索项目名称或代币" /></div><button className="filter-button">全部状态 <ChevronDown size={15} /></button><button className="filter-button">排序：最新 <ChevronDown size={15} /></button></div><div className="project-grid">{filteredProjects.map((project) => <ProjectCard key={project.symbol} project={project} notify={notify} />)}</div></section>

      <section className="bottom-grid"><div className="activity-panel"><div className="panel-title"><div><span className="section-kicker">实时动态</span><h2>链上活动</h2></div><button className="more-button" onClick={() => notify('活动记录将在连接钱包后完整显示')}>查看全部</button></div><div className="activity-list">{activity.map(([symbol, label, value, time, direction]) => <div className="activity-row" key={`${symbol}-${time}`}><div className={`activity-icon ${direction}`}>{direction === 'plus' ? <Plus size={16} /> : direction === 'up' ? <ArrowUpRight size={16} /> : <Check size={16} />}</div><div className="activity-name"><strong>{label}</strong><span>{symbol}</span></div><b>{value}</b><time>{time}</time></div>)}</div></div><div className="invite-panel"><div className="invite-symbol"><Globe2 size={19} /></div><span className="section-kicker">社区计划</span><h2>和朋友一起<br /><em>建设未来。</em></h2><p>邀请朋友加入 ZCode，双方都能获得平台积分。</p><button className="dark-button" onClick={() => notify('邀请链接已复制到剪贴板')}><Copy size={15} /> 复制邀请链接</button></div></section>
    </>
  )
}

function ProjectCard({ project, notify }: { project: Project; notify: (message: string) => void }) {
  return <article className="project-card"><div className="project-artwork"><img src={project.artwork} alt={`${project.name} 项目视觉`} /><span className="artwork-label">精选项目</span></div><div className="project-card-top"><div className={`project-logo ${project.accent}`}>{project.symbol.slice(0, 1)}</div><div><h3>{project.name}</h3><span>{project.symbol} · Solana</span></div><span className="status-tag">{project.status}</span></div><p>{project.description}</p><div className="progress-label"><span>募集进度</span><strong>{project.progress}%</strong></div><div className="progress-track"><i style={{ width: `${project.progress}%` }} /></div><div className="card-meta"><div><small>已募集</small><strong>{project.raised} SOL</strong></div><div><small>目标</small><strong>{project.target} SOL</strong></div><div><small>参与者</small><strong>{project.participants}</strong></div></div><button className="card-button" onClick={() => notify(`已打开 ${project.name} 的参与页面`)}>查看项目 <ArrowUpRight size={15} /></button></article>
}

function LaunchView({ setShowLaunchModal }: { setShowLaunchModal: (show: boolean) => void }) { return <section className="inner-page"><div className="page-intro"><span className="section-kicker">项目工具</span><h1>启动一个新项目</h1><p>使用清晰的配置流程，在 Solana 生态中发布你的项目，并选择由 Zcash 支持的隐私流动性方案。</p><button className="primary-button" onClick={() => setShowLaunchModal(true)}><Rocket size={17} /> 开始配置</button></div><div className="steps"><div className="step active"><b>01</b><div><strong>项目信息</strong><span>名称、代币和品牌信息</span></div></div><div className="step"><b>02</b><div><strong>发行参数</strong><span>供应量和分配计划</span></div></div><div className="step"><b>03</b><div><strong>流动性方案</strong><span>公开或隐私池配置</span></div></div></div><div className="info-band"><ShieldCheck size={22} /><div><strong>每个项目都会经过基础检查</strong><p>包括合约地址、流动性锁定状态和风险披露。ZCode 不代替用户做投资判断。</p></div></div></section> }

function AssetsView({ notify }: { notify: (message: string) => void }) { return <section className="inner-page"><div className="page-intro split"><div><span className="section-kicker">资产中心</span><h1>我的资产</h1><p>连接钱包后，可以查看你的参与份额、领取状态和链上历史。</p></div><button className="outline-button" onClick={() => notify('请先连接钱包查看完整资产')}>连接钱包 <Wallet size={15} /></button></div><div className="asset-overview"><div><span>总资产估值</span><strong>$0.00</strong><small>演示账户暂未连接</small></div><div><span>可领取奖励</span><strong>0.00 <i>SOL</i></strong><small>下次结算：—</small></div><div><span>参与项目</span><strong>0</strong><small>历史参与 0 次</small></div></div><div className="empty-state"><div className="empty-icon"><Wallet size={24} /></div><h2>连接钱包开始使用</h2><p>你的参与记录和资产数据会在这里安全展示。</p><button className="primary-button" onClick={() => notify('演示钱包连接功能已触发')}><Wallet size={16} /> 连接演示钱包</button></div></section> }

function DocsView() { return <section className="inner-page docs-page"><div className="page-intro"><span className="section-kicker">知识库</span><h1>了解 ZCode</h1><p>从第一次连接钱包，到设计一个透明、可验证的代币启动计划。</p></div><div className="docs-grid"><article><div className="doc-number">01</div><h2>什么是 ZCode？</h2><p>ZCode 是面向 Solana 生态的项目启动台，帮助社区发现早期项目、理解风险并参与公开的代币启动流程。</p><a href="#">阅读概览 <ArrowUpRight size={14} /></a></article><article><div className="doc-number">02</div><h2>隐私流动性如何工作？</h2><p>项目可以选择将流动性与 Zcash 资产配对。配对本身不会改变 Solana 资产的所有权规则，具体隐私能力取决于实际部署的协议与合规环境。</p><a href="#">查看技术说明 <ArrowUpRight size={14} /></a></article><article><div className="doc-number">03</div><h2>安全与风险</h2><p>所有链上交易都有不可逆风险。请核对合约地址、流动性锁定状态和项目披露，切勿投入无法承受损失的资产。</p><a href="#">阅读安全指南 <ArrowUpRight size={14} /></a></article></div></section> }

function LaunchModal({ close, notify }: { close: () => void; notify: (message: string) => void }) { const [submitted, setSubmitted] = useState(false); return <div className="modal-backdrop" onMouseDown={close}><div className="launch-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={close} aria-label="关闭"><X size={19} /></button>{submitted ? <div className="modal-success"><div className="success-mark"><Check size={28} /></div><h2>配置草稿已保存</h2><p>这是演示环境。正式发布前，还需要完成钱包签名、合约审计和风险披露。</p><button className="primary-button" onClick={close}>返回工作台</button></div> : <><span className="section-kicker">创建项目</span><h2>填写项目基础信息</h2><p className="modal-lead">先保存一个草稿，稍后再完善发行与流动性参数。</p><label>项目名称<input placeholder="例如：Aurora Network" /></label><label>代币符号<input placeholder="例如：AURA" /></label><label>一句话介绍<textarea placeholder="项目想解决什么问题？" rows={3} /></label><label className="check-label"><input type="checkbox" /> 我已阅读项目发布与风险披露要求</label><button className="primary-button modal-submit" onClick={() => { setSubmitted(true); notify('项目草稿已保存') }}><Plus size={17} /> 保存项目草稿</button></>}</div></div> }

export default App
