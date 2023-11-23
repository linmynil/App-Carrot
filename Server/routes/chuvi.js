var express = require('express');
var router = express.Router();

// http://localhost:3000/chu-vi?a=10&b=20
router.post('/', async function (req, res, next) {
    const { a, b, c } = req.query;
    const { loai } = req.body;
    let kq = '';
    if (loai == "hinh-tron") {
        kq = `Chu vi hình tròn là: C = ${a * 2 * 3.14}`;
    } else if (loai == "hinh-vuong") {
        kq = `Chu vi hình vuông là: C = ${a *4}`;
    } else if (loai == "hinh-chu-nhat") {
        kq = `Chu vi hình chữ nhật là: C = ${(Number(a) + Number(b))*2}`;
    } else {
        kq = `Chu vi hình tam giác là: C = ${Number(a) + Number(b)+Number(c)}`;
    }
    res.json({ kq: kq });

});

module.exports = router;
