const firstTimeInput = document.querySelector(".first-time");
const secondTimeInput = document.querySelector(".second-time");
const result = document.querySelector(".result");

const defaultTime = "00:00";

const isEnglish = window.location.pathname.includes('en');

function calculateTime() {
    if (firstTimeInput.value === "" || secondTimeInput.value === "") {
        if (isEnglish) {
            result.innerHTML = 'Time isn\'t selected';
        } else {
            result.innerHTML = "Время не выбрано";
        }
    } else {
        let firstTime = new Date("April 23, 2023 " + firstTimeInput.value);
        let secondTime = new Date("April 23, 2023 " + secondTimeInput.value);
        let difference = new Date(secondTime - firstTime);

        let hours = difference.getUTCHours();
        let minutes = difference.getUTCMinutes();

        let hourWords;
        let minuteWords;

        if (isEnglish) {
            hourWords = ['hour', 'hours', 'hours'];
            minuteWords = ['minute', 'minutes', 'minutes'];
            result.innerHTML = 'Result: ';
        } else {
            hourWords = ['час', 'часа', 'часов'];
            minuteWords = ['минута', 'минуты', 'минут'];
            result.innerHTML = 'Результат: ';
        }

        let hourWord = selectWordForNumber(hours, hourWords);
        let minuteWord = selectWordForNumber(minutes, minuteWords);

        if (hours !== 0 && minutes !== 0) {
            result.innerHTML += `${hours} ${hourWord}, ${minutes} ${minuteWord}`;
        } else {
            result.innerHTML +=
                (hours === 0 ? "" : `${hours} ${hourWord} `) +
                (minutes === 0 && hours !== 0
                    ? ""
                    : `${minutes} ${minuteWord}`);
        }

        localStorage.setItem("firstTime", firstTimeInput.value);
        localStorage.setItem("secondTime", secondTimeInput.value);
    }
}

function selectWordForNumber(number, words) {
    let numberSymbols = number.toString();
    let lastNumberSymbol = parseInt(numberSymbols[numberSymbols.length - 1]);

    if (number.toString().endsWith("1") && number !== 11) {
        return words[0];
    } else if (
        lastNumberSymbol <= 4 &&
        lastNumberSymbol >= 2 &&
        !(number > 11 && number < 15)
    ) {
        return words[1];
    } else {
        return words[2];
    }
}

firstTimeInput.addEventListener("change", calculateTime);
secondTimeInput.addEventListener("change", calculateTime);

const loadedFirstTime = localStorage.getItem("firstTime");
const loadedSecondTime = localStorage.getItem("secondTime");
const timeCheck = /^\d\d:\d\d$/;

if (timeCheck.exec(loadedFirstTime) && timeCheck.exec(loadedSecondTime)) {
    firstTimeInput.value = loadedFirstTime;
    secondTimeInput.value = loadedSecondTime;
} else {
    resetTime();
}

const resetTimeButton = document.querySelector(".reset-time-button");
resetTimeButton.addEventListener("click", () => resetTime(true));

function resetTime(isScaleButton = false) {
    firstTimeInput.value = defaultTime;
    secondTimeInput.value = defaultTime;
    calculateTime();

    if (isScaleButton) {
        resetTimeButton.classList.add("scale");
        setTimeout(() => {
            resetTimeButton.classList.remove("scale");
        }, 300);
    }
}

calculateTime();
