const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel") ;
const { validationResult } = require("express-validator");

const productController = {

    //! Create new product
    addProduct : async (req, res) => {
        const {
            product_image,
            product_name,
            subcategory_id,
            category_id,
            short_description,
            long_description,
            price,
            discount_price,
            options,
            active,
        } = req.body;

        //* Check is there is any validation problem
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        //* adding a new product
        try {
            const newProduct = await productModel.create({
                sku: `sku${Math.floor(Math.random() * 100000000)}`,
                product_image: product_image,
                product_name: product_name,
                subcategory_id: subcategory_id,
                category_id: category_id,
                short_description: short_description,
                long_description: long_description,
                price: price,
                discount_price: discount_price,
                options: options,
                active : active
            });
            res.status(200).json({
                message: "Product added with success",
                product: newProduct,
            });
        } catch (error) {
            console.log(error);
        }
    },

    //! Get all the products list
    listingProducts : async (req , res) => {
        try {
            //* Here are my option that i will use to paginate
            var options = {
                sort : { created_at: -1 } ,
                lean : true ,
                populate : ['subcategory_id' , 'category_id'] ,
                page : req.query.page  ,
                limit : 100 ,
            } ;

            //* Paginate with populate
            const products = await productModel.paginate({} , options) ;

            //* Send all products with the name of the category and subcategory
            if ( products ) {
                res.status(200).send(products);
            }
        } 
        catch (error) {
            console.log("Something went wrong", error);
        }
    },

    //! Search for a product
    searchForProduct : async (req , res) => {
        try {
            //* Here are my option that i will use to paginate
            var options = {
                sort : { created_at: -1 } ,
                lean : true ,
                populate : 'company_id' ,
                page : req.query.page  ,
                limit : 10 ,
            };

            //* Paginate with populate
            const products = await productModel.paginate({ product_name: {$regex : req.query.name }} , options);

            //* Send all products with the name of the company
            if ( products ) {
                res.status(200).send(products);
            }

        } catch (error) {
            console.log("Something went wrong", error);
        }
    },

    //! Get a product by ID
    getProductById : async (req, res) => {
        const { id } = req.params;
        try {
            const products = await productModel.findOne({ _id: id }).populate([
                {path : 'company_id' , select : 'companyName'} ,
                {path : 'subcategory_id' , select : 'subcategory_name'} ,
            ]);
            res.status(200).send(products);
        } catch (error) {
            console.log(error);
        }
    },

    //! Add a product to cart
    addToCart : async (req , res) => {

        const { id } = req.params ;
        const customer = req.customer ;

        try {
            const product = await productModel.find({_id : id}) ;
            var isProductExistsInCart = false ;
            
            const searchIfProductExistsInCart = await cartModel.find({customer_id : customer._id}) ;
            
            searchIfProductExistsInCart.map(cart => {
                if ( cart.product[0]._id.toString() == id ) {
                    isProductExistsInCart = true ;
                }
            })

            if ( isProductExistsInCart == false ) {
                const customerCart = await cartModel.create({customer_id : customer._id  , product : product}) ;
                if ( customerCart ) {
                    res.status(200).send('The product has been added with success !')
                }
            } else {
                res.status(200).send('The product is already exists in the cart !')
            }
        } 
        catch (error) {
            console.log(error);
        }
    } ,

    //! update a product
    updateProduct : async (req, res) => {
         const {
            product_name,
            product_image,
            subcategory_id,
            short_description,
            long_description,
            price,
            discount_price,
            options,
            active,
        } = req.body;

        //* Check is there is any validation problem
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { id } = req.params;
        try {
            //* find the product to update
            const productToUpdate = await productModel.findOne({ _id: id });

            //* update the product
            await productModel.findByIdAndUpdate(productToUpdate._id , {
                    product_name: product_name,
                    product_image: product_image,
                    subcategory_id: subcategory_id,
                    short_description: short_description,
                    long_description: long_description,
                    price: price,
                    discount_price: discount_price,
                    options: options,
                    active: active,
            });
            res.status(200).json({ message: "The product has been updated with success" });
        } catch ( error ) {
            console.log( error );
        }
    },

    //! delete a product
    deleteProduct : async (req , res) => {
      
        const { id } = req.params;

        try {
            await productModel.findByIdAndDelete(id);
            res.status(200).json({ message: "The product has been deleted with success"});
        } catch ( error ) {
            console.log( error );
        }
    } ,
};

module.exports = productController;
