const { application } = require("express")
const express = require("express")
const app = express()
const morgan = require("morgan")
const path = require("path")
const port = 8080


//static files

app.use("/", express.static(path.join(__dirname, '../Public')))

// settings
app.set("port", process.env.PORT || port)

// set view engine 
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "templates"))

// print information route
app.use(morgan("dev"))

// json format
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// routes
app.use(require("./routes/index.js"))
    
// start
app.listen(port, ()=>{
    console.log(__dirname)
    console.log(`Server listening at port ${app.get("port")} `)
})
