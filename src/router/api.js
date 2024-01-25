const express = require('express');
const products = require('../controllers/product.controller');
const brands = require('../controllers/brand.controller');
const categories = require('../controllers/category.controller');
const attributes = require('../controllers/attributesProduct.controller');
const cart = require('../controllers/cart.controller');
const { uploads } = require('../controllers/upload.controller');
const multer = require('multer');
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});


router.get('/products', products.findAll)
router.get('/products/:id', products.findById)
router.post('/products/search', products.searchProductByNameWithCategory)
router.post('/products', products.createProduct)
router.put('/products/:id', products.updateProduct)
router.delete('/products/:id', products.deleteProductById)

// upload files
router.post("/upload/single", upload.single('image'), uploads)
router.post("/upload/multiple", upload.array('images', 12), uploads)
// brand
router.get('/brands', brands.findAll)
router.post('/brands', brands.create)
router.get('/brands/:id', brands.findById)
router.delete('/brands/:id', brands.deleteById)
router.put('/brands/:id', brands.update)

// category
router.get('/categories', categories.findAll)
router.get('/categories/:id', categories.findById)
router.post('/categories', categories.create)
router.put('/categories/:id', categories.update)
router.delete('/categories/:id', categories.deleteById)
// attributes

router.get('/products/attr/:id', attributes.findById)
router.get('/products/attr/:id/category', attributes.getAttributesByCategory)

router.get('/cart/:id', cart.findByCustomerId)
router.post('/cart', cart.create)

module.exports = router;