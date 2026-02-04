// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// 元素进入视口动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有卡片添加动画
document.querySelectorAll('.feature-card, .usage-card, .doc-card, .download-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

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

    // 更新 meta 标签
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const pageTitle = document.querySelector('title');

    if (lang === 'en') {
        if (metaDescription) {
            metaDescription.setAttribute('content', metaDescription.getAttribute('data-en'));
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaKeywords.getAttribute('data-en'));
        }
        if (pageTitle) {
            pageTitle.textContent = pageTitle.getAttribute('data-en');
        }
        document.documentElement.setAttribute('lang', 'en');
    } else {
        if (metaDescription) {
            metaDescription.setAttribute('content', metaDescription.getAttribute('data-zh'));
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaKeywords.getAttribute('data-zh'));
        }
        if (pageTitle) {
            pageTitle.textContent = pageTitle.getAttribute('data-zh');
        }
        document.documentElement.setAttribute('lang', 'zh-CN');
    }

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

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initLanguage);
