const {signUp,signIn} = require('../controller/auth.controller')
const {signUpValidator,emailValidation,isUserExist,signInValidation} =require('../middlewares/auth.middleware');

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[signUpValidator,emailValidation,isUserExist],signUp);
    app.post("/ecomm/api/v1/auth/signin",[signInValidation],signIn);
}