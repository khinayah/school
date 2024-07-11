require('dotenv').config()

const PORT = process.env.PORT
const express = require('express')
var cors = require('cors')
const routes = require('./routes/main')

const app = express();
app.use(cors())

app.use(express.json());
app.use('/', routes);

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})
  

app.listen(PORT, () => {
    console.log(`Server berhasil di running di port ${PORT}`);
})