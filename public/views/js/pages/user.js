const url = window.location.origin+'/backend/user/getUsers';
async function init() {
    const pageParametersHtml = await buildPageParameters(url);
    const result = {
        id: "this",
        sizes: "12",
        tableTile:"會員列表",
    }
    const table = await buildTable(result);
    const form = await createForm();
    return pageParametersHtml+form+table+`<div id="tableDiv"></div>`;
}
const createForm = async () =>{
    const settings = {
        full:12,
        formTitle:'會員列表',
        formSubtitle:'',
        submitButton: '查詢',
        submitButtonId: "sumbit",
        cancelButton: '取消',
        cancelButtonId:"cancel",
        columns:[
            { 
                label:`<label for="userName">帳號</label>`,
                content:`<input type="text" class="form-control" id="account" placeholder="輸入帳號">`
            }
        ]
    }
    const form = await createDefaultForm(settings);
    return form;
}

//註冊 預設click 使用方式將方法傳入可以執行
function addEventListener(id,func,type="click") {
    document.getElementById(id).addEventListener(type, function (event) {
        func();//可以將方法當物件傳入直接使用
    });
}

iTime = setTimeout(async function () {
    document.getElementById("contentDiv").innerHTML = await init();
    await getData();
}, 100);


