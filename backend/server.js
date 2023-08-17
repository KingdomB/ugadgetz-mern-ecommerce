/* 
SEE PACKAGE.JSON LISTING TO CONVERT TO USING ESMODULES
'  "type": "module",'
*/
import express from "express";
import dotenv from 'dotenv';
dotenv.config()

import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';


const port = process.env.PORT || 5000

connectDB() //CONNECTING MODULE TO MONGO DATABASE

const app = express();


app.get('/', (req, res) => {
  res.send('Homepage')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App started on port ${port}`);
})