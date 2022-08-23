function primaryButton(text){
    return `<button type="button" class="btn btn-primary btn-fw">${text}</button>`;
}

function dangerButton(text){
    return `<button type="button" class="btn btn-danger btn-fw">${text}</button>`;
}

function warningButton(text){
    return `<button type="button" class="btn btn-warning btn-fw">${text}</button>`;
}

function iconButtons(style,icon,text) {
    //style: primary danger
    //icon: file-check  upload reload
    return `<button type="button" class="btn btn-${style} btn-icon-text">
            <i class="mdi mdi-${icon} btn-icon-prepend"></i>${text}
            </button>`;
}

function dropdownButtons(id,buttons) {
    var html = "";
    buttons.forEach(element => {
        html += `<a class="dropdown-item" href="${element.url}">${element.text}</a>`
    });
    return `<button class="btn btn-primary dropdown-toggle" id="${id}" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Dropdown </button>
    <div class="dropdown-menu show" aria-labelledby="dropdownMenuButton1" style="position: absolute; transform: translate3d(0px, 29px, 0px); top: 0px; left: 0px; will-change: transform;" x-placement="bottom-start">
            ${html}
    </div>
    `;
}


