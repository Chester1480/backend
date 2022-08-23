$ npm install -g pm2 命令列全域性安裝pm2
$ pm2 start app.js 啟動app專案
$ pm2 list 列出由pm2管理的所有程序資訊，還會顯示一個程序會被啟動多少次，因為沒處理的異常。


螢幕快照 2017-02-24 11.57.30.png
$ pm2 monit 監視每個node程序的CPU和記憶體的使用情況


螢幕快照 2017-02-24 11.58.46.png
$ pm2 logs 顯示所有程序日誌
$ pm2 stop all 停止所有程序
$ pm2 restart all 重啟所有程序
$ pm2 reload all 0秒停機過載程序 (用於 NETWORKED 程序)
$ pm2 stop 0 停止指定的程序
$ pm2 restart 0 重啟指定的程序
$ pm2 startup 產生 init 指令碼 保持程序活著
$ pm2 web 執行健壯的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0 殺死指定的程序
$ pm2 delete all 殺死全部程序

執行程序的不同方式：
$ pm2 start app.js -i max 根據有效CPU數目啟動最大程序數目
$ pm2 start app.js -i 3 啟動3個程序
$ pm2 start app.js -x 用fork模式啟動 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23 用fork模式啟動 app.js 並且傳遞引數 (-a 23)
$ pm2 start app.js --name serverone 啟動一個程序並把它命名為 serverone
$ pm2 stop serverone 停止 serverone 程序
$ pm2 start app.json 啟動程序, 在 app.json裡設定選項
$ pm2 start app.js -i max -- -a 23 在–之後給 app.js 傳遞引數
$ pm2 start app.js -i max -e err.log -o out.log 啟動 並 生成一個配置檔案