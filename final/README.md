## Hackthon Online Judge
### Web Programming 110-1 Final Project
by daphne, jtc, wsa

### About this project
This project is can judge your hackathon result with cypress online. It also gives you a friendly designed page to see your judged results. 

### How to run this service locally
1. `frontend`  
   (1) copy `.env.example` in `frontend`, rename it to `.env` and modify it  
   (2) run the following commands
    ```shell
    cd frontend
    ```
    ``` shell
    yarn
    ```
    ``` shell
    yarn start
    ```
2. `backend` and `judgecore`  
    (1) copy `.env.local.example` in `/backend`, rename it to `.env` and modify it  
    (2) copy `.env.example` in `/judgecore`, rename it to `.env` and modify it     
    (3) run the following commands at the root
    ``` shell
    docker network create cpj
    ```
    ``` shell
    docker-compose up
    ```

### Job Distribution
* 陳杰彤 b09705001 
   * 前端靜態頁面
   * 後端 API
   * rabbitmq, backend, judgecore, db docker script
   * deploy
   * design db schema
* 侯維書 b09705005 
   * UI/UX 設計
   * 前端架構、動態頁面
   * 後端 API
   * design db schema
   * minio docker script
* 王紹安 b09705017 
   * 前端串接資料, reducer
   * 後端架構, API
   * Judge core
   * design db schema