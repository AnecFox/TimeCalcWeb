const themeButton = document.getElementById("theme-button");
const link = document.getElementById("theme-link");

let lightTheme = "css/style-light.css";
let darkTheme = "css/style-dark.css";

let currentTheme = link.getAttribute("href");

if (localStorage.getItem('theme') === lightTheme) {
    currentTheme = lightTheme;
} else {
    currentTheme = darkTheme;
}
link.setAttribute("href", currentTheme);

themeButton.addEventListener("click", function () {
    let theme;

    if (currentTheme === lightTheme) {
        currentTheme = darkTheme;
        theme = "dark";
    } else {
        currentTheme = lightTheme;
        theme = "light";
    }

    link.setAttribute("href", currentTheme);
    localStorage.setItem('theme', currentTheme);
});
