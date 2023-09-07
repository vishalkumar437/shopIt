const cloudinary = require('cloudinary').v2;
const util = require('util');
const productSchema = require("../schema/product");
const cloudinaryUploadAsync = util.promisify(cloudinary.uploader.upload);
cloudinary.config({
    cloud_name: 'dlbf4uryg',
    api_key: '419499971223446',
    api_secret: 'IYOI9OKyUyDUmVx7A4qid39U56M'
});

module.exports.insertProduct = async (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const seller=req.body.seller[1];
        let file = req.files
        const price= req.body.price;
        const category=req.body.category;
        const stock=req.body.stock;
        let imagesUrl = [];
        let imageArray;
        if (Array.isArray(file.images)) {
            console.log("Received multiple images.");
            imageArray = file.images;
        } else {
            console.log("Received a single image.");
            imageArray = [file.images];
        }
          const uploadPromises = imageArray.map(async (image, index) => {
            try {
                const result = await cloudinaryUploadAsync(image.tempFilePath, {
                    folder: category + '/' + name,
                });
                return result.url;
            } catch (error) {
                console.error('Error uploading image:', error);
                return null; // Handle the error gracefully
            }
        });
        
        imagesUrl = await Promise.all(uploadPromises);
        const Product = new productSchema({
            name:name,
            description:description,
            imageurl:imagesUrl,
            seller:seller,
            price:price,
            category:category,
            stock:stock
        })
        await Product.save().then(result=>{
            console.log("Product Added");
            res.status(200).json({
                new_product : result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
        
    
}