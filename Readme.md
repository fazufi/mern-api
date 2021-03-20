1. require express
2. variable jalankan expres
3. variable jalanlkan expres.Router

4. buat router dengan .use

5. gunakan router dengan app.use
6. buat localhost port
 example:
 const express = require('express');

const app = express()
const router = express.Router();

const comments= [{name: "fazufi", email:"fazufi10@gmail.com", body:"semua", "id": 1}, {name: "izul", email:"izul@gmail.com", body:"izul", "id": 2}, {name: "setren", email:"setren@gmail.com", body:"setren", "id": 3}]
const products= [{name: "sepatu", price:"2000", body:"satu", "id": 1}, {name: "sandal", price:"3000", body:"dua", "id": 2}, {name: "tas", price:"5000", body:"tiga", "id": 3}]

router.use('/comments', (req, res, next)=>{  
  res.json(comments)
  next()
})

router.use('/products', (req, res, next)=>{  
  res.json(products)
  next()
})

app.use('/', router);
app.listen(4000);
