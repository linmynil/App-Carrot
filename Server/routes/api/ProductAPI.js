const express = require('express');
const router = express.Router();
const productController = require('../../Components/products/ProductController');
const {authenApp} = require('../../middle/Authen');
const upload = require('../../middle/UploadFile');
//http://localhost:3000/api/product


// Lấy danh sách sản phẩm
// http://localhost:3000/api/product/get-all
router.get('/get-all',[authenApp], async function (req, res, next) {
  try {
    const products = await productController.getAllProducts();
    let returnData = {
      error: false,
      responseTimestamp: new Date(),
      statusCode: 200,
      data:products       
      
    }
    return res.status(200).json(returnData);
  } catch (error) {
    console.log("Get all products error: ", error);
    res.status(400).json({ result: false, products: null });
  }
});

// Lấy sản phẩm theo id
// http://localhost:3000/api/product/get-by-id?id=
router.get('/get-by-id', async (req, res, next) => {
  try {
    const { id } = req.query;
    const products = await productController.getProductById(id);
    let returnData = {
      error: false,
      responseTimestamp: new Date(),
      statusCode: 200,
      data:products       
      
    }
    return res.status(200).json(returnData); 
  } catch (error) {
    console.log("Get products by id error: ", error);
    return res.status(400).json({ result: false, products: null });
  }
});

// Thêm sản phẩm
// http://localhost:3000/api/product/new-product
router.post('/new-product', async (req, res, next) => {
  try {
    const { name, price, quantity, image, category } = req.body;
    await productController.addnewproduct(name, price, quantity, image, category);
    return res.status(200).json({ result: true});
  } catch (error) {
    console.log("Get products by id error: ", error);
    res.status(400).json({ result: false });
  }
});

//Tìm kiếm sản phẩm theo tên
// http://localhost:3000/api/product/search-by-name
router.get('/search-by-name', async (req, res, next) => {
  try {
    const { name } = req.query;
    const products = await productController.searchProductByName(name);
    return res.status(200).json({ result: true, products: products});
  } catch (error) {
    console.log("Seach products by name error: ", error);
    res.status(400).json({ result: false, products: null });
  }
});

// http://localhost:3000/api/product/search/name?keyword=abc
router.get('/search/name', async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const products = await productController.search(keyword);
    return res.status(200).json({  products});
  } catch (error) {
    console.log("Seach products by name error: ", error);
    res.status(400).json({ result: false, products: null });
  }
});

//Xóa sản phẩm theo id
// http://localhost:3000/api/product/:id/delete
router.post('/:id/delete', async (req, res, next) => {
  try {
    const {id } = req.params;
    const result = await productController.deleteProductById(id);
    return res.status(200).json({ result});
  } catch (error) {
    console.log("Delete products by id error: ", error);
    res.status(400).json({ result: false });
  }
});

//Cập nhật sản phẩm
// http://localhost:3000/api/product/:id/delete
router.post("/:id/edit", async (req, res, next) => {
  try {
    let {id} = req.params;  
    let { body, file } = req;
    if (file) {
      // file = `http://172.18.172.111:3000/images/${file.filename}`;
      file = `${config.CONSTANTS.IP}images/${file.filename}`;

      body = { ...body, image: file };
    }
    const{ name, price, quantity, image, category } = body;

    const result = await productController.updateProduct(
      id,  
      name,
      Number(price),
      Number(quantity),
      image,
      category
    );
    console.log(">>>body", body);
    console.log(">>>result", result);
    if (result) {
      return res.status(200).json({ result});
    } else {
      return res.status(400).json({ result: false});
    }
  } catch (error) {
    console.log('Update products failed: ', error);
    return res.status(500).json({ result: error});
  }
});

// upload hình ảnh lên server
router.post('/upload', [upload.single('image')],async(req,res,next)=> {
 try {
  const {file}= req;
  if(!file)
  {
    return res.status(400).json({ result: false});
  }
  else{
    const url = `http://172.16.99.153:3000/images/${file.filename}`
    return res.status(200).json({result:true, url});
  }
  
 } catch (error) {
  console.log('Upload image failed: ', error);
    return res.status(500).json({});
 }
});



module.exports = router;
