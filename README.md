# 简历网站

基于 Next.js、React 与 Tailwind CSS 的单页简历网站。

## 配置

所有简历内容集中在 `src/config/resume.ts`：

- `site`：网站名称、浏览器标题、SEO 描述与更新时间
- `profile`：姓名、职位、城市、联系方式与链接
- `skills`：专业技能
- `experience`：工作经历
- `projects`：项目经历
- `contributions`：开源贡献，支持补充贡献描述、时间与标签
- `education`：教育经历

## 运行

```bash
pnpm install
pnpm dev
```

访问 `http://localhost:3000`。

## 构建

```bash
pnpm build
pnpm start
```

页面右上角支持明暗主题切换和打印 / 导出 PDF。
