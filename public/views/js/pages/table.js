async function tableExcute() {
  await init();
}

async function tableSet(colunmName, data) {
  var thHtml = "";
  colunmName.forEach((iten) => {
    thHtml += `<th>${iten}</th>`;
  });
  var theadHtml = "";
  data.forEach((item) => {
    theadHtml += `<tr> 
            <td class="py-1">${item.user}</td>
            <td>${item.firstName}</td>
            <td><div class="progress">${item.progress}</div></td>
            <td>${item.amount}</td>
            <td>${item.deadLine}</td>
        </tr>`;
  });
  var tableContent = `
    <div class="card-body">
        <h4 class="card-title">${tableName}</h4>
        <p class="card-description"><code></code></p>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead><tr>${thHtml}</tr></thead>
                <tbody>${theadHtml}</tbody>
            </table>
        </div>
    </div><div class="paginationjs"></div>`;
  return tableContent;
}

async function init() {
  //欄位名稱
  var colunmName = ["User", "Firstname", "Progress", "Amount", "Deadline"];
  var thHtml = "";
  colunmName.forEach((iten) => {
    thHtml += `<th>${iten}</th>`;
  });
  //資料放入
  const data = [
    {
      user: `<img src="../../assets/images/faces-clipart/pic-1.png" alt="image">`,
      firstName: "Herman Beck",
      progress: `<div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>`,
      amount: "$ 77.99 ",
      deadLine: "2022-05-05",
    },
    {
      user: `<img src="../../assets/images/faces-clipart/pic-1.png" alt="image">`,
      firstName: "Herman Beck",
      progress: `<div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>`,
      amount: "$ 77.99 ",
      deadLine: "2022-05-05",
    },
    {
      user: `<img src="../../assets/images/faces-clipart/pic-1.png" alt="image">`,
      firstName: "Herman Beck",
      progress: `<div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>`,
      amount: "$ 77.99 ",
      deadLine: "2022-05-05",
    },
  ];
  var tbHtml = "";
  data.forEach((item) => {
    tbHtml += `<tr> 
            <td class="py-1">${item.user}</td>
            <td>${item.firstName}</td>
            <td><div class="progress">${item.progress}</div></td>
            <td>${item.amount}</td>
            <td>${item.deadLine}</td>
        </tr>`;
  });
  const pageHtml =`
  <div class="template-demo">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" onclick="prev()" class="btn btn-outline-secondary"><</button>
          <button type="button" class="btn btn-outline-secondary">1</button>
          <button type="button" class="btn btn-outline-secondary">2</button>
          <button type="button" class="btn btn-outline-secondary">3</button>
          <button type="button" onclick="next()" class="btn btn-outline-secondary">></button>
        </div>
  </div>`;
  var tableName = "Striped Table";
  var tbContent = `<div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">${tableName}</h4>
                                    <p class="card-description"><code></code></p>
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead><tr>${thHtml}</tr></thead>
                                            <tbody>${tbHtml}</tbody>
                                        </table>
                                    </div>
                                    <br>
                                    ${pageHtml}
                                </div>
                            </div>
                        </div>`;

  var tb1columnName = ["Profile", "VatNo.", "Created", "Status"];
  var th1Html = "";
  tb1columnName.forEach((iten) => {
    th1Html += `<th>${iten}</th>`;
  });
  const tb1data = [
    {
      profile: `Jacob`,
      vatno: `53275531`,
      created: `12 May 2017`,
      status: `<label class="badge badge-danger">Pending</label>`,
    },
    {
      profile: `Jacob`,
      vatno: `53275531`,
      created: `12 May 2017`,
      status: `<label class="badge badge-danger">Pending</label>`,
    },
    {
      profile: `Jacob`,
      vatno: `53275531`,
      created: `12 May 2017`,
      status: `<label class="badge badge-danger">Pending</label>`,
    },
  ];

  var tb1Html = "";
  tb1data.forEach((item) => {
    tb1Html += `<tr> 
            <td>${item.profile}</td>
            <td>${item.vatno}</td>
            <td>${item.created}</td>
            <td>${item.status}</td>
        </tr>`;
  });

  var tableName1 = "Basic Table";
  var tbContent1 = `<div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">${tableName1}</h4>
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead><tr>${th1Html}</tr></thead>
                          <tbody>${tb1Html}</tbody>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>`;

  //grid.js
  var tableName2 = "Grid.js Table";
  var tbContent2 = `<div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">${tableName2}</h4>
                    <div id="grtb1"></div>
                  </div>
                </div>
              </div>`;

  var htmlContent = tbContent + tbContent1 + tbContent2;
  return htmlContent;
}

async function getTableData() {
  var url = "";
  var data = {};
  var result = await httpGet(url, data);
}

iTime = setTimeout(async function () {
  var domain = window.location.origin;
  document.getElementById("contentDiv").innerHTML = await init();
  await CreateGrid();
}, 100);

async function CreateGrid() {
  const mygrid = new gridjs.Grid({
    columns: ["Name", "Email", "Phone Number"],
    data: [],
    pagination: {
      limit: 3,
    },
    search: true,
    sort: true,
    // width: 500,
    // height: '200px',
    resizable: true,
    fixedHeader: true,
    language: {
      search: {
        placeholder: "🔍 請搜尋...",
      },
      pagination: {
        previous: "上一頁",
        next: "下一頁",
        showing: "結果:",
        to: "到",
        of: "筆, 總共 ",
        results: () => "筆資料",
      },
    },
  }).render(document.getElementById("grtb1"));

  mygrid.updateConfig({
      data: () => {
        return new Promise((resolve) => {
          setTimeout(
            () =>
              resolve([
                ["John", "john@example.com", "(353) 01 222 3333"],
                ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
                ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
                ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
                ["Afshin", "afshin@mail.com", "(353) 22 87 8356"],
              ]),
            2000
          );
        });
      },
    })
    .forceRender();
}
