const http = require("http")
const { app } = require("./src/app");
const { mongoose } = require("mongoose");

const PORT = 8000;
const server = http.createServer(app)
mongoose
  .connect(
    "mongodb+srv://bucollections:grEivUMladnVWeI4@bucollections.fsatjk8.mongodb.net/bucollections?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    server.listen(PORT, () => {
      console.log("server is running on port 8000");
      
    });
  })
  .catch((error) => {
    console.log(error);
  });

  // development database
  // mongodb+srv://bucollections:grEivUMladnVWeI4@bucollections.fsatjk8.mongodb.net/bucollections?retryWrites=true&w=majority

  //production database
 // mongodb://mongo:f-1gah4A6A-3a4H3C14fBB4Dh63CbEc4@roundhouse.proxy.rlwy.net:59804