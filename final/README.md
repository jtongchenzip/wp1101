## Hackthon Online Judge
### Web Programming 110-1 Final Project
by daphne, jtc, wsa

### About this project
This project is can judge your hackathon result with cypress online. It also gives you a friendly designed page to see your judged results. 

### How to run this service locally
1. `frontend`  
   (1) copy `.env.example` in `frontend`, rename it to `.env` and modify it if needed   
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
    (1) copy `.env.local.example` in `/backend`, rename it to `.env` and modify it if needed   
    (2) copy `.env.example` in `/judgecore`, rename it to `.env` and modify it if needed  
    (3) rename `docker-compose.local.example` to `docker-compose.yaml`      
    (4) run the following commands at root
    ``` shell
    docker network create cpj
    ```
    ``` shell
    docker-compose up
    ```

### How to use Hackathon Online Judge?

#### For Student
1. Register an account
2. Login
3. Zip your src folder
4. Choose a task to submit
5. Submit your `src.zip`
6. Wait for your result
7. Start again from step four
#### For TA
1. Login with the TA account given
2. Zip your cypress folder
3. Add a task (include uploading the `cypress.zip`)
4. Zip your src folder
5. Choose a task to submit
6. Submit your `src.zip`
7. Wait for your result
8. Start again from step three or step five

#### Notes
1. There are `cypress` and `src` in the `example` folder, you can zip them and upload them if you want.
2. It is known that putting multiple cypress specs in a task will result in a connection timeout with rabbitmq. Please separate your cypress specs into multiple tasks.
3. Save port `3000`, `3006`, `5432`, `8000`, `8080`, `8081` when deploying in local environment. 
4. If your OS is Windows, change `"start": "PORT=3006 react-scripts start"` in `/frontend/package.json` to `"start": "set PORT=3006 && react-scripts start"`.
5. Strongly recommend that you reserve enough RAM for running these services at local in case of judgecore's performance issue. (It's highly possible that the judge feature fails with less than 8G RAM.)
6.  When you need to test the judge feature on the  deployed website, contact [陳杰彤](https://www.facebook.com/jtongchenzip/) to open the judgecore.


### Job Distribution
* 陳杰彤 b09705001 
   * 前端靜態頁面
   * 後端 API
   * design db schema
   * rabbitmq, backend, judgecore, db docker script
   * deploy    
* 侯維書 b09705005   
   * UI/UX 
   * 前端架構
   * 後端 API
   * design db schema
   * minio docker script
* 王紹安 b09705017 
   * 前端串接資料, reducer
   * 後端架構, API
   * design db schema
   * Judge core