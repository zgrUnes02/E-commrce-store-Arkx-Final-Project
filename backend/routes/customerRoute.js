const express = require("express");
const customerController = require("../controllers/customerController.js");
const customerRouter = express.Router();
const { body } = require("express-validator");
const customerVerification = require('../middlewares/customerVerification') ;
const authUserVerification = require('../middlewares/authUserVerification') ;

//! Customer authentication ( Login )
customerRouter.post('/customers/login' , [
  body("email")
    .trim()
    .notEmpty().withMessage('the email is required')
    .isEmail().withMessage('please enter a valid email') , 
  body("password")
    .trim()
    .notEmpty().withMessage('the password is required')
] , customerController.authenticateUser) ;

//! Create new customer ( Register )
customerRouter.post(
  "/customers/register",
  [
    body("first_name")
      .trim()
      .notEmpty().withMessage("the first name is required")
      .isAlpha().withMessage("please enter a valid first name") ,
    body("last_name")
      .trim()
      .notEmpty().withMessage("the last name is required")
      .isAlpha().withMessage("please enter a valid last name") ,
    body("email")
      .trim()
      .notEmpty().withMessage("the email is required")
      .isEmail().withMessage("please enter a valid email") ,
    body("password")
      .trim()
      .notEmpty().withMessage("the password is required") ,
  ],
  customerController.customerRegister
);

//! Get all customers
customerRouter.get("/customers" , customerController.listingCustomers);

//! Search for a customer
customerRouter.get("/customer" , customerController.searchForCustomer);

//! Customer profile
customerRouter.get("/customer/profile" , customerVerification , customerController.customerProfile);

//! Get a customer by ID
customerRouter.get("/customers/:id" , customerController.getCustomerById);

//! Validate the customer's account
customerRouter.put("/validate/:id" , customerController.validateAndInvalidateCustomerAccount);

//! Updating the customer's data 
customerRouter.put(
  "/customers/:id" ,
  [
    body("first_name")
      .trim()
      .notEmpty().withMessage("the first name is required")
      .isAlpha().withMessage("please enter a valid first name"),
    body("last_name")
      .trim()
      .notEmpty().withMessage("the last name is required")
      .isAlpha().withMessage("please enter a valid last name"),
    body("email")
      .trim()
      .notEmpty().withMessage("the email is required")
      .isEmail().withMessage("please enter a valid email") ,
    body("active")
      .trim()
      .notEmpty().withMessage('please choose the account activation')
      .isBoolean().withMessage('please enter a valid value of the activation account')
  ],
  customerController.updateCustomer
);

//! Block or unblock a customer 
customerRouter.put("/customers/block-unblock/:id" , customerVerification , customerController.blockOrUnblock) ;

//! Deleting the customer's account
customerRouter.delete("/customers/delete/:id" , authUserVerification , customerController.deleteCustomer) ;

module.exports = customerRouter;
