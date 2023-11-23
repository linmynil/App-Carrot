const productModel = require('./ProductModel');

// Lấy toàn bộ sản phẩm trong database
const getAllProducts = async (page, limit) => {
  try {
    //return data;
    return await productModel.find();
  } catch (error) {
    console.log('Get all products error', error)
  }
  return [];
}

// xóa sản phẩm theo id
const deleteProductById = async (id) => {

  try {
    // const index = data.findIndex((item) => item._id.toString() == id.toString());
    // if (index >= 0) {
    //   data.splice(index, 1);
    // }
    // return true;
    await productModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log('delete product by Id error', error);
  }
  return false;

}


// thêm sản phẩm phẩm theo id
const addnewproduct = async (name, price, quantity, image, category) => {

  try {
    const newproduct =
    {
      // _id : data.length +1,
      name,
      price,
      quantity,
      image,
      category
    }
    // data.push(newproduct);
    // return true;
    const p = new productModel(newproduct);
    await p.save();
    return true;

  } catch (error) {
    console.log('add new product error', error);
    return false;
  }

}


// update san pham
const updateProduct = async (id, name, price, quantity, image, category) => {
  try {
    // let product = data.find(item => item._id.toString() == id.toString());
    
    // if(product){
    //        data = data.map(item => {
    //            if(item._id.toString()== id.toString()){
    //             item.name = name? name : item.name;
    //             item.price = price ? price : item.price;
    //             item.quantity = quantity ? quantity : item.quantity;
    //             item.image = image ? image: item.image;
    //             item.category = category ? category : item.category;
    //            }
    //            return item;

    //        });
    //        return true;
    // }
    let item = await productModel.findById(id);
    if (item) {
      item.name = name ? name : item.name;
      item.price = price ? price : item.price;
      item.quantity = quantity ? quantity : item.quantity;
      item.image = image ? image : item.image;
      item.category = category ? category : item.category;
      await item.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log('Update product error', error);
    return false;
  }
 
}

// lay thong tin san pham theo id
const getProductById = async (id) => {
  try {
    // let product = data.find(item => item._id.toString() == id.toString());
    let product = await productModel.findById(id);
    return product;
  } catch (error) {
    console.log('Get product By Id error', error);
   
  }
  return null;
}

const searchProductByName = async (name) =>{
  try {
    return await productModel.find({
      name: {$regex: name, $options: "i"},
    });
  } catch (error) {
    
  }
}
const search = async (keyword) =>{
  try {
    let query={
      // gt = greater than  lt =less than
      // and price > 1000 AND price <2000
     price:{$gt:1000,$lt:2000},
     // and quantity <= 100
     quantity:{$lte:100},
     //or quantity <=100 or quantity >200
     // => $or:[{ quantity:{$lte:100}},{quantity:{$gt:200}}],
     // $regex: regular expression
     // $option i: ignore case
     // tìm kiếm sản phẩm không phân biệt chữ hoa chữ thường
     // tìm kiếm theo tên có chưa keyword
    //  name:{$regex:keyword,$option:'i'}
    // tìm kiếm theo tên 
    name:keyword,
    }
    let product = await productModel.find(query);
    return product;
    
  } catch (error) {
    console.log('search product', error);
  }
  return null;
}


const getAllProducts2 = async () => {
  //page: 1, size:10
  // let skip =(page -1)*size;
  try {
    //return data;
    return await productModel.find({},'name price category') //lấy hai field name và price
    .populate('category')// lấy thông tin category
    .sort({price: -1}) // sắp xếp giảm dần theo giá
    .skip(0)// bỏ qua hai sản phẩm
    .limit(2)// lấy hai sản phẩm

  } catch (error) {
    console.log('Get all products error', error)
  }
  return [];
}
module.exports = { getAllProducts, deleteProductById, addnewproduct, updateProduct, getProductById, searchProductByName,search,getAllProducts2 };

var data =
  [{
    "_id": 1,
    "name": "Durgan-Cummerata",
    "price": 7,
    "quantity": 71,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 4
  }, {
    "_id": 2,
    "name": "Bergstrom and Sons",
    "price": 81,
    "quantity": 18,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 9
  }, {
    "_id": 3,
    "name": "Becker and Sons",
    "price": 42,
    "quantity": 15,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 2
  }, {
    "_id": 4,
    "name": "Kiehn, Cartwright and Quitzon",
    "price": 50,
    "quantity": 98,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 2
  }, {
    "_id": 5,
    "name": "Flatley and Sons",
    "price": 92,
    "quantity": 54,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 4
  }, {
    "_id": 6,
    "name": "Upton and Sons",
    "price": 69,
    "quantity": 52,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 1
  }, {
    "_id": 7,
    "name": "Powlowski, Barton and Wolff",
    "price": 17,
    "quantity": 37,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 5
  }, {
    "_id": 8,
    "name": "Considine Inc",
    "price": 22,
    "quantity": 61,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 7
  }, {
    "_id": 9,
    "name": "Moen, Cronin and McCullough",
    "price": 53,
    "quantity": 93,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 1
  }, {
    "_id": 10,
    "name": "Grimes Group",
    "price": 74,
    "quantity": 7,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 7
  }, {
    "_id": 11,
    "name": "Zulauf, Doyle and Bernhard",
    "price": 77,
    "quantity": 94,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 6
  }, {
    "_id": 12,
    "name": "Baumbach-Spinka",
    "price": 32,
    "quantity": 61,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 1
  }, {
    "_id": 13,
    "name": "Lowe, Kihn and Hartmann",
    "price": 90,
    "quantity": 58,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 5
  }, {
    "_id": 14,
    "name": "Jacobson, Nolan and Heller",
    "price": 42,
    "quantity": 61,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 1
  }, {
    "_id": 15,
    "name": "Kerluke, Baumbach and Hansen",
    "price": 21,
    "quantity": 66,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 6
  }, {
    "_id": 16,
    "name": "O'Keefe-Bechtelar",
    "price": 47,
    "quantity": 98,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 8
  }, {
    "_id": 17,
    "name": "Balistreri-Hackett",
    "price": 47,
    "quantity": 83,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 9
  }, {
    "_id": 18,
    "name": "Champlin-Macejkovic",
    "price": 14,
    "quantity": 29,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 6
  }, {
    "_id": 19,
    "name": "McClure LLC",
    "price": 70,
    "quantity": 2,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 9
  }, {
    "_id": 20,
    "name": "Upton, Konopelski and Rodriguez",
    "price": 78,
    "quantity": 57,
    "image": "https://th.bing.com/th/id/R.dfe366edef6b975388f402279ce90154?rik=8OHSwBCpa5Hi8Q&pid=ImgRaw&r=0",
    "category": 2
  }]


