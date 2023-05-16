let userLang = navigator.language;

if (!userLang.includes("ru")) {
    window.location.href = "index-en.html";
}
