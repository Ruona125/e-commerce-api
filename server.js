const http = require("http")
const { app } = require("./src/app");
const { mongoose } = require("mongoose");
const dotenv=require("dotenv")
dotenv.config();
const PORT = process.env.PORT;
const server = http.createServer(app)
mongoose
  .connect(process.env.PROD_DATABASE) 
  .then(() => {
    console.log("Connected to database!");
    server.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
      
    });
  })
  .catch((error) => {
    console.log(error);
  });
