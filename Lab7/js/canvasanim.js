'use strict';

async function main(){
    let buttonsettings = await onstart();
    for (const [key, value] of Object.entries(buttonsettings)) {
        document.getElementById(key).value = value;
    }
    let work = document.getElementById('work');
    let anim = document.getElementById('anim');
    let context = anim.getContext("2d");
    let img = new Image();
    img.src = 'http://3.73.32.179:8080/serverimage';
    let square = document.getElementById('square');
    let sqctx = square.getContext("2d");
    let playbutton = document.getElementById('playbutton');
    let closebutton = document.getElementById('closebutton');
    let button = document.getElementById('squarebutton');
    let messagebox = document.getElementById('messagebox');
    let intid, lrnum, num, sum, posx, posy=0;
    anim.width = window.innerWidth*0.5 * window.devicePixelRatio * 0.5;
    anim.height = window.innerHeight*0.7*0.7 * window.devicePixelRatio * 0.5;
    square.width = window.innerWidth*0.5 * window.devicePixelRatio * 0.75;
    square.height = window.innerHeight*0.7*0.7 * window.devicePixelRatio * 0.75;

    function animateimages() {
        let x=0, y=0;
        const ptrn = context.createPattern(img, 'repeat');
        let interval = setInterval(() => {
            if (x <= anim.width || y <= anim.height){
                context.clearRect(0,0,anim.width,anim.height);
                context.fillStyle = ptrn;
                context.fillRect(anim.width/2-x/2,anim.height/2-y/2,x,y);
                y+=4;
                x+=8;
            } else {
                clearInterval(interval);
            }
        }, 5);
        interval = null;
    }

    function addlocal(message) {
        let localarray = JSON.parse(window.localStorage.getItem('messages'));
        window.localStorage.removeItem('messages');
        let curdate = new Date();
        localarray.push(`${curdate.getFullYear()}-${curdate.getMonth()+1}-${curdate.getDate()} ${curdate.getHours()}:${curdate.getMinutes()}:${curdate.getSeconds()} - ${message}`);
        window.localStorage.setItem('messages', JSON.stringify(localarray));
    }

    function printlocal() {
        let localarray = JSON.parse(window.localStorage.getItem('messages'));
        for (let par of localarray) {
            document.getElementById('forp').innerHTML += `<p>${par}</p>`;
        }
        window.localStorage.removeItem('messages');
    }

    function addmessage(message) {
        addlocal(message);
        if (sum) {
            sum += document.getElementsByClassName('message')[0].clientHeight;
            if (sum >= messagebox.clientHeight){
                document.getElementsByClassName('message')[0].classList.add('hidesq');
                setTimeout(() => {
                    document.getElementsByClassName('message')[0].classList.remove('hidesq');
                    messagebox.removeChild(document.getElementsByClassName('message')[0]);
                    messagebox.innerHTML += `<p class="message">${message}</p>`;
                }, 1000);
            }
            else {
                messagebox.innerHTML += `<p class="message">${message}</p>`;
            }
        } else {
            messagebox.innerHTML += `<p class="message">${message}</p>`;
            sum += document.getElementsByClassName('message')[0].clientHeight;
        }
    }

    function changebutton(val) {
        if (button.value !== val) {
            button.disabled = true;
            button.classList.add('buttonchangeroff');
            setTimeout(() => {button.classList.remove('buttonchangeroff'); 
                button.value = val;
                button.classList.add('buttonchangeron');
                setTimeout(() => {
                    button.classList.remove('buttonchangeron');
                    button.disabled = false;
                }, 500);
            }, 500);
        }
    }

    function changesquare(evt) {
        if (evt === 'cr') {
            let num = Math.random() * ((square.width - 10) - 0) + 0;
            posx = Math.floor(num);
            sqctx.fillStyle = 'white';
            sqctx.fillRect(posx, 0, 10, 10)
            sqctx.beginPath();
            sqctx.lineWidth = "2";
            sqctx.strokeStyle = "red";
            sqctx.rect(posx, 0, 10, 10);
            sqctx.stroke();
        } else {
            sqctx.clearRect(0, 0, square.width, square.height); 
            posx = 0;
            posy = 0;
        }
    }

    function sqpos() {
        if (posy >= square.height - 10) {
            intid = null;
            square.classList.add('hidesq');
            setTimeout(() => {
                square.classList.remove('hidesq');
                changebutton('reload');
                changesquare('rm');
                changesquare('cr');
                square.classList.add('showsq');
                setTimeout(() => {
                    square.classList.remove('showsq');
                    closebutton.disabled = false;
                }, 1000);
            }, 1000);
        }
    }

    playbutton.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.localStorage.setItem('messages', JSON.stringify([]));
        sum = 0;
        addlocal('Play pressed');
        playbutton.disabled = true;
        document.body.style.overflow = 'hidden';
        work.style.display = 'initial';
        animateimages();
        changesquare('cr');
        messagebox.style.height = `${work.clientHeight - anim.clientHeight - work.clientHeight * 0.02 - 10}px`;
        messagebox.style.width = `${work.clientWidth - closebutton.clientWidth - work.clientWidth * 0.2}px`;
    })

    closebutton.addEventListener('click', function(evt) {
        evt.preventDefault();
        if (intid){
            clearInterval(intid);
            intid = null;
        }
        messagebox.style.height = '';
        messagebox.style.width = '';
        addlocal('Close pressed');
        messagebox.innerHTML = '';
        document.body.style.overflow = 'visible';
        work.style.display = 'none';
        button.value = 'start';
        changesquare('rm');
        printlocal();
        playbutton.disabled = false;
    })

    button.addEventListener('click', function(evt) {
        evt.preventDefault();
        if (!(button.value === 'stop')) {
            changebutton('stop');
            let width = square.width - 10;
            if (posy === 0){
                lrnum = Math.floor(Math.random() * (1 - 0 + 1) + 0);
                num = Math.random() * (1 - 0.01) + 0.01;
                addmessage(`Started on angle ${Math.abs(Math.floor((lrnum ? -180 : 0) + num * 90))}°`);
            }
            else {
                addmessage('Process continued');
            }
            intid = setInterval(() => {
                if (posy <= square.height - 10) {
                    if (lrnum) {
                        sqctx.clearRect(0, 0, square.width, square.height); 
                        sqctx.fillStyle = 'white';
                        sqctx.fillRect(posx, posy, 10, 10)
                        sqctx.beginPath();
                        sqctx.lineWidth = "2";
                        sqctx.strokeStyle = "red";
                        sqctx.rect(posx, posy, 10, 10);
                        sqctx.stroke();
                        posx++;
                        posy+=num;
                        if (posx === width){
                            lrnum = false;
                            addmessage('Reached right border');
                        }
                    } else {
                        sqctx.clearRect(0, 0, square.width, square.height); 
                        sqctx.fillStyle = 'white';
                        sqctx.fillRect(posx, posy, 10, 10)
                        sqctx.beginPath();
                        sqctx.lineWidth = "2";
                        sqctx.strokeStyle = "red";
                        sqctx.rect(posx, posy, 10, 10);
                        sqctx.stroke();
                        posx--;
                        posy+=num;
                        if (posx === 0){
                            lrnum = true;
                            addmessage('Reached left border');
                        }
                    }
                } else {
                    clearInterval(intid);
                    addmessage('Reached bottom');
                    sqpos();
                    posy = 0;
                    return;
                }
                }, 5);
        } else  {
            if (intid){
                clearInterval(intid);
                intid = null;
            }
            changebutton('start');
            addmessage('Process stopped');
        }
    })
}main();