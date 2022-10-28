'use strict';

async function main(){
    let buttonsettings = await onstart();
    for (const [key, value] of Object.entries(buttonsettings)) {
        document.getElementById(key).value = value;
    }
    let work = document.getElementById('work');
    let anim = document.getElementById('anim');
    anim.querySelector('img').style.background = `url(http://3.73.32.179:8080/serverimage)`;
    let playbutton = document.getElementById('playbutton');
    let closebutton = document.getElementById('closebutton');
    let button = document.getElementById('squarebutton');
    let messagebox = document.getElementById('messagebox');
    let xint, yint, lrnum, num, sum, pnum;

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
    
    function changesquare(evt) {
        if (evt === 'cr') {
            let square = anim.appendChild(document.createElement("div"));
            square.id = 'square';
            let num = Math.random() * (100 - 0) + 0;
            square.style.left = num > 50 ?  `calc(${num}% - 10px)` : `${num}%`;
        } else {
            anim.removeChild(document.getElementById('square'));
        }
    }

    function sqpos(square, xint, yint) {
        if (square.offsetTop >= anim.clientHeight) {
            xint = null;
            yint = null;
            square.classList.add('hidesq');
            setTimeout(() => {
                square.classList.remove('hidesq');
                changebutton('reload');
                changesquare('rm');
                changesquare('cr');
                document.getElementById('square').classList.add('showsq');
                setTimeout(() => {
                    document.getElementById('square').classList.remove('showsq');
                    closebutton.disabled = false;
                }, 1000);
            }, 1000);
        }
    }

    playbutton.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.localStorage.setItem('messages', JSON.stringify([]));
        sum = 0;
        pnum = 0;
        addlocal('Play pressed');
        playbutton.disabled = true;
        document.body.style.overflow = 'hidden';
        changesquare('cr')
        work.style.display = 'initial';
        messagebox.style.height = `${work.clientHeight - anim.clientHeight - work.clientHeight * 0.02 - 10}px`;
        messagebox.style.width = `${work.clientWidth - closebutton.clientWidth - work.clientWidth * 0.2}px`;
    })

    closebutton.addEventListener('click', function(evt) {
        evt.preventDefault();
        if (xint){
            clearInterval(xint);
            xint = null;
        }
        if (yint) {
            clearInterval(yint);
            yint = null;
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
            let square = document.getElementById('square'); 
            let width = anim.clientWidth - square.clientWidth;
            let posx = square.offsetLeft;
            let posy = square.offsetTop;
            if (posy === 0){
                lrnum = Math.floor(Math.random() * (1 - 0 + 1) + 0);
                square.classList.add(lrnum ? 'sqright' : 'sqleft');
                num = Math.random() * (1 - 0.01) + 0.01;
                addmessage(`Started on angle ${Math.abs(Math.floor((lrnum ? 0 : -180) + num * 90))}°`);
            }
            else {
                addmessage('Process continued');
            }
            xint = setInterval(movex, 5);
            yint = setInterval(movey, 5);
            function movex() {
                if (square.classList.contains('sqright')) {
                    square.style.left = `${posx--}px`;
                if (posx === 0) {
                    square.classList.remove('sqright');
                    square.classList.add('sqleft');
                    addmessage('Reached left border');
                }
                } else {
                    square.style.left = `${posx++}px`;
                    if (posx === width) {
                        square.classList.add('sqright');
                        square.classList.remove('sqleft');
                        addmessage('Reached right border');
                    }
                }
            }
            function movey() {
                if (posy < anim.clientHeight)
                {
                    if (posy > anim.clientHeight - square.clientHeight) {
                        button.disabled = true;
                        closebutton.disabled = true;
                    }
                    posy+=num;
                    square.style.top = `${posy}px`;
                }
                else {
                    clearInterval(xint);
                    clearInterval(yint);
                    addmessage('Reached bottom');
                    sqpos(square, xint, yint);
                    posy = 0;
                    return; 
                }
            }
        } else  {
            if (xint){
                clearInterval(xint);
                xint = null;
            }
            if (yint) {
                clearInterval(yint);
                yint = null;
            }
            changebutton('start');
            addmessage('Process stopped');
        }
    })
}main();