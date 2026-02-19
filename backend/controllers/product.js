import Product from "../models/product.js"

const getProductByCategoryId = async(req, res)=> {

    const {categoryId} = req.params;

    try {
          const products = await Product.find({category:categoryId})
          if(!products || products.length ===0){
            return res.status(404).json({
                sucess : false,
                message : "No Products found for this category"
            })
          }
          res.status(200).json({
            sucess : true,
            products,
          })
        
    } catch (error) {
        res.status(500).json({
            sucess : false,
            message : "Failed to retrivve products",
            error : error.message
        })
    }
}
export {getProductByCategoryId}