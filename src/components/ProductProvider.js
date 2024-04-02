// import React,{useState} from "react";
// import ProductConsumer from "./ProductConsumer";
// // import axios from "axios";
// // import AuthContext from "./AuthContext";

// const ProductProvider = (props) => {
 
//   const [cartItem, setCartItem] = useState([]);

 

//   const handleCart = (item) => {
//     // Check if the item already exists in the cart
//     const existingItem = cartItem.find((cartItem) => cartItem.title === item.title);

//     if (existingItem) {
//       // If the item already exists, display an alert
//       alert("Item already added to the cart");
//     } else {
//       // If the item doesn't exist, add it to the cart
//       setCartItem([...cartItem, { ...item, quantity: 1 }]);
//     }
//   };
  
    
   
  
  

//   return (
//     <ProductConsumer.Provider value={{ cartItem, setCartItem, handleCart }}>
//       {props.children}
//     </ProductConsumer.Provider>
//   );
// };

// export default ProductProvider;
import React, { useState } from "react";
import ProductConsumer from "./ProductConsumer";
import axios from "axios";

const ProductProvider = (props) => {
  const [cartItem, setCartItem] = useState([]);

  const handleCart = async (item) => {
    // Check if the item already exists in the cart
    const existingItem = cartItem.find((cartItem) => cartItem.title === item.title);

    if (existingItem) {
      // If the item already exists, display an alert
      alert("Item already added to the cart");
    } else {
      setCartItem([...cartItem, { ...item, quantity: 1 }]);
      try {
        // Make a POST request to add the item to the cart in the backend
        const response = await axios.post(
          "https://crudcrud.com/api/3639ff6fcff74d09ac25679aa15c1f88/cart", // Replace YOUR_API_KEY with your actual API key
          { ...item, quantity: 1 }
         
        );
        console.log(response);

        // if (response.status === 200) {
        //   // If the request is successful, update the local state with the new item
        //   setCartItem([...cartItem, { ...item, quantity: 1 }]);
        //   alert("Item added to cart successfully");
        // } else {
        //   alert("Failed to add item to cart");
        // }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        alert("Failed to add item to cart");
      }
    }
  };

  return (
    <ProductConsumer.Provider value={{ cartItem, setCartItem, handleCart }}>
      {props.children}
    </ProductConsumer.Provider>
  );
};

export default ProductProvider;