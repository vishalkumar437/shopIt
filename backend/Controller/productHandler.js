const cloudinary = require('cloudinary').v2;
const util = require('util');
const productSchema = require("../schema/product");
const rimraf = require("rimraf");
// const { response } = require('express');
const cloudinaryUploadAsync = util.promisify(cloudinary.uploader.upload);
cloudinary.config({
    cloud_name: 'dlbf4uryg',
    api_key: '419499971223446',
    api_secret: 'IYOI9OKyUyDUmVx7A4qid39U56M'
});

module.exports.insertProduct = async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const sellerId = req.body.sellerId;
    const sellerName = req.body.sellerName;
    let file = req.files;
    const price = req.body.price;
    const subcategory = req.body.subcategory.toLowerCase();
    const category = req.body.category.toLowerCase();
    const stock = req.body.stock;
    let imagesUrl = [];
    let imageArray;
    if (Array.isArray(file.images)) {
        console.log("Received multiple images.");
        imageArray = file.images;
    } else {
        console.log("Received a single image.");
        imageArray = [file.images];
    }

    const uploadPromises = imageArray.map(async (image) => {
        try {
            const result = await cloudinaryUploadAsync(image.tempFilePath, {
                folder: category + '/' + subcategory + '/' + name,
            });
            rimraf.sync("../tmp");
            return result.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null; // Handle the error gracefully
        }
    });
    function descriptionSplitter(description) {
        let descriptionArr = [];
        descriptionArr = description.split(".")
        return descriptionArr;
    }
    imagesUrl = await Promise.all(uploadPromises);
    const Product = new productSchema({
        name: name,
        description: descriptionSplitter(description),
        imageurl: imagesUrl,
        seller: { id: sellerId, name: sellerName },
        price: price,
        category: category,
        stock: stock,
        subcategory: subcategory
    })
    await Product.save().then(result => {
        console.log("Product Added");
        res.status(200).json({
            new_product: result
        })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}
module.exports.getProductById = async (req, res) => {
    let id = req.query.id;
    productSchema.findById(id).then((result) => {
        res.status(200).json({
            product: result,
        })
    })
        .catch((error) => {
            res.status(404).send({
                error: error
            })
        })
}
module.exports.getProductByCategory = async (req, res) => {
    let category = req.query.category;
    productSchema.find({ category: category }).then((result) => {
        result = result.map(product => ({
            ...product._doc,
            id: product._id
        }));

        res.status(200).json({
            product: result
        });
    })
        .catch((error) => {
            res.status(200).json({
                error: error
            })
        })
}

module.exports.searchProductByName = async(req,res)=>{
    let productName = req.body.productName;
    // console.log(productName);
    productSchema.find({name:{ '$regex' : productName, '$options' : 'i' }}).then((result) => {
        result = result.map(product => ({
            ...product._doc,
            id: product._id
        }));
        console.log(result);
        res.status(200).json({
            product: result
        });
    })
    .catch((error) => {
        res.status(200).json({
            error: error
        })
    })
}