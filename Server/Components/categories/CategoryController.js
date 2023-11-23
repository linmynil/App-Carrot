const categoryServive = require("./CategoryService");

const getAllCategories = async () => {
    try {
        return await categoryServive.getAllCategories();
    } catch (error) {
        console.log(error)
    }
}
module.exports = { getAllCategories };