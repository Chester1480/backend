async function fetch(url,options){
    return new Promise((resolve, reject) => {
        fetch(url,options).then(function(response) {
            return response.text();
        }).then(function(json) {
            resolve(JSON.parse(json))
        });
    });
}