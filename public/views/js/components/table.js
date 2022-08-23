//#region 先保留
// async function tablePagination(id,nowGroup,nowIndex){
//     var _nowGroup = document.getElementById(`${id}_nowPage`).innerHTML;
//     var _nowPage = document.getElementById(`${id}_maxPage`).innerHTML;

//     const totalPageCount = Math.trunc(totalCount / pageSize);//總頁數
//     const remainder = Math.trunc(totalCount % pageSize);// 餘數

//     const pageGroup = []
//     if( totalPageCount > 0){
//         let startIndex = 0;
//         for (let index = 0; index < totalPageCount; index++) {
//             const groupCounts = []
//             for (let index = 0; index < pageSize; index++) {
//                 startIndex ++;
//                 groupCounts.push(startIndex)
//             }
//             pageGroup.push(groupCounts);
//         }

//         if(remainder > 0){
//             const groupCounts2 = [];
//             for (let index = 0; index < remainder; index++) {
//                 startIndex++;
//                 groupCounts2.push(startIndex)
//             }
//             pageGroup.push(groupCounts2);
//         }
//     }
//     console.log("pageGroup: ",pageGroup)

//     var pageCountHtml = "";
//     pageGroup[nowGroup-1].forEach(index =>{
//         if(nowGroup != pageGroup.length){
//             pageCountHtml += `<button type="button" class="btn btn-outline-secondary">${index}</button>`;
//             // pageCountHtml += `<button type="button" onclick="clickGroup('${id}_','${divId}')" class="btn btn-outline-secondary">...</button>`;
//         }else{
//             // pageCountHtml += `<button type="button" onclick="clickGroup('${id}_','${divId}')" class="btn btn-outline-secondary">...</button>`;
//             pageCountHtml += `<button type="button" class="btn btn-outline-secondary">${index}</button>`;
//         }
      
//     })

//     const pageHtml =`
//     <div class="template-demo">
//             <span id="${id}_nowPage">1<span>_
//             <span id="${id}_maxPage">${totalPageCount}<span>
//             <div class="btn-group" role="group" aria-label="Basic example">
//                 <button type="button" onclick="prev('${id}_','${divId}')" class="btn btn-outline-secondary"><</button>
//                 ${pageCountHtml}
//                 <button type="button" onclick="next('${id}_','${divId}')" class="btn btn-outline-secondary">></button>
//             </div>
//     </div>`;
//     return pageHtml;
// }
//#endregion


/**
 * 頁碼版面
 */
 function PaginTemplate(num) {
    var txtPagingTemplate = `
                         <li onclick="ChangePage(${num})" class="page_item">${num}</li>
                        `;
    return txtPagingTemplate;
}

/**
 * 產生頁碼
 */
function GetPagination() {
    var totalPage = TotNumPages();
    var txtPaging = "";

    //清空原本的頁碼
    var pageNum = document.querySelectorAll('#pagination li.page_item');
    for (var i = 0; li = pageNum[i]; i++) {
        li.parentNode.removeChild(li);
    }

    for (var i = 1; i <= totalPage; i++) {
        txtPaging += PaginTemplate(i);
    }

    $('#pagination li:eq(0)').after(function () {
        return txtPaging.toString();
    });
}

/**
* 上一頁
*/
function PrevPage() {
    if (current_page > 1) {
        current_page--;
        ChangePage(current_page);
    }
}

/**
 * 下一頁
 */
function NextPage() {
    if (current_page < TotNumPages()) {
        current_page++;
        ChangePage(current_page);
    }
}

/**
* 總頁數
*/
function TotNumPages(id) {
    if (!id) {
        id = "defaultPage";
    }
    var length = document.getElementById(`${id}_totalCount`).value;
    var pageSize = document.getElementById(`${id}_pageSize`).value;
    return Math.ceil(length / pageSize);
    //需調整:msgList.length之後改成傳入總筆數 (用input hidden 記錄總筆數)
}

async function getData(url){
    const result = await fetch(url,{method:'get'});
    return result;
}

//步驟1 建立table
async function createTable(result) {
    const { id  ,size } = result;
    if (!id) {
        id = "defaultPage";
    }
    //const { pageIndex,pageSize,totalCount ,nowGroup} = pages;
    //<button type="button" class="btn btn-outline-secondary">1</button>
    var table = `
        <div class="col-lg-${size} grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Hoverable Table</h4>
                    <p class="card-description"> Add class <code>.table-hover</code></p>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr id="${id}_thead"></tr>
                            </thead>
                                <tbody id="${id}_tbody">
                            </tbody>
                        </table>
                    </div><br>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button onclick="PrevPage();" id="btn_prev" type="button" class="btn btn-outline-secondary"><</button>
                        <div id="${id}_Pagination" >
                        </div>
                        <button onclick="NextPage();" id="btn_next" type="button" class="btn btn-outline-secondary">></button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return table;
}
//步驟2 塞入欄位跟資料
async function putDataToTable(columns,data,id="defaultPage") {
    if (!id) {
        id = "defaultPage";
    }
    var columnsHtml = "";
    columns.map(column => {
        columnsHtml += `<th>${column}</th>`;
    });
    document.getElementById(`${id}_thead`).innerHTML = columnsHtml;
    var dataHtml = "";
    data.forEach(items => {
        dataHtml += `<tr>`;
        items.forEach(item=>{
            dataHtml += `${item}`;
        })
        dataHtml += `</tr>`;
    });
    document.getElementById(`${id}_tbody`).innerHTML = dataHtml;
}
//步驟3頁面切換
async function ChangePage(page,data ,id="defaultPage") {
    document.getElementById(`${id}_pageIndex`).value = page;
    var pageSize = document.getElementById(`${id}_pageSize`).value;
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    //var listing_table = document.getElementById("list");
    //listing_table.innerHTML = "";
    //var msgList = await CallApi();
    if (data.length > 0) {
        //createTable
        document.getElementById(`${id}_totalCount`).value = data.length;
        if (page < 1) page = 1;
        if (page > TotNumPages()) page = TotNumPages();
        // const parameters = {
        //     page,
        //     pageSize,
        //     msgList
        // }
        //listing_table.innerHTML = getData(parameters);
        //for (var i = (page - 1) * pageSize; i < (page * pageSize); i++) {
        //    listing_table.innerHTML += ShowMsgList(msgList[i]);
        //}

        //btn_prev
        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }
        //btn_next
        if (page == TotNumPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }

        //頁碼的CSS
        $("#pagination>li.page_item").removeClass("page_item_active");
        $("#pagination>li.page_item").eq(page - 1).addClass("page_item_active");
    }
    else {
        listing_table.innerHTML = `<div class="label flex-center"> 目前尚無任何資料 </div>`;
    }

}

// #資料範例
// <tr>
//     <td class="py-1">
//         <img src="../../assets/images/faces-clipart/pic-1.png" alt="image">
//     </td>
//     <td> Herman Beck </td>
//     <td>
//         <div class="progress">
//         <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
//         </div>
//     </td>
//     <td> $ 77.99 </td>
//     <td> May 15, 2015 </td>
// </tr>