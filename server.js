import express from "express"
import "dotenv/config"
import cors from "cors"

import logger from "./middleware/logger.js"
import validateEnrollment from "./middleware/validateEnrollment.js"
import courseRoutes from "./routes/courses.js"

//dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use("/", courseRoutes)
app.post("/enroll", validateEnrollment)

const PORT = 3434
app.listen(PORT, ()=>{
    console.log(`server running is on port ${PORT}`)
})
