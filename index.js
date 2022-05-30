const express = require("express");
// const { init: initDB, Counter } = require("./db");
const configure = require('./config/configure')


const app = express();
configure(app)

const port = process.env.PORT || 80;



async function bootstrap() {
  // await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
