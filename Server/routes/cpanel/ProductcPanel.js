var express = require('express');
var router = express.Router();
const productController = require('../../Components/products/ProductController');
const categoryController = require('../../Components/categories/CategoryController');
const uploadFile = require("../../middle/UploadFile");
const auth = require('../../middle/Authen');
const config = require('../../config/config')




// //http://localhost:3000/cpanel/product
// Hiển thị trang danh sách sản phẩm


/* GET users listing. */


// http://localhost:3000/cpanel/product
router.get('/', async (req, res, next) => {
  const products = await productController.getAllProducts();

  res.render('Products/data-table', { products });
  console.log(products);
});
// http://localhost:3000/cpanel/product/:id/delete
router.post('/:id/delete', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productController.deleteProductById(id);
    return res.json({ result })
  } catch (error) {
    res.json({ result: false })
  }

});
//try catch


// http://localhost:3000/cpanel/product/form
router.get('/form', async (req, res, next) => {
  try {
    const categories = await categoryController.getAllCategories();
    res.render('Products/form', { categories });
  } catch (error) {
    next(error);
  }

});

// http://localhost:3000/cpanel/product/form
// xu li them moi san pham
router.post("/form", [uploadFile.single("image"),], async (req, res, next) => {
  try {
    let { body, file } = req;
    if (file) {
      // file = `http://172.18.172.111:3000/images/${file.filename}`;
      file = `${config.CONSTANTS.IP}images/${file.filename}`;
      body = { ...body, image: file };
    }
    const { name, price, quantity, image, category } = body;

    const result = await productController.addnewproduct(
      name,
      Number(price),
      Number(quantity),
      image,
      category
    );
    console.log(">>>body", body);
    console.log(">>>result", result);
    if (result) {
      return res.redirect("/cpanel/product");
    } else {
      return res.redirect("/cpanel/product/form");
    }
  } catch (error) {
    next(error);
  }
});

// http://localhost:3000/cpanel/product/:id/edit
// hien thi trang cap nhat san pham
router.get('/:id/edit', async (req, res, next) => {
  try {
    const{id} = req.params;
    const product = await productController.getProductById(id);
    let categories = await categoryController.getAllCategories();
    for(let index = 0; index < categories.length; index++){
      const element = categories[index];
      categories[index].selected = false;
      if(element._id.toString() == product.category.toString()){
        categories[index].selected = true;
      }
    }
    res.render('Products/edit', { product, categories });
  } catch (error) {
    next(error);
  }

});

// http://localhost:3000/cpanel/product/:id/edit
// xu li cap nhat san pham
router.post("/:id/edit", [uploadFile.single("image"),], async (req, res, next) => {
  try {
    let {id} = req.params;  //viết thiếu dòng này
    let { body, file } = req;
    if (file) {
      // file = `${file.filename}http://172.18.172.111:3000/images/`;
      file = `${config.CONSTANTS.IP}images/${file.filename}`;

      body = { ...body, image: file };
    }
    const{ name, price, quantity, image, category } = body;

    const result = await productController.updateProduct(
      id,   //thiếu truyền id
      name,
      Number(price),
      Number(quantity),
      image,
      category
    );
    console.log(">>>body", body);
    console.log(">>>result", result);
    if (result) {
      return res.redirect("/cpanel/product");
    } else {
      return res.redirect("/cpanel/product/:id/edit");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
