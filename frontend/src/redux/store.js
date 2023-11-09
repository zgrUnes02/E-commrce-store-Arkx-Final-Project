import { configureStore } from '@reduxjs/toolkit' ;

import categoryReducer from './categorySlice' ;
import subcategoryReducer from './subcategorySlice' ;
import productReducer from './productSlice' ;
import userReducer from './userSlice' ;
import customerReducer from './customerSlice' ;
import companyReducer from './companySlice' ;
import orderReducer from './orderSlice' ;
import serviceReducer from './serviceSlice' ;

const store = configureStore({
    reducer : {
        category : categoryReducer ,
        subcategory : subcategoryReducer ,
        product : productReducer ,
        user : userReducer ,
        customer : customerReducer ,
        company : companyReducer ,
        order : orderReducer ,
        service : serviceReducer
    }
}) ;

export default store ;
