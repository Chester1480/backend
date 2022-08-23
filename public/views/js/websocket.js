    var socket;
    if (!window.WebSocket) {
        window.WebSocket = window.MozWebSocket;
    }
    if (window.WebSocket) {
        ws = new WebSocket(`ws://localhost:3200`,window.localStorage.token);

        ws.onopen = function (event) {
            // const data = {
            //     type:"test",
            //     message:"測試"
            // }
            //ws.send(JSON.stringify(data))
            //ws.send(data)
        };

        ws.onmessage = function (event) {
            const res = JSON.parse(event.data);
            const { type , message } = res;
            switch(type){
                case "broadcast"://廣播訊息
                    break;
                case "whisper":
                    break;
                case "close"://提示關閉連線
                    break;
            }
        };

        ws.onclose = function (event) {
            //clearInterval(sendNowTime)
            //console.log(event)
            if (event.wasClean) {
            //alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            //alert('[close] Connection died');
            }
        };

        ws.onerror = function(error) {
                //alert(`[error] ${error.message}`);
        };

    } else {
        alert("你的瀏覽器沒有支持WebSocket！");
    }

    function send(message) {
        if (!window.WebSocket) {
            return;
        }
        if (socket.readyState == WebSocket.OPEN) {
            ws.send(message);
        } else {
            // alert("连接没有开启.");
        }
    }

// const sendNowTime = setInterval(()=>{
//     ws.send(String(new Date()))
// },1000)