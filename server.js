require("dotenv").config()
const app = require("./src/app")
const ConnectDB = require("./src/db/db")


ConnectDB()
app.listen(3000,()=>{
    console.log("server is running on PORT 3000")
})