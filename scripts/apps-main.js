// 应用数据加载
import apps from '../data/apps.js';
import categoryMap from '../data/categories.js';

// 当前语言
let currentLang = 'zh';
let currentCategory = 'all';

// 获取分类名称
function getCategoryName(category) {
    const name = categoryMap[category] || categoryMap['all'];
    return currentLang === 'en' ? name.en : name.zh;
}

// 默认 APP 图标 SVG（提取为常量，避免重复生成）
const defaultAppLogo = `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#d1d5db;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect x="8" y="8" width="48" height="48" rx="12" fill="url(#grad)"/>
        <circle cx="32" cy="32" r="14" fill="#9ca3af"/>
        <circle cx="32" cy="32" r="7" fill="white"/>
        <path d="M32 16 L35 20 L32 18 L29 20 Z" fill="#9ca3af"/>
        <path d="M32 48 L29 44 L32 46 L35 44 Z" fill="#9ca3af"/>
        <path d="M16 32 L20 29 L18 32 L20 35 Z" fill="#9ca3af"/>
        <path d="M48 32 L44 35 L46 32 L44 29 Z" fill="#9ca3af"/>
        <path d="M20 20 L24 24 L22 25 L21 22 Z" fill="#9ca3af"/>
        <path d="M44 44 L40 40 L42 39 L43 42 Z" fill="#9ca3af"/>
        <path d="M20 44 L24 40 L22 39 L21 42 Z" fill="#9ca3af"/>
        <path d="M44 20 L40 24 L42 25 L43 22 Z" fill="#9ca3af"/>
    </svg>
`)}`;

// 渲染 APP 卡片（只在页面加载时调用一次）
function renderApps() {
    const appsGrid = document.getElementById('appsGrid');

    if (apps.length === 0) {
        appsGrid.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 4rem; color: var(--text-secondary);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
                <p data-zh="暂无应用" data-en="No apps available">暂无应用</p>
            </div>
        `;
        return;
    }

    appsGrid.innerHTML = apps.map(app => {
        const description = currentLang === 'en' && app.description_en ? app.description_en : app.description;
        const homeText = currentLang === 'en' ? 'Home' : '主页';
        const sourceText = currentLang === 'en' ? 'Source' : '源码';

        return `
            <div class="app-card" data-category="${app.category}">
                <div class="app-header">
                    <img src="${app.logo}" alt="${app.name}" class="app-logo" onerror="this.src='${defaultAppLogo}'">
                    <div class="app-info">
                        <div class="app-name">${app.name}</div>
                        <span class="app-category" data-category="${app.category}">${getCategoryName(app.category)}</span>
                    </div>
                </div>
                <div class="app-description">
                    <p data-description-zh="${app.description}" data-description-en="${app.description_en || app.description}">${description}</p>
                </div>
                <div class="app-footer">
                    <div class="app-author">
                        <span class="app-author-icon">👤</span>
                        <span>${app.author}</span>
                    </div>
                    <div class="app-links">
                        <a href="${app.homepage}" target="_blank" class="app-link primary" data-zh="主页" data-en="Home">${homeText}</a>
                        <a href="${app.repo}" target="_blank" class="app-link" data-zh="源码" data-en="Source">${sourceText}</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 切换分类显示（不重新渲染 DOM）
function filterApps() {
    const cards = document.querySelectorAll('.app-card');
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (currentCategory === 'all' || category === currentCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 更新语言显示（不重新渲染 DOM）
function updateAppLanguage() {
    // 更新分类标签
    document.querySelectorAll('.app-category').forEach(el => {
        const category = el.getAttribute('data-category');
        el.textContent = getCategoryName(category);
    });

    // 更新描述
    document.querySelectorAll('.app-description p').forEach(el => {
        const zhText = el.getAttribute('data-description-zh');
        const enText = el.getAttribute('data-description-en');
        el.textContent = currentLang === 'en' ? enText : zhText;
    });

    // 更新按钮文字
    const buttons = document.querySelectorAll('.app-link');
    buttons.forEach(btn => {
        const zhText = btn.getAttribute('data-zh');
        const enText = btn.getAttribute('data-en');
        if (currentLang === 'en' && enText) {
            btn.textContent = enText;
        } else if (currentLang === 'zh' && zhText) {
            btn.textContent = zhText;
        }
    });
}

// 渲染分类过滤器
function renderFilters() {
    const existingFilter = document.querySelector('.apps-filter');
    if (existingFilter) existingFilter.remove();

    const appsHeader = document.querySelector('.apps-header');
    const filterDiv = document.createElement('div');
    filterDiv.className = 'apps-filter';

    Object.keys(categoryMap).forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (key === currentCategory ? ' active' : '');
        const name = categoryMap[key];
        btn.textContent = currentLang === 'en' ? name.en : name.zh;
        btn.onclick = () => {
            currentCategory = key;
            renderFilters();
            filterApps();  // 只显示/隐藏，不重新渲染
        };
        filterDiv.appendChild(btn);
    });

    appsHeader.appendChild(filterDiv);
}

// 语言切换
function switchLanguage(lang) {
    currentLang = lang;

    // 更新所有可翻译元素
    const translatableElements = document.querySelectorAll('[data-zh]');
    translatableElements.forEach(el => {
        const zhText = el.getAttribute('data-zh');
        const enText = el.getAttribute('data-en');
        if (lang === 'en' && enText) {
            el.textContent = enText;
        } else if (lang === 'zh' && zhText) {
            el.textContent = zhText;
        }
    });

    // 更新页面标题
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        pageTitle.textContent = pageTitle.getAttribute('data-' + lang);
    }

    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');

    // 更新语言切换按钮状态
    const langLinks = document.querySelectorAll('.lang-switch a');
    langLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + lang) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 重新渲染（只更新文字，不重新创建 DOM）
    renderFilters();
    updateAppLanguage();

    // 保存到 localStorage
    localStorage.setItem('lang', lang);
}

// 初始化语言
function initLanguage() {
    const savedLang = localStorage.getItem('lang') || 'zh';
    switchLanguage(savedLang);
}

// 绑定语言切换事件
document.querySelectorAll('.lang-switch a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('href').substring(1);
        switchLanguage(lang);
    });
});

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    renderFilters();
    renderApps();  // 只在页面加载时渲染一次
    filterApps();  // 初始过滤

    // 折叠面板切换
    const submitToggle = document.getElementById('submitToggle');
    const submitContent = document.getElementById('submitContent');
    if (submitToggle && submitContent) {
        submitToggle.addEventListener('click', () => {
            submitToggle.classList.toggle('active');
            submitContent.classList.toggle('open');
        });
    }
});
