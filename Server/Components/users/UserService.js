const ProductModel = require('../products/ProductModel');
const userModel = require('./UserModel');
const bcrypt = require('bcryptjs');


const login = async (email, password) => {
    // Gọi vào database để kiểm tra email và password
    // const user = users.find(u => u.email == email);
    // if (user && user.password == password) {
    //     return user;
    // }
    // return null;
    try {
        let user = await userModel.findOne({email:email});
        if(user){
            let check = bcrypt.compareSync(password,user.password);
            return check ? user :false;
        }
    } catch (error) {
        console.log('Login error',error);
    }
    return false;
};


const register = async (email, password, name) => {
    try {
        //Kiểm tra tài khoản có hay chưa
        const user = await userModel.findOne({ email: email });
        if(user) return false;
       
            // const newUser={
            //     _id:users.length +1,// tự tăng
            //     email:email,
            //     password:password,
            //     name:name
            // }
            // users.push(newUser);
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            const newUser = { email, password: hash, name,role:1 };
            const u = new userModel(newUser);
            await u.save();
            return true;
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = { login, register };

var users = [
    { _id: 1, email: 'abc@gmail.com', password: 1, name: 'ABC' },
    { _id: 2, email: 'abcd@gmail.com', password: 2, name: 'ABCD' },
    { _id: 3, email: 'abcde@gmail.com', password: 3, name: 'ABCDE' },
    { _id: 4, email: 'abcde1@gmail.com', password: 4, name: 'ABCDEG' },

]


