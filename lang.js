let userLang = navigator.language || navigator.userLanguage;

if (userLang.indexOf('ru') !== 0) {
    window.location.href = 'index-en.html';
}
