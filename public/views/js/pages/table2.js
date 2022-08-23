iTime = setTimeout(async function () {
  var domain = window.location.origin;
  await init();
}, 100);

async function init() {
  const id = "this";
  const columns = ["first_name", "last_name", "rank"];
  //測試資料 data: await getData(url)
  const data = [
    {
      first_name: "Russell",
      last_name: "Wilson",
      rank: "1",
    },
    {
      first_name: "Matt",
      last_name: "Hasselbeck",
      rank: "2",
    },
    {
      first_name: "Jim",
      last_name: "Zorn",
      rank: "3",
    },
    {
      first_name: "Brady",
      last_name: "Quinn",
      rank: "4",
    },
    {
      first_name: "Charly",
      last_name: "Whitehurst",
      rank: "5",
    },
    {
      first_name: "Duane",
      last_name: "Devine",
      rank: "6",
    },
    {
      first_name: "Tom",
      last_name: "Brady",
      rank: "7",
    },
    {
      first_name: "Arron",
      last_name: "Rogers",
      rank: "8",
    },
    {
      first_name: "Patrick",
      last_name: "Mahoms",
      rank: "9",
    },
    {
      first_name: "Gardner",
      last_name: "Minshew",
      rank: "10",
    },
    {
      first_name: "Andrew",
      last_name: "Luck",
      rank: "11",
    },
    {
      first_name: "Josh",
      last_name: "Gordon",
      rank: "12",
    },
    {
      first_name: "Drew",
      last_name: "Brees",
      rank: "13",
    },
    {
      first_name: "Cam",
      last_name: "Newton",
      rank: "14",
    },
    {
      first_name: "Joe",
      last_name: "Montana",
      rank: "15",
    },
    {
      first_name: "Steve",
      last_name: "Young",
      rank: "16",
    }
  ];
  const result = {
    id,
    sizes: "12", // full:12 half:6
    columns,
    querySet: data,
    page: 1,
    pageSize: 5,
    window: 5,
  };
  //初始化 畫面需要的div 與元件
  document.getElementById("contentDiv").innerHTML = `
        <div id="tableDiv">
        </div>
    `;

  //產生table畫面
  document.getElementById("tableDiv").innerHTML = await buildTable(result);
  await sendDataToTable(result);
  //產生分頁
  //await ChangePage(1,data);
}


