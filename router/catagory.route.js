const {createCatagory,updateCatagory,deleteCatagory,getCatagory} = require('../controller/catagory.controller');
const {validateCatagory,isCatagoryExist,updateCatagoryValidation,deleteValidation} = require('../middlewares/catagory.middleware');
const {verifyToken,isAdmin} = require('../middlewares/auth.middleware');


module.exports=(app)=>{
    app.get('/ecomm/api/v1/catagories',getCatagory);
    app.post('/ecomm/api/v1/catagories/create',[verifyToken,isAdmin,validateCatagory,isCatagoryExist],createCatagory);
    app.put('/ecomm/api/v1/catagories/update',[verifyToken,isAdmin,updateCatagoryValidation],updateCatagory);
    app.delete('/ecomm/api/v1/catagories/delete',[verifyToken,isAdmin,deleteValidation],deleteCatagory);
}
