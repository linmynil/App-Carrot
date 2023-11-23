const userSevice = require('./UserService');
const mailer = require('nodemailer');
const transporter = mailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'xxxxxxx',
        pass: 'xxxxxxx'
    },
});
const login = async (email, password) => {
    return await userSevice.login(email, password);
}
const register = async (email, password, name) => {
    try {
        return await userSevice.register(email, password, name);
    } catch (error) {
        console.log(error);
    }

}
const sendMail = async (email, subject, content) => {
    try {
        const mailOptions = {
            form: 'Huỳnh Thị Mỹ Linh <linhhtmps24266@fpt.edu.vn>',
            to: email,
            subject: subject,
            html: content
        }
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('Send email eror', error);
    }
    return false;
}
module.exports = { login, register, sendMail };
