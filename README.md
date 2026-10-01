# ZCode Launchpad

![ZCode 项目封面](public/og-cover.svg)

> 让好项目，安全地走向世界。

ZCode 是一个面向 Solana 生态的中文项目启动台。它把项目发现、公开启动流程、资产概览、活动记录和隐私流动性说明放在同一个清晰的工作台中。

当前版本是一个可交互的前端演示：使用本地数据，不连接真实钱包、不发送链上交易、不托管私钥。它适合展示产品方向、设计系统和后续工程边界。

## 项目亮点

| 模块 | 内容 | 状态 |
| --- | --- | --- |
| 项目发现 | 项目卡片、视觉封面、募集进度、参与人数 | 已完成 |
| 启动流程 | 项目草稿、基础信息、风险提示 | 已完成 |
| 资产中心 | 演示钱包状态、资产空状态、领取提示 | 已完成 |
| 活动记录 | 参与、领取、创建等链上活动时间线 | 演示数据 |
| 隐私流动性 | Solana 与 Zcash 配对概念说明 | 文档演示 |
| 工程体验 | TypeScript、Vite、响应式布局、CI 构建 | 已完成 |

## 快速开始

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

然后打开 `http://localhost:5173`。

## 安装为应用

部署到 HTTPS 域名后，用 Chrome 或 Edge 打开页面，点击地址栏右侧的安装图标，或者在浏览器菜单中选择“安装 ZCode”。安装后会以独立窗口启动，并缓存基础页面以支持再次打开。

本地 `localhost` 也支持浏览器安装测试。当前 PWA 是前端演示应用，离线缓存不代表钱包、交易或链上服务可以离线运行。

生产构建：

```bash
npm run build
npm run preview
```

构建产物位于 `dist/`，可以部署到 Vercel、Netlify、Cloudflare Pages 或普通 Nginx 静态服务器。

## Windows 桌面应用

项目同时支持打包为 Windows `.exe` 安装程序：

```bash
npm install
npm run build:win
```

安装包会生成在 `release/`，文件名类似 `ZCode-Setup-0.1.0-win-x64.exe`。安装后会创建桌面快捷方式和开始菜单入口，应用以独立窗口运行，不需要浏览器。

完整的桌面构建说明见 [Windows 应用构建](docs/windows-app.md)。未签名的测试安装包可能触发 Windows SmartScreen 提示，正式发布前应配置代码签名证书。

## 页面结构

- **概览**：查看项目、募集进度、平台指标和活动记录。
- **启动项目**：保存项目草稿，逐步完善发行与流动性参数。
- **我的资产**：展示钱包资产、参与项目和可领取奖励的统一入口。
- **文档**：解释项目定位、隐私流动性边界和安全注意事项。

## 仓库地图

```text
src/
  data/projects.ts       项目卡片和活动数据
  App.tsx                页面组合与演示交互
  main.tsx               React 挂载入口
  styles.css             全局设计系统
  project-artwork.css    项目图片组件样式
public/
  media/                 三个项目的本地 SVG 视觉素材
  og-cover.svg           GitHub 与社交分享封面
  manifest.webmanifest   可安装应用清单
  sw.js                  离线缓存服务
  icons/                 应用图标
electron/
  main.cjs               桌面窗口与生产资源入口
  preload.cjs            安全的上下文桥接
build/
  electron-builder.yml   Windows 安装器配置
release/                 本地生成的 exe 输出目录
docs/
  architecture.md        分层架构和状态边界
  deployment.md          本地与静态托管手册
  project-table.md       项目资料表和数据规则
  roadmap.md              产品路线图和未承诺事项
.github/
  workflows/verify.yml   自动安装依赖并执行生产构建
  ISSUE_TEMPLATE/        中文问题与功能建议模板
```

## 文档入口

| 文档 | 用途 |
| --- | --- |
| [系统架构](docs/architecture.md) | 了解展示层、数据层、素材层和未来链上层 |
| [部署手册](docs/deployment.md) | 本地开发、生产构建、静态托管与上线检查 |
| [项目资料表](docs/project-table.md) | 维护项目展示数据和可核验规则 |
| [产品路线图](docs/roadmap.md) | 查看已完成内容与未来阶段 |
| [贡献指南](CONTRIBUTING.md) | 了解代码、文案、安全和 Pull Request 规范 |
| [安全说明](SECURITY.md) | 报告资产、权限和隐私相关的问题 |

## 关于隐私流动性

项目可以研究将 Solana 生态资产与 Zcash 相关资产进行流动性配对。配对并不自动等于匿名保证，也不改变用户需要自行核验程序、桥接、托管、权限和合规边界的事实。

正式接入前，必须完成钱包适配、程序审计、流动性锁定规则、交易确认、RPC 容错、隐私政策和地区限制评估。当前仓库没有实现这些生产能力。

## 贡献

欢迎提交中文文档、视觉素材、无障碍优化和可复现的界面问题。提交前运行 `npm run build`，不要提交私钥、助记词、RPC 密钥或未经核验的收益承诺。完整规则见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 免责声明

ZCode 仅提供软件界面和信息组织工具，不构成投资、法律、税务或隐私保证。代币、Solana、Zcash 和流动性池都可能产生资产损失、智能合约漏洞、价格波动和监管风险。使用者应自行核验信息并承担决策责任。

## 许可证

当前仓库未声明开源许可证。发布到公开组织前，请由项目维护者补充明确的许可证和第三方素材清单。
