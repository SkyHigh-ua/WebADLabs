// Task 1
function taskone() {
    let element1 = document.getElementById('three');
    let element2 = document.getElementById('six');
    let temp = element1.innerHTML;
    element1.innerHTML = element2.innerHTML;
    element2.innerHTML = temp;
}
taskone();

// Task 2
function tasktwo() {
    let a = 10;
    let b = 20;
    let h = 5;
    let S = h*0.5*(a+b);
    document.getElementById('five').innerHTML += `<p> Result - ${S} <\p>`;
}
tasktwo();

// Task 3
function taskthree() {
    let sub = document.getElementById("subbutton");
    let ckie = document.cookie;
    if(!(ckie === 'undefined')){
        let conf = confirm(`Зберегти cookie ${ckie}?`);
        if (conf) {
            conf = confirm('Наявні cookie перезавантажити сторінку?');
            if (conf) {
                location.reload();
            }
            else{
                document.getElementById('taskthree').style = 'display: none;';
            }
        }
        else {
            document.cookie = undefined;
            location.reload();
        }
    }
    sub.addEventListener('click', function(evt){
        evt.preventDefault();
        let result = [];
        let num = document.getElementById("fnum").value;
        if (!isNaN(Math.abs(num)) && parseInt(num, 10) === Math.abs(num) && Math.abs(num).toString() === num){
            num = parseInt(num);
            for (let i = num; i > 0; i--) {
                if (num%i === 0) {
                    result.push(i);
                }
            }
            if (result.length > 0) {
                alert(result);
                document.cookie = result;
            } else {
                alert("Дільники відсутні");
            }
        }
        else{
            alert("Введіть натуральне число!");
        }
    })
}
taskthree();
// Task 4
var data = {};
function upper(objects) {
    data[objects[0].tagName] = [];
    for (const obj of objects) {
        string = '';
        for (const word of obj.innerHTML.split(' ')) {
            string += word[0].toUpperCase() + word.slice(1) + ' ';
        }
        data[obj.tagName].push(obj.innerHTML);
        obj.innerHTML = string;
    }
}

function setdefaut(objects) {
    for (let i = 0; i < objects.length; i++) {
        objects[i].innerHTML = data[objects[i].tagName][i];
    }
}

function taskfour(radio) {
    if (radio.value === 'upper') {
        upper(document.querySelectorAll('#four li p'));
        upper(document.querySelectorAll('#four li h3'));
        window.localStorage.setItem('task4', 'true');
    } else {
        setdefaut(document.querySelectorAll('#four li p'));
        setdefaut(document.querySelectorAll('#four li h3'));
        window.localStorage.setItem('task4', 'false');
    }
}

function taskfouronstart() {
    if (window.localStorage.getItem('task4') === 'true') {
        document.getElementById('toupper').checked = true;
        upper(document.querySelectorAll('#four li p'));
        upper(document.querySelectorAll('#four li h3'));
    }
}

taskfouronstart();

// Task 5
var clicked = false;
var images = [];
var counter = 0;
function taskfivebutton(){
    if(clicked){
        document.getElementById('taskfiveform').remove();
        clicked = false;
    }
    else{
        document.getElementById('five').innerHTML += '<p id="taskfiveform"><label for="link">Введіть посилання на зображення:</label><br><input type="text" id="link" name="link"><input type="submit" id="subbutton2" value="Submit"></p>'
        clicked = true;
        taskfive();
    }
}

function taskfivesave() {
    window.localStorage.setItem('images', images);
}

function taskfive() {
    let sub = document.getElementById("subbutton2");
    sub.addEventListener('click', function(evt){
        evt.preventDefault();
        let url = document.getElementById("link").value;
        images.push(url);
        document.querySelector('#four ul').innerHTML += `<li id='image${images.length - 1}'><img src="${url}" alt="image"><br><button onclick='delimage(this)'>Del</button></li>`;
    });
}

function delimage(delbutton) {
    images.pop(delbutton.parentElement.id);
    delbutton.parentElement.remove();
}

function taskfiveonstart() {
    if (window.localStorage.getItem('images')) {
        images = window.localStorage.getItem('images').split(',');
        for (let i = 0; i < images.length; i++) {
            document.querySelector('#four ul').innerHTML += `<li id='image${i}'><img src="${images[i]}" alt="image"><br><button onclick='delimage(this)'>Del</button></li>`
        }
    }
}
taskfiveonstart();