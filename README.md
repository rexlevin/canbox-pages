# Canbox Pages

Canbox 项目的 static website, hosted on GitHub Pages and Gitee Pages.

---

## Project Note

Both Canbox and Canbox Pages are created by a self-taught developer (learned frontend development independently). While the basic functionality is implemented, there is still room for improvement in many areas.

Welcome to join and help improve this project:

- ✅ Submit PRs to improve website design and interactions
- ✅ Enhance documentation content
- ✅ Fix typos and errors
- ✅ Submit your apps to the App Center

## About Canbox

Canbox is a lightweight application runtime platform that provides minimal core capabilities, allowing developers to focus on implementing their own application logic.

**Key Features:**
- **App Management**: Supports installation, uninstallation, and updates of applications
- **App Import**: Supports importing offline application packages, suitable for scenarios where apps cannot be publicly shared (e.g., internal enterprise tools, proprietary algorithms, sensitive data processing)
- **Serverless Architecture**: Share apps via GitHub, Gitee, or import packaged apps directly
- **Shortcuts**: Create shortcuts for frequently used applications
- **Multi-platform Support**: Based on Electron, supports Linux, Windows, and macOS

---

## Tech Stack

- Pure HTML5 + CSS3 + JavaScript
- Responsive design with mobile support
- No build tools required, ready to use

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/rexlevin/canbox-pages.git
cd canbox-pages
```

2. Use a local server to preview (optional, recommended):

Using Python:
```bash
python -m http.server 8000
```

Using Node.js:
```bash
npx serve
```

3. Open http://localhost:8000 in your browser

## Deployment

### GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select default branch (main/master)
4. Visit https://yourusername.github.io/canbox-pages/

### Gitee Pages

1. Push to Gitee repository
2. Enable Gitee Pages in repository settings
3. Select default branch and update
4. Visit https://yourusername.gitee.io/canbox-pages/

## Directory Structure

```
canbox-pages/
├── index.html          # Homepage
├── images/            # Image resources
│   ├── logo.png
│   └── logo_512x512.png
├── styles/            # Style files
│   └── main.css
├── scripts/           # Script files
│   └── main.js
└── README.md
```

## Customization

- Update links: Modify GitHub/Gitee links in `index.html`
- Modify styles: Customize colors and layout in `styles/main.css`
- Add images: Place images in the `images/` directory

## 许可证

Apache 2.0
