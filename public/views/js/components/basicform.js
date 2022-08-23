//資料範例
const settings = {
    full:12,//版型 全版12 半版6
    formTitle:"",
    formSubtitle:"",
    submitButton: "確認", //確認按鈕
    submitButtonId: "sumbit",
    cancelButton: "取消", //取消按鈕
    cancelButtonId:"cancel",
    columns :[
        { 
            label:`<label for="userName">Username</label>`,
            content:`<input type="text" class="form-control" id="userName" placeholder="Username">`
        }
    ]
}

async function createDefaultForm(settings){
    const { full,formTitle ,formSubtitle ,submitButton ,cancelButton ,columns,submitButtonId,cancelButtonId } = settings;
    let columnHtml ="";
    columns.forEach(column => {
        columnHtml += `<div class="form-group">${column.label}${column.content}</div>`;
    });
    const html = `
        <div class="col-md-${full} grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">${formTitle}</h4>
                    <p class="card-description"> ${formSubtitle} </p>
                    <form class="forms-sample">
                        ${columnHtml}
                        <button id="${submitButtonId}" type="button" class="btn btn-primary mr-2">${submitButton}</button>
                        <button id="${cancelButtonId}" type="button" class="btn btn-dark">${cancelButton}</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    return html;
}