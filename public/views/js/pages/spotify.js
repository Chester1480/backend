const url = window.location.origin+'/backend/api/Spotify';
async function init() {
    const pageParametersHtml = await buildPageParameters(url);
    const result = {
        id: "this",
        sizes: "12",
        tableTile:"",
    }
    const table = await buildTable(result);
    const form = await createForm();
    return pageParametersHtml+form+table+`<div id="tableDiv"></div>`;
}
const createForm = async () =>{
    const settings = {
        full:12,
        formTitle:'',
        formSubtitle:'',
        submitButton: '查詢',
        submitButtonId: "sumbit",
        cancelButton: '取消',
        cancelButtonId:"cancel",
        columns:[
            { 
                label:`<label for="userName">關鍵字</label>`,
                content:`<input type="text" class="form-control" id="account" placeholder="">`
            }
        ]
    }
    const form = await createDefaultForm(settings);
    return form;
}

iTime = setTimeout(async function () {
    document.getElementById("contentDiv").innerHTML = await init();
    await getData();
}, 100);