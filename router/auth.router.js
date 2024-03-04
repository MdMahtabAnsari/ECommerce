const {signUp,signIn,verifyOTP,generateOTP} = require('../controller/auth.controller')
const {signUpValidator,emailValidation,isUserExist,signInValidation,validateOTP,valiadteGenerateOTP} =require('../middlewares/auth.middleware');

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[signUpValidator,emailValidation,isUserExist],signUp);
    app.post("/ecomm/api/v1/auth/signin",[signInValidation],signIn);
    app.post("/ecomm/api/v1/auth/validateToken",[validateOTP],verifyOTP);
    app.post("/ecomm/api/v1/auth/verify/generateToken",[valiadteGenerateOTP],generateOTP);

}