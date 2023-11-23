const categoryModel = require('./CategoryModel');
const getAllCategories = async () => {
    try {
       // return data;
       // select * from categories
       return await categoryModel.find();
    } catch (error) {
        console.log("get all categories error", error);
        throw error;
    }
    return [];
}


module.exports = { getAllCategories };


var data = [{
    "_id": 1,
    "name": "Lotstring"
}, {
    "_id": 2,
    "name": "Solarbreeze"
}, {
    "_id": 3,
    "name": "Tempsoft"
}, {
    "_id": 4,
    "name": "Subin"
}, {
    "_id": 5,
    "name": "Otcom"
}, {
    "_id": 6,
    "name": "Flowdesk"
}, {
    "_id": 7,
    "name": "Stringtough"
}, {
    "_id": 8,
    "name": "Rank"
}, {
    "_id": 9,
    "name": "Hatity"
}, {
    "_id": 10,
    "name": "Temp"
}]
