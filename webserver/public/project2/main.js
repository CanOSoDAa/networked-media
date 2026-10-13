const box = document.getElementById("screensaver");
const displayText = document.getElementById("display-text");
const typed = document.getElementById("typed");

let text = "";

let x = 100;
let y = 100;

let dx = 1.5;
let dy = 1;


function move() {

    x += dx;
    y += dy;

    const width = box.offsetWidth;
    const height = box.offsetHeight;

    if (x <= 0) {
        x = 0;
        dx *= -1;
    }

    if (x + width >= window.innerWidth) {
        x = window.innerWidth - width;
        dx *= -1;
    }

    if (y <= 0) {
        y = 0;
        dy *= -1;
    }

    if (y + height >= window.innerHeight) {
        y = window.innerHeight - height;
        dy *= -1;
    }

    box.style.left = x + "px";
    box.style.top = y + "px";

    requestAnimationFrame(move);
}


move();


document.addEventListener("keydown", function (event) {

    if (event.key === "Backspace") {

        event.preventDefault();

        text = text.slice(0, -1);

        typed.textContent = text;

    }

    else if (event.key === "Enter") {

        if (text.trim() !== "") {

            displayText.textContent = text.toUpperCase();

            text = "";

            typed.textContent = "";

        }

    }

    else if (event.key.length === 1) {

        text += event.key;

        typed.textContent = text;

    }

});