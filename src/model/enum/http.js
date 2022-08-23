exports.status = Object.freeze({
    "ok": 200,
    "BadRequest": 400, // 此回應意味伺服器因為收到無效語法，而無法理解請求。
    "Unauthorized": 401, // 需要授權以回應請求。它有點像 403，但這裡的授權，是有可能辦到的。
    "Forbidden": 403,//用戶端並無訪問權限，例如未被授權，所以伺服器拒絕給予應有的回應。不同於 401，伺服端知道用戶端的身份。
    "NotFound": 404,//伺服器找不到請求的資源。因為在網路上它很常出現，這回應碼也許最為人所悉
    "MethodNotAllowed": 405, //伺服器理解此請求方法，但它被禁用或不可用。有兩個強制性方法：GET 與 HEAD，永遠不該被禁止、也不該回傳此錯誤碼。
    "InternalServerError": 500,//伺服器端發生未知或無法處理的錯誤。
    "BadGateway": 500, //This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
    "ServiceUnavailable": 503
})