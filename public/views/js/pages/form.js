async function init() {

var form1Title = "Default form";
var form1Subtitle = "Basic form layout";
var userName = "userName";
var email = "email";
var password = "password";
var cpassword = "cpassword";
var check = "check";

var form1Content = `
  <div class="col-md-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">${form1Title}</h4>
                    <p class="card-description"> ${form1Subtitle} </p>
                    <form class="forms-sample">
                      <div class="form-group">
                        <label for="${userName}">Username</label>
                        <input type="text" class="form-control" id="${userName}" placeholder="Username">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="${email}" placeholder="Email">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="${password}" placeholder="Password">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputConfirmPassword1">Confirm Password</label>
                        <input type="password" class="form-control" id="${cpassword}" placeholder="Password">
                      </div>
                      <div class="form-check form-check-flat form-check-primary">
                        <label class="form-check-label">
                          <input id="${check}" type="checkbox" class="form-check-input"> Remember me </label>
                      </div>
                      <button id="btnSubmit" type="button" class="btn btn-primary mr-2">Submit</button>
                      <button id="btnCancel" class="btn btn-dark">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>`;

    var htmlContent = form1Content;
    return htmlContent;
}



iTime = setTimeout(async function () {
  var domain = window.location.origin;
  document.getElementById("contentDiv").innerHTML = await init();
}, 100);
