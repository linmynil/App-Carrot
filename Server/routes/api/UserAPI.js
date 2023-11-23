const express = require('express');
const router = express.Router();
const userController = require('../../Components/users/UserController');
const validation = require('../../middle/Validation');
const jwt = require('jsonwebtoken');

//http://localhost:3000/api/user/login

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userController.login(email, password);
     //tạo token
    const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' });
    if (user) {
      let returnData = {
        error: false,
        responseTimestamp: new Date(),
        statusCode: 200,
        data:{
          token,
          user         
        }
      }
     
     
      return res.status(200).json(returnData);
    }
    return res.status(400).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Loi he thong" });
  }
});


// API đăng kí
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await userController.register(email, password, name);
    console.log(user)
    let returnData = {
      error: user,
      responseTimestamp: new Date(),
      statusCode: 200,
      data: {}
    }
    if (user) {

      return res.status(200).json(returnData);

    }
    else {
      return res.status(400).json(returnData);
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, user: null });
  }
})

//api gửi mail
//http://localhost:3000/api/user/sendmail

router.post('/register', async (req, res, next) => {
  try {
    const { email, subject } = req.body;
    let content = `<h1> Chào bạn </h1>
              <p>Buổi sáng tốt lành </p>
   <p> Mong bạn có nhiều điều vui vẻ ha </p>
` ;
    const result = await userController.sendMail(email, subject, content);
    return res.status(200).json({ result: result });


  } catch (error) {
    console.log('Send mail error', error);
    return res.status(500).json({ result: false });
  }
})


module.exports = router;