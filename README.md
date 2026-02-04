# Canbox Pages

Canbox 项目的静态网站，托管在 GitHub Pages 和 Gitee Pages。

## 技术栈

- 纯 HTML5 + CSS3 + JavaScript
- 响应式设计，支持移动端
- 无需构建工具，开箱即用

## 本地开发

1. 克隆仓库：
```bash
git clone https://github.com/lizl6/canbox-pages.git
cd canbox-pages
```

2. 使用本地服务器预览（可选，推荐）：

使用 Python：
```bash
python -m http.server 8000
```

使用 Node.js：
```bash
npx serve
```

3. 在浏览器中打开 http://localhost:8000

## 部署

### GitHub Pages

1. 推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择默认分支（main/master）
4. 访问 https://yourusername.github.io/canbox-pages/

### Gitee Pages

1. 推送到 Gitee 仓库
2. 在仓库设置中启用 Gitee Pages
3. 选择默认分支并更新
4. 访问 https://yourusername.gitee.io/canbox-pages/

## 目录结构

```
canbox-pages/
├── index.html          # 首页
├── images/            # 图片资源
│   ├── logo.png
│   └── logo_512x512.png
├── styles/            # 样式文件
│   └── main.css
├── scripts/           # 脚本文件
│   └── main.js
└── README.md
```

## 自定义

- 修改链接：在 `index.html` 中更新 GitHub/Gitee 链接
- 修改样式：在 `styles/main.css` 中自定义颜色和布局
- 添加图片：将图片放入 `images/` 目录

## 许可证

Apache 2.0
