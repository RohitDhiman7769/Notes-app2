const express = require('express')
const cors = require('cors')
const app = express()


const datainsert = require('./DataInsert')
const fetchdata = require('./fetchData')
const deleteData = require('./Deleteuser')
const deleteProduct = require('./DeleteProducts')

app.use(cors())

app.use(datainsert)
app.use(fetchdata)
app.use(deleteData)
app.use(deleteProduct)

app.listen(3001,()=>{
    console.log('server is running on 3001')
})