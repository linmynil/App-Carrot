var express = require('express');
var router = express.Router();

// http://localhost:3000/dien-tich/hinh-tron?&a=10&b=20
// http://localhost:3000/dien-tich/hinh-vuong?&a=10&b=20
// http://localhost:3000/dien-tich/hinh-chu-nhat?&a=10&b=20
// http://localhost:3000/dien-tich/hinh-tam-giac?&a=10&b=20

router.get('/:loaihinh/', async function(req, res, next) {
  const { loaihinh } = req.params;
  const { a,b } = req.query;
  let kq = '';
  let hinh = '';

  if (loaihinh == "hinh-tron") {
    hinh = "Hình tròn";
    kq = `Diện tích hình tròn là: S = ${a**2*3.14}`;
  } else if (loaihinh == "hinh-vuong") {
    hinh = "Hình vuông";
    kq = `Diện tích hình vuông là: S = ${a*a}`;
  } else if (loaihinh == "hinh-chu-nhat") {
    hinh = "Hình chữ nhật";
    kq = `Diện tích hình chữ nhật là: S = ${a*b}`;
  } else {
    hinh = "Hình tam giác";
    kq = `Diện tích hình tam giác là: S = ${a*b/2}`;
  }
  res.render('index', { loaihinh:hinh, kq:kq });

});

module.exports = router;
