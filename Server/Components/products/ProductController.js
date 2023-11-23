const productService = require('./ProductService');
// page: so trang hien tai
//limit: so san pham tren mot trang
const getAllProducts = async (page,limit) => {
    try {
        // return await productService.getAllProducts();
        return await productService.getAllProducts();

    } catch (error) {
        throw error;
    }

}
const deleteProductById = async (id) => {
    try {
        return await productService.deleteProductById(id);
    } catch (error) {
        throw error;
    }
}

const addnewproduct = async (name, price, quantity, image, category) => {
    try {
        return await productService.addnewproduct(name, price, quantity, image, category);

    } catch (error) {
        console.log('Add new product error'. error);
    }
}

const updateProduct = async (id,name, price, quantity, image, category) => {
    try {
        return await productService.updateProduct(id, name, price, quantity, image, category);  //copy qua không thêm id vào

    } catch (error) {
        console.log('Update product error', error); 
    }
}
const getProductById = async (id) => {
    try {
        return await productService.getProductById(id);

    } catch (error) {
        console.log('Get product by id error', error);
    }
}

const searchProductByName = async (name)=>{
    try {
        return await productService.searchProductByName(name);
    } catch (error) {
        console.log('Get product by id error', error);
    }
    return null;
}
const search = async (keyword)=>{
    try {
        return await productService.search(keyword);
    } catch (error) {
        console.log('Get product by id error', error);
    }
    return null;
}
module.exports = { getAllProducts, deleteProductById, addnewproduct,updateProduct,getProductById, searchProductByName, search };