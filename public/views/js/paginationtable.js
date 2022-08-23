  //步驟1 建立table
  async function buildTable(result) {
    const { id, sizes ,tableTile,} = result;
    if (!id) {
      id = "defaultPage";
    }
    var tableTemplate = `<div class="col-lg-${sizes} grid-margin stretch-card">
              <div class="card">
                  <div class="card-body">
                      <h4 class="card-title">${tableTile}</h4>
                      <p class="card-description"></p>
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
  //步驟2 放入資料到table
  async function sendDataToTable(result) {
    const { id, columns,data } = result;
    if (!id) {
      id = "defaultPage";
    }
    var columnsHtml = "";
    columns.map((column) => {
      columnsHtml += `<th>${column}</th>`;
    });
    document.getElementById(`${id}_thead`).innerHTML += columnsHtml;
    var dataHtml = "";
    data.forEach(item => {
      dataHtml += item.html;
    });
    document.getElementById(`${id}_tbody`).innerHTML += dataHtml;
  }
  //初始化分頁需要的參數
  async function buildPageParameters(url) {
    const pageParametersHtml = `
      <input id="url" value="${url}" type="hidden">
      <input id="pageIndex" value="1" type="hidden">
      <input id="lastPageIndex" value="0" type="hidden">
      <input id="pageSize" value="10" type="hidden">
      <input id="totalCount" value="0" type="hidden">
      <input id="window" value="5" type="hidden">
    `;
    return pageParametersHtml;
  }
  //初始化分頁元件
  async function pageButtons(result) {
    const { id, window, pageIndex, pageSize, totalCount } = result;
    var wrapper = document.getElementById("pagination-wrapper");
    const pages = Math.ceil(totalCount/ pageSize);
    wrapper.innerHTML = ``;
  
    var maxLeft = pageIndex - Math.floor(window / 2);
    var maxRight = pageIndex + Math.floor(window / 2);
  
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
      wrapper.innerHTML += `<button onclick="chagePage(${pageNum})" id="item-${pageNum}" value=${pageNum} type="button" class="page-item btn btn-outline-secondary">${pageNum}</li>`;
    }
  
    if (pageIndex != 1) {
      wrapper.innerHTML =
        `<button onclick="prevPage()" id="item-${1}" value=${1} type="button" class="page-item btn btn-outline-secondary"><</button>` +
        wrapper.innerHTML;
    }
    if (pageIndex != pages) {
      wrapper.innerHTML += `<button  onclick="nextPage()" id="item-${pages}" value=${pages} type="button" class="page-item btn btn-outline-secondary">></button>`;
    }

    const pagelist = document.querySelectorAll(".page-item");
    for (const page of pagelist) {
      page.addEventListener("click", function handleClick() {
        document.getElementById(`${id}_thead`).innerHTML = "";
        document.getElementById(`${id}_tbody`).innerHTML = "";
        result.page = Number(this.value);
        //sendDataToTable(result);
        //   document.getElementById(`item-${this.value}`).classList.add("btn-secondary");
      });
    }
    const activePageIndex = document.getElementById(`item-${pageIndex}`);
    activePageIndex.classList.add("active");
  }
  async function getData() {
    const url = document.getElementById('url').value;
    const data = {
        pageIndex:document.getElementById('pageIndex').value,
        pageSize:document.getElementById('pageSize').value
    }
    const result = await httpGet(url, data);
    await putDatatoTable(result);
  }
  //直接選擇第幾頁
  async function chagePage(pageIndex) {
    document.getElementById('pageIndex').value = pageIndex;
    await resetPageHtml(pageIndex);
    await getData();
  }
  
  async function putDatatoTable(result) {
      
    document.getElementById('pageIndex').value = result.page.pageIndex;
    const lastPageIndex = parseInt(result.page.totalCount / document.getElementById('pageSize').value);
    document.getElementById('lastPageIndex').value = lastPageIndex;
    document.getElementById('totalCount').value = result.page.totalCount;

    result.data.map(item => {
        item.html = `
        <tr>
            <td>${item.account}</td>
            <td>${item.email}</td>
            <td>${item.name}</td>
            <td>${item.phoneNumber}</td>
        </tr>`;
    });
    const id = 'this';
    const columns = ['account', 'email', 'name', 'phoneNumber'];
    const tableParameters = {
        id,
        columns,
        data : result.data,
    }
    await sendDataToTable(tableParameters)
    const pageParameters = {
        id :'this',
        window: 5,
        pageIndex: result.page.pageIndex,
        pageSize: result.page.pageSize,
        totalCount:result.page.totalCount,
    }
    await pageButtons(pageParameters)
  }

  //上一頁
  async function prevPage() { 
    let pageIndex = Number(document.getElementById('pageIndex').value);
    if (pageIndex !== 1) {
      pageIndex = Number(pageIndex) - 1;
      await resetPageHtml(pageIndex);
      document.getElementById('pageIndex').value = pageIndex;
      await getData();
    }
  }
  //下一頁
  async function nextPage() { 
    let pageIndex = Number(document.getElementById('pageIndex').value);
    const lastPageIndex = document.getElementById('lastPageIndex').value;
    if (pageIndex !== lastPageIndex) {
      pageIndex = Number(pageIndex) + 1;
      await resetPageHtml(pageIndex);
      document.getElementById('pageIndex').value = pageIndex;
      await getData();
    }
  }
  //重新建立分頁元件
  async function resetPageHtml(pageIndex) {
    let pageSize = document.getElementById('pageSize').value;
    const totalCount = document.getElementById('totalCount').value;
    const window = document.getElementById('window').value;
    var wrapper = document.getElementById("pagination-wrapper");
    const pages = Math.ceil(totalCount/ pageSize);
    wrapper.innerHTML = ``;

    var maxLeft = pageIndex - Math.floor(window / 2);
    var maxRight = pageIndex + Math.floor(window / 2);

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
      wrapper.innerHTML += `<button onclick="chagePage(${pageNum})" id="item-${pageNum}" value=${pageNum} type="button" class="page-item btn btn-outline-secondary">${pageNum}</li>`;
    }

    if (pageIndex != 1) {
      wrapper.innerHTML =
        `<button onclick="prevPage()" id="item-${1}" value=${1} type="button" class="page-item btn btn-outline-secondary"><</button>` +
        wrapper.innerHTML;
    }
    if (pageIndex != pages) {
      wrapper.innerHTML += `<button onclick="nextPage()" id="item-${pages}" value=${pages} type="button" class="page-item btn btn-outline-secondary">></button>`;
    }
    const activePageIndex = document.getElementById(`item-${pageIndex}`);
    activePageIndex.classList.add("active");
    document.getElementById('pageIndex').value = pageIndex;
  }