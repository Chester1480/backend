//步驟1 建立table
async function buildTable(result) {
  const { id, sizes } = result;
  if (!id) {
    id = "defaultPage";
  }
  var tableTemplate = `<div class="col-lg-${sizes} grid-margin stretch-card">
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
                    <div id="pagination-wrapper" class="btn-group" role="group" aria-label="Basic example">
                     
                    </div>
                </div>
            </div>
        </div>`;

  return tableTemplate;
}

async function sendDataToTable(result) {
  const { id, sizes, columns, querySet, page, pageSize, window } = result;
  if (!id) {
    id = "defaultPage";
  }

  var columnsHtml = "";
  columns.map((column) => {
    columnsHtml += `<th>${column}</th>`;
  });

  document.getElementById(`${id}_thead`).innerHTML += columnsHtml;

  var dataHtml = "";
  var data = pagination(querySet, page, pageSize);
  var dataList = data.querySet;
  
  //法1:用死的方式 print 每個obj的property(優點:可以自己選擇要顯示哪個欄位)
  // for (var i = 0; i < dataList.length; i++) {
  //   var row = `<tr>
  //                 <td>${dataList[i].rank}</td>
  //                 <td>${dataList[i].first_name}</td>
  //                 <td>${dataList[i].last_name}</td>
  //               </tr> `;

  //   dataHtml += row;
  // }


  //.classList.add("mystyle");
  //法2:用活的方式 print 每個obj的property(優點:可以共用方法，但須先處理過資料)
  for (var i = 0; i < dataList.length; i++) {
    var row = "";
    for (var prop in dataList[i]) {
      row += `<td>${dataList[i][prop]}</td>`;
    }
    dataHtml += `<tr>${row}</tr>`;
  }


  document.getElementById(`${id}_tbody`).innerHTML += dataHtml;

  pageButtons(data.pages, result);
  const activePageIndex = document.getElementById(`item-${page}`);
  activePageIndex.classList.add("active");
}

function pagination(querySet, page, pageSize) {
  var trimStart = (page - 1) * pageSize;
  var trimEnd = trimStart + pageSize;

  var trimmedData = querySet.slice(trimStart, trimEnd);

  var pages = Math.ceil(querySet.length / pageSize);
  return {
    querySet: trimmedData,
    pages: pages,
  };
}

function pageButtons(pages, result) {
  const { id, sizes, columns, querySet, page, pageSize, window } = result;
  var wrapper = document.getElementById("pagination-wrapper");

  wrapper.innerHTML = ``;

  var maxLeft = page - Math.floor(window / 2);
  var maxRight = page + Math.floor(window / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = window;
  }

  if (maxRight > pages) {
    maxLeft = pages - (window - 1);

    if (maxLeft < 1) {
      maxLeft = 1;
    }
    maxRight = pages;
  }

  for (var pageNum = maxLeft; pageNum <= maxRight; pageNum++) {
    wrapper.innerHTML += `<button id="item-${pageNum}" value=${pageNum} type="button" class="page-item btn btn-outline-secondary">${pageNum}</li>`;
  }

  if (page != 1) {
    wrapper.innerHTML =
      `<button id="item-${1}" value=${1} type="button" class="page-item btn btn-outline-secondary"><</button>` +
      wrapper.innerHTML;
  }
  if (page != pages) {
    wrapper.innerHTML += `<button id="item-${pages}" value=${pages} type="button" class="page-item btn btn-outline-secondary">></button>`;
  }

  const pagelist = document.querySelectorAll(".page-item");
  for (const page of pagelist) {
    page.addEventListener("click", function handleClick() {
      document.getElementById(`${id}_thead`).innerHTML = "";
      document.getElementById(`${id}_tbody`).innerHTML = "";
      result.page = Number(this.value);
      sendDataToTable(result);
      //   document.getElementById(`item-${this.value}`).classList.add("btn-secondary");
    });
  }
}
