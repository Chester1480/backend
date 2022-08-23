#fastify api 文件說明
https://www.fastify.io/ecosystem/

#目錄結構
root
├─ bash
    ├─ pm2
    ├─ system

├─ docker
├─ document
├─ sqlscript
├─ src

    ├─ enum
    ├─ middleware
    ├─ model
    ├─ routes
    ├─ service

        ├─ api #調用第三方 api
        ├─ share #共用功能
        ├─ srp #單一職責功能 通常先調用share 再使用 api 或是 直接寫邏輯在這
        
    ├─ test
    ├─ server.js # 網站載入起始

├─ .gitignore
├─ package-lock.json
├─ package.json
├─ README.md 


#標註小技巧
// FIXME 
// TODO