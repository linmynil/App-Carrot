var express = require('express');
var router = express.Router();
const UserController = require('../Components/users/UserController')
const productController = require('../Components/products/ProductController');
const jwt = require('jsonwebtoken');
const auth = require('../middle/Authen');

// asm
// //http://localhost:3000/index
router.get('/index', async function (req, res, next) {
  // Hiển thị trang chủ
  res.render('index');
});

// //http://localhost:3000/form
router.get('/form', async function (req, res, next) {
  // Hiển thị trang chủ
  res.render('form');
});

// //http://localhost:3000/detail
router.get('/detail',async function (req, res, next) {
  // Hiển thị trang chủ
  res.render('Products/detail');
});

//route lab3 route lấy danh sách sản phẩm
// //http://localhost:3000/cpanel/product  
router.get('/cpanel/product', async function (req, res, next) {
  const products = await productController.getAllProducts();
  res.render('Products/data-table', { products });
});



// //http://localhost:3000/login
router.get('/login', async function (req, res, next) {
  // Hiển thị trang login
  res.render('user/login');

});
//[auth.authenWeb]
// //http://localhost:3000/login
router.post('/login',async function (req, res, next) {
  // Xử lí login
  //nếu thành công chuyển sang trang chủ
  //ngược lại vẫn ở trang login
  const { email, password } = req.body;
  const result = await UserController.login(email, password);
  // luu thong tin vao session
  const token = jwt.sign({_id:result._id,role:result.role},'serect');
  if (result) {
    return res.redirect('/cpanel/product');  // /cpanel/product   :đường dẫn dẫn vào trang danh sách sản phẩm

  } else {
    return res.redirect('/login');
  }
});
// end-asm

 //http://localhost:3000/logout
 router.get('/logout',[auth.authenWeb], function (req, res, next) {
  // Xử lí loout
  //chuyen sang trang login
 res.session.destroy();
 res.redirect('/login');
});



//http://localhost:3000/?a=2&b=4&c=2
/* GET home page. */
// router.get('/', async function(req, res, next) {
//   const { a, b, c } = req.query;
//   const delta = b ** 2 - 4 * a * c;
//   let kq = '';
//   if (delta < 0) {
//     kq = 'Phương trình vô nghiệm';
//   } else if (delta == 0) {
//     kq = `Phương trình có nghiệm kép x1 = x2 = ${(-b / (2 * a))}`;
//   } else {
//     kq = `Phương trình có 2 nghiệm phân biệt: x1 = 
//     ${((-b + Math.sqrt(delta)) / (2 * a))}, x2 = 
//     ${((-b - Math.sqrt(delta)) / (2 * a))}`;
//   }
//   res.render('index', { title: 'Linmy', kq:kq });
// });
// // http://localhost:3000/body
// router.post('/body', async function(req, res, next) {
//   const { a, b, c } = req.body;
//   const delta = b ** 2 - 4 * a * c;
//   let kq = '';
//   if (delta < 0) {
//     kq = 'Phương trình vô nghiệm';
//   } else if (delta == 0) {
//     kq = `Phương trình có nghiệm kép x1 = x2 = ${(-b / (2 * a))}`;
//   } else {
//     kq = `Phương trình có 2 nghiệm phân biệt: x1 = 
//     ${((-b + Math.sqrt(delta)) / (2 * a))}, x2 = 
//     ${((-b - Math.sqrt(delta)) / (2 * a))}`;
//   }
//   res.render('index', { title: 'Linmy', kq:kq });
// });

// //http://localhost:3000/params/1/2/3
// router.get('/params/:a/:b/:c', async function(req, res, next) {
//   const { a, b, c } = req.params;
//   const kq =`a=${a}, b=${b}, c=${c}`;
//   res.render('index', { title: 'Linmy', kq:kq });
// });

// //http://localhost:3000/ket-hop/loai?name=abc&age=18
// router.post('/ket-hop/:loai', async function(req, res, next) {
//   const { loai } = req.params;
//   const { name,age } = req.query;
//   const { address } = req.body;
//   const kq =`loai =${loai},address=${address},name=${name},age=${age}`;
//   // res.render('index', { title: 'Linmy', kq:kq });
//   res.json({kq:kq});

// });
// **


module.exports = router;
//req:request-yêu cầu chính là cái từ client gửi lên
// gồm 3 loại: req.query:lấy dữ liệu từ query string(?...(sau dấu chấm hỏi))
// req.body:lấy dữ liệu từ form
// req.params: lấy dữ liệu từ url (sau /...)
//Get: read(gõ link lên trình duyệt)
//Post: create
//HTTP REQUEST METHODS
//res/response - từ server gửi về
//-res.render:render ra file html(WEB)-SEO server side Rendering
//res.json:trả về dữ liệu dạng json (API) -Client Side Rendering
// res.send:trả về dữ liệu dạng text
//res.redrect:
//next: trang tiếp theo