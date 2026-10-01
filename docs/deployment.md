# 部署手册

## 本地运行

```bash
npm install
npm run dev
```

默认地址为 `http://localhost:5173`。

## 生产预览

```bash
npm run build
npm run preview
```

构建结果位于 `dist/`。部署前请确认页面中的演示免责声明没有被删除或误改成真实交易承诺。

## 静态托管

Vercel、Netlify、Cloudflare Pages 或普通 Nginx 都可以托管该版本。

| 平台 | 构建命令 | 输出目录 |
| --- | --- | --- |
| Vercel | `npm run build` | `dist` |
| Netlify | `npm run build` | `dist` |
| Cloudflare Pages | `npm run build` | `dist` |
| Nginx | 本地构建后上传 | `dist` |

## 上线前检查

- [ ] 生产域名启用 HTTPS。
- [ ] 不在环境变量、日志或浏览器存储中保存私钥。
- [ ] 真实钱包与交易逻辑经过单元、集成和端到端测试。
- [ ] 所有项目地址与程序版本可以被用户独立核验。
- [ ] 隐私政策、风险披露和地区限制已发布。
