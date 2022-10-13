'use strict';

function createcontent(url, content, itemheight, itemwidth) {
    let grid = document.getElementsByClassName('grid')[0];
    let itemclass = 'grid-item';
    let style = '';
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
            content = `${content}`.replaceAll('lorem', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae qui, fugiat minima itaque sunt ipsam beatae necessitatibus amet, aperiam explicabo illum, consequatur harum. Laborum voluptate ullam odit aperiam rem sequi.');
            grid.innerHTML+=`<div class="${itemclass}"><p>${content}</p></div>`
        }
    }
    if (style !== '') {
        grid.lastChild.style = style;
    }
}

async function onstart() {
    let data = await fetch("http://127.0.0.1:5000/data", 
        {
            method: 'GET'
        }).then(res => res.json());
    for (const content of data) {
        createcontent(content[0], content[1], content[2], content[3]);
    }
    new Masonry( document.getElementsByClassName('grid')[0], {
        itemSelector: '.grid-item'
    });
}

async function subbutton(data) {
    await fetch("http://127.0.0.1:5000/data", 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
        body:JSON.stringify(data)
        }).then((response) => {
            console.log(response.status)
            }).catch((error) => {
            console.log(error)
        });
}

async function clearbutton() {
    await fetch("http://127.0.0.1:5000/data", 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
        body:JSON.stringify('clear')
        }).then((response) => {
            console.log(response.status)
            }).catch((error) => {
            console.log(error)
        });
}

onstart();