
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ProductProvider from './components/ProductProvider';
import AuthForm from './components/Auth';
import Product from './components/Product';
import AboutPage from './components/About';
import ContactUs from './components/ContactUs';
import HomePage from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import STORE from './components/Store';
import MessageDisplay from './components/MessageDisplay';
import './App.css';
// import AuthProvider from './components/AuthProvider';
// import { Navigate } from 'react-router-dom';
// import LoginAuthForm from './components/LoginAuthForm';
// import ProtectedRoute from './components/ProtectedRoute';
// import ProtectedRoute from './components/ProtectedRoute';
 
// import AuthContext from './components/AuthContext';
// import Auth from './components/Auth';
// import { Navigate } from 'react-router-dom';
// import AuthProvider from './components/AuthProvider';

function App() {
 
  // const isLogin =useContext(AuthProvider)
  
  return (
    
    <ProductProvider>
      <Router>
        <div className="App">
          <div className='nav'>
            <NavLink to="/home" >Home</NavLink>
            <NavLink to="/product">product</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact-us">Contact Us</NavLink>
            <NavLink to="/auth">Auth</NavLink>
            <Cart />
          </div>
          
           <Routes>
           {/* {isLogin ? (
          <Route path='/Product' element={<Product/>} />
        ) : (
          <Route path='/Product' element={<Navigate to="/AuthForm" />} />
        )}  */}
            <Route path='/about' element={<AboutPage />} />
            <Route path='/store' element={<STORE/>} />
            <Route path="/product" element={<Product />} /> 
            <Route path='/home' element={<HomePage />} />
            
            
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path='/contact-us' element={<ContactUs />} />
            {/* {!isLogin && <Route path='/' element={<Auth />} />} */}
            <Route path='/auth' element={<AuthForm />} />
          </Routes>
        </div>
        <MessageDisplay/>
      </Router>
      
    </ProductProvider>
    
  );
}

export default App;
// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
// import { ProductProvider } from './components/ProductProvider';
// import AuthForm from './components/Auth';
// import Product from './components/Product';
// import AboutPage from './components/About';
// import ContactUs from './components/ContactUs';
// import HomePage from './components/Home';
// import Cart from './components/Cart';
// import ProductDetails from './components/ProductDetails';
// import STORE from './components/Store';
// import AuthProvider from './components/AuthProvider';
// import AuthContext from './components/AuthContext'; // Import AuthContext
// import { productsArr } from './components/Product';

// function App() {
//   const { isLoggedIn } = useContext(AuthContext); // Use AuthContext to get the isLoggedIn state
  
//   return (
//     <ProductProvider>
//       <Router>
//         <div className="App">
//           <div className='nav'>
//             <NavLink to="/home" >Home</NavLink>
//             <NavLink to="/product">product</NavLink>
//             {isLoggedIn ? (
//               <NavLink to="/product">product</NavLink>
//             ) 
//             : (
//               <NavLink to="/auth">Auth</NavLink>
//             )}
//             <NavLink to="/about">About</NavLink>
//             <NavLink to="/contact-us">Contact Us</NavLink>
//             <Cart />
//           </div>
          
//           <Routes>
//             <Route path='/about' element={<AboutPage />} />
//             <Route path='/store' element={<STORE/>} />
//             {isLoggedIn ? (
//               <Route path="/product" element={<productsArr />} /> 
//             ) : (
//               <Route path="/product" element={<Navigate to="/Auth" />} />
//             )}
//             <Route path='/home' element={<HomePage />} />
//             <Route path="/product/:productId" element={<ProductDetails />} />
//             <Route path='/contact-us' element={<ContactUs />} />
//             <Route path='/auth' element={<AuthForm />} />
//           </Routes>
//         </div>
//       </Router>
//     </ProductProvider>
//   );
// }

// export default App;