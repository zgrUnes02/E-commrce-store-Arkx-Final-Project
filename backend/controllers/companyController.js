const companyModel = require("../models/companyModel");
const { validationResult } = require('express-validator') ;
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;

const companyController = {

    //! Create a new company ( Register )
    registerCompany : async (req , res) => {
        const { companyName , description , email , city , location , logo } = req.body ;

        //* Check is there is any validation problem
        const errors = validationResult(req) ; 
        if ( !errors.isEmpty() ) {
            return res.status(400).json(errors) ;
        }

        //* Check is company already exists
        const company = await companyModel.findOne({email : email}) ;
        if ( company ) {
            return res.status(403).json({
                message : 'this email is already registered' ,
            }) ;
        }

        try {
            const company = await companyModel.create({
                companyName : companyName ,
                description : description ,
                email : email ,
                city : city ,
                location : location ,
                logo : logo ,
            }) ;

            if ( company ) {
                res.status(200).json({
                    message : 'the company has been created with success' ,
                    company : company ,
                }) ;
            }
        }
        catch ( error ) {
            console.log( error ) ;
        }
    } ,

    //! Authenticate a company ( Login )
    loginCompany : async (req , res) => {
        const { email , password } = req.body ; 

        //* Check is there is any validation problem
        const errors = validationResult(req) ; 
        if ( !errors.isEmpty() ) {
            return res.status(400).json(errors) ;
        }

        try {
            //* Check if any company registered by this email 
            const company = await companyModel.findOne({email : email}) ;

            if ( company ) {
                //* Check if password correct
                const comparePasswords = await bcrypt.compare(password , company.password) ;

                if ( comparePasswords ) {
                    //* Generate the token
                    const token = jwt.sign({email : email} , process.env.JWT_SECRET) ;

                    if ( token ) {
                        res.status(200).json({
                            message : `welcome back ${company.companyName}` ,
                            token : token ,
                        }) ;
                    }
                }
                else {
                    res.status(200).send('the password is incorrect') ;
                }
            }
            else {
                res.status(404).send('there is no company with this email')
            }

        }
        catch ( error ) {
            console.log( error ) ;
        }
    } ,

    //! Get all companies 
    getAllCompanies : async (req , res) => {
        try {
            //* Paginate the customers
            const companies = await companyModel.paginate(
                {} , 
                { page : req.query.page , limit : 100 }
            ) ;
            res.status(200).send(companies) ;
        }
        catch ( error ) {
            console.log('Something went wrong' , error) ;
        }
    } ,

    //! Update the company data
    updateCompanyData : async (req , res) => {
        const { companyName , description , city , location , logo , email } = req.body ;
        const { id } = req.params ;

        //* Check is there is any validation problem
        const errors = validationResult(req) ; 
        if ( !errors.isEmpty() ) {
            return res.status(400).json(errors) ;
        }
        
        try {
            //* Update the company data
            const companyUpdate = await companyModel.findByIdAndUpdate(id , {
                companyName : companyName ,
                description : description ,
                logo : logo ,
                city : city ,
                location : location ,
                email : email ,
            }) ;

            if ( companyUpdate ) {
                res.status(200).json({message :'the company data has been updated with success'}) ;
            }
        }
        catch ( error ) {
            res.status(404).json( error )
        }
    } ,

    //! Delete company 
    deleteCompany : async (req , res) => {
        const { id } = req.params ;
        try {
            const deletedCompany = await companyModel.findByIdAndDelete(id) ;
            if ( deletedCompany ) {
                res.status(200).json({
                    message : 'The company has been deleted with success' ,
                })
            } 
        }
        catch ( error ) {
            res.status(404).json( error )
        }
    }
}

module.exports = companyController ;
