const player = document.getElementById("player");
const rika = document.getElementById("rika");
const rika_img = document.getElementById("rika_img");
const score_text = document.getElementById("score_text");
const nipah = document.getElementById("nipah");
const ahaha = document.getElementById("ahaha");
const resize = 0.5;
const defaultSpeed = 3;
const acceleration = 2;

let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
let score = 0;
let player_x = 0;
let rikaSpeed_x = defaultSpeed;
let rikaSpeed_y = defaultSpeed;
let rika_x = 0;
let rika_y = 0;

nipah.volume = 0.05;

resizeElements();

// i cannot find a way to do this
function resizeElements() {
    let width = rika.offsetWidth * resize;
    let height = rika.offsetHeight * resize;

    rika_img.style.width = width + "px";
    rika_img.style.height = height + "px";

    rika.style.width = width + "px";
    rika.style.height = height + "px";
}

document.addEventListener("mousemove", checkPlayer);

function checkPlayer(event) {
    player_x = event.clientX;
    player.style.left = (player_x - 70) + "px";

    if (parseInt(player.style.left) < 0) 
        player.style.left = "0px";
    else if ((parseInt(player.style.left) + player.offsetWidth) >= vw)  
        player.style.left = (vw - player.offsetWidth) + "px";

    console.log("Player: " + player_x);
    console.log("top: " + parseInt(player.offsetTop));
}

function moveRika() {
    rika_x += rikaSpeed_x;
    rika_y += rikaSpeed_y;

    rika.style.transform = `translate(${rika_x}px, ${rika_y}px)`;

    //rika.style.left = rika_x + "px";
    //rika.style.top = rika_y + "px";

    checkPong();

    if (rika_y + rika.offsetHeight >= vh)
        resetRika();
    else if (rika_y <= 0)
        rikaSpeed_y = -rikaSpeed_y;
    else if (rika_x <= 0 || ((rika_x + rika.offsetWidth) >= vw))
        rikaSpeed_x = -rikaSpeed_x;
}

function checkPong() {
    let rikaTop = rika_y + rika.offsetHeight;
    let rikaLeft = rika_x + rika.offsetWidth;

    if ((rikaTop >= player.offsetTop) && (rikaTop <= (player.offsetHeight + player.offsetTop))) {
        console.log("it is in the y");
        if ((rikaLeft >= player.offsetLeft && rikaLeft <= (player.offsetWidth + player.offsetLeft)) || (rika_x >= player.offsetLeft && rika_x <= (player.offsetWidth + player.offsetLeft))) {
            console.log("im changing speed");
            score++;

            if (rikaSpeed_x > 0) rikaSpeed_x += acceleration;
            else rikaSpeed_x -= acceleration;

            if (rikaSpeed_y > 0) rikaSpeed_y += acceleration;
            else rikaSpeed_y -= acceleration;

            rikaSpeed_y = -rikaSpeed_y;
            changeScore();
        }
    }
}

function changeScore() {
    score_text.innerText = `Score: ${score}`;
    if (score <= 4) {
        if (score <= 1) document.body.style.backgroundImage = "url(assets/hinamizawa_morning.webp)";
        else if (score <= 3) document.body.style.backgroundImage = "url(assets/hinamizawa_afternoon.webp)";
        else document.body.style.backgroundImage = "url(assets/hinamizawa_night.webp)";

        nipah.play();
        rika_img.src = `assets/rika_sprite${score}.webp`;
    } else {
        rika_img.src = "assets/bernkastel.webp";

        ahaha.play();
        document.body.style.backgroundImage = "url(assets/meta.png)";
    }
}

function resetRika() {
    rikaSpeed_x = defaultSpeed;
    rikaSpeed_y = defaultSpeed;
    rika_x = 0;
    rika_y = 0;
    score = 0;
    changeScore();
}

setInterval(moveRika, 10);