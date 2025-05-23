import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json());
/*--- This is the new code ---*/
// Import Body parser, which will help us read any data sent via POST
import bodyParser from "body-parser"
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    preflightContinue: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH' , 'DELETE', 'OPTIONS'],
    origin: true
}));
// Import routes after bodyParser has been initialised.
// Here is where we link to our api-routes.js file.
import apiRoutes from "./routes/api-routes.js"
// Tell the app to use the routes we define in the api-routes.js file.
app.use('/api', apiRoutes);
/*--- This is the end of the new code ---*/

//set up the port number. Defaults to 3000 when we are not using a cloud platform
const PORT = process.env.PORT || 3000

app.listen(PORT, function (error) {
    if (error) throw error
    console.log("Server running Successfully on PORT", PORT)
})
