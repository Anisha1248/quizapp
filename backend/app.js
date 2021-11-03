const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: "./config.env"});
const PORT = process.env.PORT || 8080 ;
console.log(process.env.MONGO_URI);
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology: true
});


const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})
