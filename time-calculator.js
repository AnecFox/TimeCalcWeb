const firstTime = document.getElementById("first-time");
const secondTime = document.getElementById("second-time");
const result = document.getElementById("result");

function calculateTime() {
    if (firstTime.value === "" || secondTime.value === "") {
        result.innerHTML = "Время не выбрано";
    } else {
        let firstTimeValue = new Date("April 23, 2023 " + firstTime.value);
        let secondTimeValue = new Date("April 23, 2023 " + secondTime.value);
        let difference = new Date(secondTimeValue - firstTimeValue);

        let hours = difference.getUTCHours();
        let minutes = difference.getUTCMinutes();

        let hourWords = ["час", "часа", "часов"];
        let minuteWords = ["минута", "минуты", "минут"];

        let hourWord = selectWordForNumber(hours, hourWords);
        let minuteWord = selectWordForNumber(minutes, minuteWords);

        result.innerHTML = "Результат: ";

        if (hours !== 0 && minutes !== 0) {
            result.innerHTML += hours + " " + hourWord + ", " + minutes + " " + minuteWord;
        } else {
            result.innerHTML += (hours === 0 ? "" : hours + " " + hourWord + " ") +
                (minutes === 0 && hours !== 0 ? "" : minutes + " " + minuteWord);
        }
    }
}

function selectWordForNumber(number, words) {
    let numberSymbols = number.toString();
    let lastNumberSymbol = parseInt(numberSymbols[numberSymbols.length - 1]);

    if (number.toString().endsWith("1") && number !== 11) {
        return words[0];
    } else if (lastNumberSymbol <= 4 && lastNumberSymbol >= 2 && !(number > 11 && number < 15)) {
        return words[1];
    } else {
        return words[2];
    }
}

firstTime.addEventListener("change", calculateTime);
secondTime.addEventListener("change", calculateTime);
