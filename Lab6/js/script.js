'use strict';

let sub = document.getElementById('subbutton');
let clear = document.getElementById('clear');

sub.addEventListener('click', async function(evt){
    evt.preventDefault();
    let url = 0;
    let content = document.getElementById("content").value;
    let grid = document.getElementsByClassName('grid')[0];
    if (content.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?(\:[0-9]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(((\.png)|(\.jpg)|(\.jpeg)){1})/g) !== null) {
        if (confirm('Виявлено посилання на зображення, використати його?')) {
            url = 1;
        }
    } 
    let itemwidth = parseInt(document.getElementById('itemwidth').value);
    let itemheight = parseInt(document.getElementById('itemheight').value);
    if (itemwidth >10 || itemheight>10) {
        alert('Розмір блоку більший 10');
        return;
    }
    await subbutton([url, content, itemheight, itemwidth]);
    createcontent(url, content, itemheight, itemwidth);
    new Masonry( grid, {
        itemSelector: '.grid-item'
    });
});

clear.addEventListener('click', async function (evt) {
    evt.preventDefault();
    await clearbutton();
    document.getElementsByClassName('grid')[0].innerHTML = '';
})