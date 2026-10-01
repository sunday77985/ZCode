export type Project = {
  name: string
  symbol: string
  description: string
  progress: number
  raised: string
  target: string
  participants: number
  status: string
  accent: string
  artwork: string
}

export const projects: Project[] = [
  {
    name: 'Manta Protocol',
    symbol: 'MANTA',
    description: '面向创作者的可验证隐私工具集',
    progress: 78,
    raised: '1,248',
    target: '1,600',
    participants: 486,
    status: '进行中',
    accent: 'mint',
    artwork: '/media/manta.svg',
  },
  {
    name: 'Lumen Pay',
    symbol: 'LUMEN',
    description: '为全球开发者构建的结算网络',
    progress: 52,
    raised: '832',
    target: '1,500',
    participants: 219,
    status: '即将结束',
    accent: 'orange',
    artwork: '/media/lumen.svg',
  },
  {
    name: 'Orbit Index',
    symbol: 'ORBT',
    description: '由社区驱动的链上数据索引协议',
    progress: 34,
    raised: '510',
    target: '1,500',
    participants: 173,
    status: '刚刚开始',
    accent: 'blue',
    artwork: '/media/orbit.svg',
  },
]

export const activity = [
  ['MANTA', '参与启动', '0.84 SOL', '2 分钟前', 'up'],
  ['LUMEN', '领取配额', '120 LUMEN', '18 分钟前', 'down'],
  ['ORBT', '创建项目', '—', '1 小时前', 'plus'],
  ['MANTA', '参与启动', '1.20 SOL', '3 小时前', 'up'],
]
