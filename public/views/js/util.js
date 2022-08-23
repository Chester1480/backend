
async function httpPost(url, data) {
    return new Promise((resolve, reject) => {
        const options = {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        }
        fetch(url, options).then(function (response) {
            return response.json();
        }).then(function (jsonString) {
            resolve(jsonString);
        });
    });
}

async function httpGet(url, data) {
    return new Promise((resolve, reject) => {
        let urlContent = new URL(url);
        if (data != null) {
            Object.keys(data).forEach(key => urlContent.searchParams.append(key, data[key]))
        }

        fetch(urlContent).then(function (response) {
            return response.json();
        }).then(function (jsonString) {
            resolve(jsonString);
        });
    });
}

function clearInput() {
    
}

async function PostApi() {
    var router = document.getElementById("router").innerHTML;
    let url = location.protocol + '//' + location.host;
    var apiUrl = url + "/" + router;
    var data = GetAllInputValue();
    var result = await httpPost(apiUrl, data);
    return result;
}
async function GetApi() {
    var router = document.getElementById("router").innerHTML;
    let url = location.protocol + '//' + location.host;
    var apiUrl = url + "/" + router;
    var data = GetAllInputValue();
    var result = await httpPost(apiUrl, data);
    return result;
}

function GetAllInputValue() {
    var ids = document.getElementsByTagName('input');
    let data = {};
    for (var i = 0; i < ids.length; i++) {
        if (ids[i].type == 'radio') {
            if (ids[i].checked) {
                data[ids[i].name] = ids[i].value;
            }
        } else {
            if (!ids[i].disabled) {
                data[ids[i].id] = ids[i].value;
            }
        }
    }
    return data;
}

/**
 * 清除input值 1.不清除disbled屬性的input, 2.不清除Radio型態的值
 */
 function ClearInput() {
    var ids = document.getElementsByTagName('input');
    for (var i = 0; i < ids.length; i++) {
        if (ids[i].disabled) {

        } else {
            if (ids[i].type == 'radio') {

            }
            else {
                ids[i].value = '';
            }
        }
    }
}

/**
 * 取得同樣name的數值 包成陣列
 * @param {any} name
 */
 function GetValueByName(name) {
    let elements = document.getElementsByName(name);
    let values = [];
    if (elements.length > 0) {
        elements.forEach(x => {
            values.push(x.value)
        });
        return values;
    } else {
        return [];
    }
}