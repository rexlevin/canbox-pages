// 应用数据加载
import apps from '/data/apps.js';
import categoryMap from '/data/categories.js';

// 当前语言
let currentLang = 'zh';
let currentCategory = 'all';

// 获取分类名称
function getCategoryName(category) {
    const name = categoryMap[category] || categoryMap['all'];
    return currentLang === 'en' ? name.en : name.zh;
}

// 渲染 APP 卡片
function renderApps() {
    const appsGrid = document.getElementById('appsGrid');
    const filteredApps = currentCategory === 'all'
        ? apps
        : apps.filter(app => app.category === currentCategory);

    if (filteredApps.length === 0) {
        appsGrid.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 4rem; color: var(--text-secondary);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
                <p data-zh="暂无应用" data-en="No apps available">暂无应用</p>
            </div>
        `;
        return;
    }

    appsGrid.innerHTML = filteredApps.map(app => {
        const description = currentLang === 'en' && app.description_en ? app.description_en : app.description;
        const homeText = currentLang === 'en' ? 'Home' : '主页';
        const sourceText = currentLang === 'en' ? 'Source' : '源码';
        return `
            <div class="app-card">
                <div class="app-header">
                    <img src="${app.logo}" alt="${app.name}" class="app-logo" onerror="this.src='/images/logo_128x128.png'">
                    <div class="app-info">
                        <div class="app-name">${app.name}</div>
                        <span class="app-category">${getCategoryName(app.category)}</span>
                    </div>
                </div>
                <div class="app-description">
                    <p>${description}</p>
                </div>
                <div class="app-footer">
                    <div class="app-author">
                        <span class="app-author-icon">👤</span>
                        <span>${app.author}</span>
                    </div>
                    <div class="app-links">
                        <a href="${app.homepage}" target="_blank" class="app-link primary">${homeText}</a>
                        <a href="${app.repo}" target="_blank" class="app-link">${sourceText}</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
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
            renderApps();
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

    // 重新渲染
    renderFilters();
    renderApps();

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
    renderApps();

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
