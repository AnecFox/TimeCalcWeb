const link = document.getElementById("theme-link");

const lightTheme = "css/style-light.css";
const darkTheme = "css/style-dark.css";

let currentTheme = link.getAttribute("href");

if (localStorage.getItem("theme") === lightTheme) {
    setTheme("light");
} else if (localStorage.getItem("theme") === darkTheme) {
    setTheme("dark");
} else {
    setTheme("system");
}

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
        setTheme(localStorage.getItem("theme"), true);
    });

function showDropdown() {
    document.getElementById("theme-dropdown").classList.toggle("show");
}

function hideDropdown() {
    document.getElementById("theme-dropdown").classList.remove("show");
}

function setTheme(theme, isForEvent = false) {
    if (theme === "light" || theme === lightTheme) {
        currentTheme = lightTheme;
        localStorage.setItem("theme", currentTheme);
    } else if (theme === "dark" || theme === darkTheme) {
        currentTheme = darkTheme;
        localStorage.setItem("theme", currentTheme);
    } else {
        currentTheme =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? darkTheme
                : lightTheme;
        localStorage.setItem("theme", "system");
    }

    if (!isForEvent) {
        const options = document.querySelectorAll("#theme-dropdown a");
        for (let i = 0; i < options.length; i++) {
            options[i].classList.remove("selected");
            if (options[i].getAttribute("data-theme") === theme) {
                options[i].classList.add("selected");
            }
        }

        hideDropdown();
    }
    link.setAttribute("href", currentTheme);
}

document.addEventListener("click", (event) => {
    if (
        !event.target.closest("#theme-dropdown") &&
        !event.target.matches("#theme-button")
    ) {
        hideDropdown();
    }
});
