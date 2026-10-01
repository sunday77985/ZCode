# Windows 应用构建

ZCode 使用 Electron 将 Vite 前端包装为 Windows 桌面应用。用户安装后会得到独立窗口，不需要打开浏览器标签页。

## 开发模式

先启动网页开发服务器：

```bash
npm run dev
```

再开一个终端运行：

```bash
npm run desktop:dev
```

开发模式会加载 `http://localhost:5173`。

## 生成安装包

```bash
npm install
npm run build:win
```

安装程序会生成在 `release/`，文件名类似：

```text
ZCode-Setup-0.1.0.exe
```

双击安装后，ZCode 会以独立桌面窗口运行。Windows Defender 或 SmartScreen 可能对没有代码签名的测试安装包显示提示，这是未签名应用的正常行为。

## 发布前必须完成

- [ ] 为 Windows 安装包配置代码签名证书。
- [ ] 在干净 Windows 虚拟机中测试安装、卸载和升级。
- [ ] 为真实钱包和交易功能做独立安全审计。
- [ ] 不把密钥、助记词、RPC 凭据写入 Electron 主进程。
- [ ] 在 GitHub Releases 发布校验和与版本说明。
