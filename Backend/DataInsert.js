const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser');
const database = require('./connection')
const router = express.Router()
router.use(bodyParser.json())
const storage = multer({ storage: 'storage' })




router.post('/Data-inserted', storage.none(), (req, res) => {
    console.log(req.body)


    const username = req.body.userPersonalDetails.username;
    const userdiscription = req.body.userPersonalDetails.userdiscription;
    const userCountry = req.body.userPersonalDetails.usercountry;
    const userstate = req.body.userPersonalDetails.userstate;
    const userpin = req.body.userPersonalDetails.userpincode;

    //INSERT USER PERSONAL DATA 
    database.query('INSERT INTO Users (userName, userDiscription, userCountry, userState, userPincode) VALUES (?,?,?,?,?)',
        [username, userdiscription, userCountry, userstate, userpin],
        (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: 'Failed to insert user data' });
                return;
            }
            const userID = result.insertId


            //INSRT USERS PRODUCTS INSIDE PERSONAL DATA QUERY
            const productDataList = req.body.userProductDataList;

            const values = Object.values(productDataList).map((item) => (
               [
                userID,
                item.serialNumber,
                item.productName,
                parseFloat(item.Price),
                parseInt(item.quantity),

            ])        
            );

            database.query('INSERT INTO Products (userid,serialNumber, productName, price, quantity) VALUES ?',
            [values], (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to insert product data' });
                return;
              }
              console.log(result);
            //   res.json('Data Submitted');
            });
        })

    res.json('Data Submited')

})
module.exports = router;
