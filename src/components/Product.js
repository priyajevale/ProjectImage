
import React,{useContext} from "react";
import './Product.css';
import ProductConsumer from "./ProductConsumer";


 export const productsArr = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },

  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },

  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },

  {
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const Product = () => {

  const {handleCart} =useContext(ProductConsumer);

  return(
    <div className="cardd">
      <h1>Music</h1>
      
      <div className="card-child">
        {
          productsArr.map((item,index)=>(
            <div className="card__child" key={index} >
                <h3>{item.title}</h3>
                <img src={item.imageUrl} alt={item.title}/>
                <div className="price">
                  <p>$ {item.price}</p>
                  <button onClick={() =>handleCart(item)}>ADD TO CART</button>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default Product;