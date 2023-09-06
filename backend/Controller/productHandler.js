const cloudinary = require('cloudinary').v2;
const productSchema = require("../schema/product");
cloudinary.config({
    cloud_name: 'dlbf4uryg',
    api_key: '419499971223446',
    api_secret: 'IYOI9OKyUyDUmVx7A4qid39U56M'
});

module.exports.insertProduct = async (req, res) => {
        const name = req.body.name[1];
        const description = req.body.description;
        const seller=req.body.seller[1];
        let file = req.files
        const price= req.body.price[1];
        const category=req.body.category[1];
        const stock=req.body.stock[1];
        const imagesUrl = [];
        console.log(seller)
        if (!Array.isArray(file)) {
            file = [req.files];
          }
        file.map(async (image,index)=>{
            console.log(image)
            const cloudinaryResponse = await cloudinary.uploader.upload(image, {
                folder: toString(category+'/'+name+index) // Optional: Organize images in a folder
              });
              imagesUrl.push(cloudinaryResponse.secure_url)
        }     
        )
        const Product = new productSchema({
            name:name,
            description:description,
            imageurl:imagesUrl,
            seller:seller,
            price:price,
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