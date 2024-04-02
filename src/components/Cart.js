// import React,{useContext,useState} from 'react';
// import ProductConsumer from './ProductConsumer';
// import { Modal,Button } from 'react-bootstrap';

// // import AuthContext from './AuthContext';
// import './Cart.css';



// const Cart = () => {
//   let { cartItem, setCartItem } = useContext(ProductConsumer);
//   const [showModal, setShowModal] = useState(false);
 

//   const handleModalShow = () => {
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };
 
// const TotalPrice = (cartItem ?? []).reduce((accu, item) => {
//   accu += item.quantity * item.price;
//   return accu;
// }, 0);


//   function increaseItem(ind) {
//     setCartItem((prevItem) =>
//       prevItem.map((item, index) =>
//         index === ind ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   }
  

//   function reduceItem(ind) {
//     setCartItem((prevItem) =>
//       prevItem
//         .map((item, index) =>
//           item.quantity > 0 && index === ind
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   }
  
//   function handleAlert() {
//     (totalQuantity !== 0) && window.alert("Thanks for purchasing with us!!!");
//   }

    
    
  
//     // Calculate total quantity
//     const totalQuantity = cartItem.reduce((total, cartMedicine) => total + cartMedicine.quantity, 0);
  
//   //   return (
//   //     <div  className="cart-container">
//   //       <button>
//   //           Cart 
//   //       <span className="total-cart-items" > {totalQuantity > 0 && <p>{totalQuantity}</p>}</span>  
//   //       </button>
    
//   //     </div>
//   //   );
//   // };
  
//   // export default Cart;
//   return (
//     <div>
//       <div className="cart-container">
//         <div className="total-cart-item">{totalQuantity}</div>
//         <Button onClick={handleModalShow}>Cart</Button>
//       </div>
//       <Modal
//         show={showModal}
//         onHide={handleModalClose}
//         dialogClassName="modal-right"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Shopping Cart</Modal.Title>
//         </Modal.Header>
//         {/* <div className="heading">
//           <p>Item</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p></p>
//         </div> */}
//         <Modal.Body>
//           <div className="product-card">
//             {cartItem &&
//               cartItem.map((item, index) => (
//                 <div className="product-child" key={index}>
//                   <div className="product-child_image">
//                     <img src={item.imageUrl} alt={item.title} />
//                     <p> item:{item.title}</p>
//                   </div>
//                   <p>Price:{item.price}</p>
//                   <p> Quantity:{item.quantity}</p>
//                   <div className="btn">
//                   <button onClick={() => increaseItem(index)}>+</button>
//                     <button onClick={() => reduceItem(index)}>-</button>
                    
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </Modal.Body>
//         <h3 className="total">Total : $ {TotalPrice.toFixed(2)}</h3>
//         <button onClick={handleAlert} className="purchase">
//           Purchase
//         </button>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Cart;
import React, { useContext, useState, useEffect } from 'react';
import ProductConsumer from './ProductConsumer';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios'; // Import axios for HTTP requests
import './Cart.css';
// import ProductProvider from './ProductProvider';
import AuthProvider from './AuthProvider';

