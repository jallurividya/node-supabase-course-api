import express from "express"
import cors from "cors"

import logger from "./middleware/logger.js"
import courseRoutes from "./routes/courses.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use("/", courseRoutes)

const PORT = 3434
app.listen(PORT, ()=>{
    console.log(`server running is on port ${PORT}`)
})