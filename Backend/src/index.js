import dotenv from "dotenv";
import connectDb from "./db/index.js";
import app from "./app.js"

dotenv.config({
    path: './.env'
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,'0.0.0.0',()=>{
        console.log('Express App Started Successfully and Running!')
        console.log(`Server Started at http://localhost:${process.env.PORT || 8000}`)
    })
    
})
.catch(err => console.log('DataBase connection failed'+err) )