// 语言切换功能
let currentLang = 'zh';

function switchLanguage(lang) {
    currentLang = lang;
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

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 侧边栏导航高亮
function highlightActiveNav() {
    const sections = document.querySelectorAll('.doc-section[id]');
    const navLinks = document.querySelectorAll('.docs-nav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    highlightActiveNav();
});

// 滚动时更新导航高亮
window.addEventListener('scroll', highlightActiveNav);
