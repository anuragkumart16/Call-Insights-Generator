import express from "express";
import cors from 'cors'
import { dataLimit } from "./constants.js";


const app = express()
app.use(cors({origin: process.env.ALLOWED_ORIGINS}))

app.use(express.json({limit: dataLimit}))
app.use(express.urlencoded({extended:true, limit: dataLimit}))
app.use(express.static('public'));


// imports
import  healthCheckRouter  from './routes/healthcheck.routes.js'
import audioInsightRouter from './routes/audioinsight.routes.js'


app.use('/api/v1/healthcheck', healthCheckRouter)
app.use('/api/v1/audioinsight', audioInsightRouter)


export default app