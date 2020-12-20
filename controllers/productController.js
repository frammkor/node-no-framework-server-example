const Product = require('../models/productModel');

const {getPostData} = require('../utils/utils');

// @desc Get All Products @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        // res.statusCode = 200; res.setHeader('Content-Type', 'text/html');
        // res.write('<h1>Hello</h1>'); res.end();

        res.writeHead(200, {'Content-Type': 'application/json'})
        // res.write(JSON.stringify(product)) OR
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log("getProducts error", error)
    }
}

// @desc Get Single Product @route GET /api/products/:id
async function getProductById(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }

    } catch (error) {
        console.log("getProducts error", error)
    }
}

// @desc Create a product by @route POST /api/products
async function createProduct(req, res) {

    try {

        const body = await getPostData(req);
        const {title, description, price} = body;

        const product = {
            title,
            description,
            price
        }

        // The new product object was not being returned because they keyword await was
        // not used Product.create returns a Promise that must be awaited
        const newProduct = await Product.create(product);

        res.writeHead(201, {'Content-Type': 'application/json'})

        return res.end(JSON.stringify(newProduct))

    } catch (error) {

        console.log("createProduct error", error)

    }
}

// @desc Update a single product by Id @route PUT /api/products/:id
function updateProductById(req, res, id) {

    try {

        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Product Not Found'}));
        } else {

            const body = await getPostData(req);
            const {title, description, price} = body;

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updatedProduct = await Product.update(id, productData);

            res.writeHead(200, {'Content-Type': 'application/json'})

            return res.end(JSON.stringify(updatedProduct))

        }

    } catch (error) {

        console.log("createProduct error", error)

    }
}

// @desc Delete a single product by Id @route DELETE /api/products/:id
function deleteProductById(res, req, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            await Product.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Product ${id} removed`}))
        }

    } catch (error) {
        console.log("getProducts error", error)
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
}