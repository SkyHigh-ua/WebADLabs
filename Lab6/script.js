'use strict';

new Masonry( '.grid', {
    itemSelector: '.grid-item'
});
let sub = document.getElementById('subbutton');
let clean = document.getElementById('clean');
sub.addEventListener('click', function(evt){
    evt.preventDefault();
    let url = false;
    let content = document.getElementById("content").value;
    let grid = document.getElementsByClassName('grid')[0];
    if (content.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?(\:[0-9]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(((\.png)|(\.jpg)|(\.jpeg)){1})/g) !== null) {
        if (confirm('Виявлено посилання на зображення, використати його?')) {
            url = true;
        }
    } 
    let itemclass = 'grid-item';
    let itemwidth = parseInt(document.getElementById('itemwidth').value);
    let itemheight = parseInt(document.getElementById('itemheight').value);
    let style = '';
    if (itemwidth >10 || itemheight>10) {
        alert('Розмір блоку більший 10');
        return;
    }
    if (itemwidth > 1) {
        itemclass += ` grid-item--width${itemwidth}`
        style += `width:  calc(${10*itemwidth}% - 4px);`
    }
    if (itemheight > 1) {
        itemclass += ` grid-item--height${itemheight}`
        style += `height: ${100*itemheight}px;`
    }
    if (url) {
        grid.innerHTML+=`<div class="${itemclass}"><img src="${content.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?(\:[0-9]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(((\.png)|(\.jpg)|(\.jpeg)){1})/g)[0]}" alt="image"></div>`
    } else {
        if (content === '') {
            grid.innerHTML+=`<div class="${itemclass}"></div>`
        }
        else{
            content = content.replaceAll('lorem', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae qui, fugiat minima itaque sunt ipsam beatae necessitatibus amet, aperiam explicabo illum, consequatur harum. Laborum voluptate ullam odit aperiam rem sequi.');
            grid.innerHTML+=`<div class="${itemclass}"><p>${content}</p></div>`
        }
    }
    if (style !== '') {
        grid.lastChild.style = style;
    }
    new Masonry( grid, {
        itemSelector: '.grid-item'
    });
});

clean.addEventListener('click', function (evt) {
    evt.preventDefault();
    document.getElementsByClassName('grid')[0].innerHTML = '';
})