const Cart = () => {
  const { cartItem, setCartItem,isLogin } = useContext(ProductConsumer);
  const inputEmail=useContext(AuthProvider);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [userEmail, setUserEmail] = useState("");

  // const fetchUserEmail = () => {
  //   // Logic to fetch user's email based on isLogin state
  //   const email = isLogin ? "prasadyash123@gmail.com" : ""; // Example email
  //   setUserEmail(email);
  // };
  useEffect(() => {
    // Fetch cart items when the modal is shown
    if (showModal) {
      fetchCartItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal,isLogin]);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // const fetchCartItems = async () => {
  //   try {
  //     setLoading(true);
  //     // Make a GET request to fetch cart items
  //     const response = await axios.get("https://crudcrud.com/api/3639ff6fcff74d09ac25679aa15c1f88"); // Replace with your actual API endpoint
  //     // Check if the response contains data and cart items
  //     if (response.data && response.data.cartItems) {
  //       // Update the cart items state with the data fetched from the API
  //       setCartItem(response.data.cartItems);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching cart items:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const sanitizedEmail = {inputEmail}.replace(/[@.]/g, "");
      const response = await axios.get(`https://crudcrud.com/api/${sanitizedEmail}/cart`);
      if (response.data && response.data.cartItems) {
        setCartItem(response.data.cartItems);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };


  const increaseItem = (ind) => {
    setCartItem((prevItem) =>
      prevItem.map((item, index) =>
        index === ind ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const reduceItem = (ind) => {
    setCartItem((prevItem) =>
      prevItem.map((item, index) =>
        index === ind ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      )
    );
  };

  const handleAlert = () => {
    if (cartItem && cartItem.length > 0) {
      window.alert('Thanks for purchasing with us!!!');
    } else {
      window.alert('Your cart is empty!');
    }
  };

  // Calculate total quantity
  const totalQuantity = cartItem.reduce((total, cartMedicine) => total + cartMedicine.quantity, 0);

  // Calculate total price
  const totalPrice = cartItem.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div>
      <div className="cart-container">
        <div className="total-cart-item">{totalQuantity}</div>
        <Button onClick={handleModalShow}>Cart</Button>
      </div>
      <Modal show={showModal} onHide={handleModalClose} dialogClassName="modal-right">
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="product-card">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {cartItem.map((item, index) => (
                  <div className="product-child" key={index}>
                    <div className="product-child_image">
                      <img src={item.imageUrl} alt={item.title} />
                      <p>Item: {item.title}</p>
                    </div>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <div className="btn">
                      <button onClick={() => increaseItem(index)}>+</button>
                      <button onClick={() => reduceItem(index)}>-</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </Modal.Body>
        <h3 className="total">Total: $ {totalPrice.toFixed(2)}</h3>
        <button onClick={handleAlert} className="purchase">
          Purchase
        </button>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Cart;
// import React, { useContext, useState, useEffect } from 'react';
// import ProductConsumer from './ProductConsumer';
// import { Modal, Button } from 'react-bootstrap';
// import axios from 'axios'; // Import axios for HTTP requests
// import './Cart.css';

// const Cart = () => {
//   const { cartItem, setCartItem } = useContext(ProductConsumer);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Fetch cart items when the modal is shown
//     if (showModal) {
//       fetchCartItems();
//     }
//   }, [showModal]);

//   const handleModalShow = () => {
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   const fetchCartItems = async () => {
//     try {
//       setLoading(true);
//       // Make a GET request to fetch cart items
//       const response = await axios.get("https://crudcrud.com/api/3639ff6fcff74d09ac25679aa15c1f88"); // Replace with your actual API endpoint
//       // Check if the response contains data and cart items
//       if (response.data && response.data.cartItems) {
//         // Update the cart items state with the data fetched from the API
//         setCartItem(response.data.cartItems);
//       }
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//     } finally {
//       setLoading(false);
//     }
//   };


  
//   const increaseItem = (ind) => {
//     setCartItem((prevItem) =>
//       prevItem.map((item, index) =>
//         index === ind ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const reduceItem = (ind) => {
//     setCartItem((prevItem) =>
//       prevItem
//         .map((item, index) =>
//           index === ind ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
//         )
//     );
//   };

//   const handleAlert = () => {
//     if (cartItem && cartItem.length > 0) {
//       window.alert('Thanks for purchasing with us!!!');
//     } else {
//       window.alert('Your cart is empty!');
//     }
//   };

//   // Calculate total quantity
//   const totalQuantity = cartItem.reduce((total, cartMedicine) => total + cartMedicine.quantity, 0);

//   // Calculate total price
//   const totalPrice = cartItem.reduce((total, item) => total + item.quantity * item.price, 0);

//   return (
//     <div>
//       <div className="cart-container">
//         <div className="total-cart-item">{totalQuantity}</div>
//         <Button onClick={handleModalShow}>Cart</Button>
//       </div>
//       <Modal show={showModal} onHide={handleModalClose} dialogClassName="modal-right">
//         <Modal.Header closeButton>
//           <Modal.Title>Shopping Cart</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="product-card">
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               <>
//                 {cartItem.map((item, index) => (
//                   <div className="product-child" key={index}>
//                     <div className="product-child_image">
//                       <img src={item.imageUrl} alt={item.title} />
//                       <p>Item: {item.title}</p>
//                     </div>
//                     <p>Price: {item.price}</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <div className="btn">
//                       <button onClick={() => increaseItem(index)}>+</button>
//                       <button onClick={() => reduceItem(index)}>-</button>
//                     </div>
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>
//         </Modal.Body>
//         <h3 className="total">Total: $ {totalPrice.toFixed(2)}</h3>
//         <button onClick={handleAlert} className="purchase">
//           Purchase
//         </button>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };
// export default Cart;