const express = require('express')
const database = require('./connection')
const router = express.Router()



router.get('/Fetch-Data', (req, res) => {
    database.query(`SELECT * FROM Users`, async (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      
        let data = [];
      
        for (const result of results) {
          const userID = result.userid;
      
          const userData = {
            userId: result.userid,
            userName: result.userName,
            userDiscription: result.userDiscription,
            userCountry: result.userCountry,
            userState: result.userState,
            userPincode: result.userPincode,
            userProducts: [],
          };
      
          try {
            const productResult = await new Promise((resolve, reject) => {
              database.query(
                `SELECT * FROM Products WHERE userid = ${userID}`,
                (err, productResult) => {
                  if (err) {
                    console.log(err);
                    reject(err);
                  }
                  resolve(productResult);
                }
              );
            });
      
            const productdata = productResult.map((value) => {
              return {
                productID: value.productid,
                userSerialNumber: value.serialNumber,
                userProductsName: value.productName,
                productPrice: value.price,
                Quantity: value.quantity,
              };
            });
      
            userData.userProducts = productdata;
      
          } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
      
          data.push(userData);
        }
      
        res.json(data);
      });
      
    })

module.exports = router;