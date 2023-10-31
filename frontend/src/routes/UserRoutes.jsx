import React from 'react' ;
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom' ;
import Customers from '../pages/user/Customers';
import Companies from '../pages/user/Companies';
import Products from '../pages/user/Products';
import Categories from '../pages/user/Categories';
import Subcategories from '../pages/user/Subcategories';
import Orders from '../pages/user/Orders';
import Users from '../pages/user/Users';
import Dashboard from '../pages/user/Dashboard';
import CategoriesCreate from '../pages/user/CategoriesCreate';
import SubcategoriesCreate from '../pages/user/SubcategoriesCreate';
import ProductCreate from '../pages/user/ProductsCreate';
import UsersCreate from '../pages/user/UsersCreate';
import Services from '../pages/user/Services';
import ServicesCreate from '../pages/user/ServicesCreate';
import CompaniesCreate from '../pages/user/CompaniesCreate';
import Profile from '../pages/user/Profile';
import CategoriesUpdate from '../pages/user/CategoriesUpdate';
import SubcategoriesUpdate from '../pages/user/SubcategoriesUpdate';

function UserRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/profile' element={<Profile/>} />

        <Route path='/dashboard' element={<Dashboard/>} />

        <Route path='/customers' element={<Customers/>} />

        <Route path='/companies' element={<Companies/>} />
        <Route path='/companies/create' element={<CompaniesCreate/>} />

        <Route path='/products' element={<Products/>} />
        <Route path='/products/create' element={<ProductCreate/>} />
        
        <Route path='/categories' element={<Categories/>} />
        <Route path='/categories/create' element={<CategoriesCreate/>} />
        <Route path='/category/update/:id' element={<CategoriesUpdate/>} />

        <Route path='/subcategories' element={<Subcategories/>} />
        <Route path='/subcategories/create' element={<SubcategoriesCreate/>} />
        <Route path='/subcategories/update/:id' element={<SubcategoriesUpdate/>} />

        <Route path='/orders' element={<Orders/>} />

        <Route path='/users' element={<Users/>} />
        <Route path='/users/create' element={<UsersCreate/>} />

        <Route path='/services' element={<Services/>} />
        <Route path='/services/create' element={<ServicesCreate/>} />

      </Routes>
    </Router>
  )
}

export default UserRoutes ;

