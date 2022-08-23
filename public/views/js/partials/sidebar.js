
var functionPage = [
  // {
  //   title:"table",
  //   icon:"mdi mdi-table-large",
  // },
  // {
  //   title:"table2",
  //   icon:"mdi mdi-table-large",
  // },
  {
    title:"user",
    icon:"mdi mdi-account-multiple",
  },
  {
    title:"spotify",
    icon:"mdi mdi-spotify",
  },
  {
    title:"test",
    icon:"mdi mdi-speedometer",
  },
  // {
  //   title:"form",
  //   icon:"mdi mdi-playlist-play",
  // },
  // {
  //   title:"Tables",
  //   icon:"mdi mdi-table-large",
  // },
  // {
  //   title:"chart",
  //   icon:"mdi mdi-chart-bar",
  // },
  // {
  //   title:"icons",
  //   icon:"mdi mdi-contacts",
  // },
  // {
  //   title:"Documentation",
  //   icon:"mdi mdi-file-document-box",
  // },
]

var html = "";
functionPage.forEach(item => {
  html += `
  <li class="nav-item menu-items">
    <a class="nav-link" href="javascript:link('${item.title}')">
      <span class="menu-icon"><i class="${item.icon}"></i></span>
      <span class="menu-title">${item.title}</span>
    </a>
  </li>`;
})

var sidebar = `
<nav class="sidebar sidebar-offcanvas" >
  <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
    <a class="sidebar-brand brand-logo" href="javascript:link('index')"><img src="../assets/images/logo.svg" alt="logo" /></a>
    <a class="sidebar-brand brand-logo-mini" href="javascript:link('index')"><img src="../assets/images/logo-mini.svg" alt="logo" /></a>
  </div>
  <ul class="nav">
    <!--<li class="nav-item nav-category">
      <span class="nav-link">Navigation</span>
    </li>-->
    ${html}
  </ul>
</nav>`;

function link(title) {
  var domain = window.location.origin;
  var jsPath = domain + "/js/pages/" + title + '.js';
  fetch(jsPath).then(v => {
    v.text().then(txt => {
      this.localStorage.setItem("route",title);
      var page = eval(txt);
    })
  });
  //window.location.href = domain+"/page?path="+title;
}


