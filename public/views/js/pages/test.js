async function init() {
    var html = `testtesttest`;
    return html;
}

iTime = setTimeout(async function () {
    document.getElementById("contentDiv").innerHTML = await init();
}, 100);