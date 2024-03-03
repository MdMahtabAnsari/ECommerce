const { createProduct } = require('../controller/product.controller');
const { productValidation, isProductCatagoryExist, isProductExist } = require('../middlewares/product.middleware');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

module.exports = (app) => {
    app.post('/ecomm/api/v1/products/create', [verifyToken, isAdmin, productValidation, isProductCatagoryExist, isProductExist], createProduct);
    
}