import { Fragment, useContext } from "react";
// import { ProductProvider } from "./ProductProvider";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { productsArr } from "./Product";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import ProductProvider from "./ProductProvider";

const STORE = () => {
  const cartCtx = useContext(ProductProvider);
  const authCtx = useContext(AuthContext);
  const addToCartHandler = async (item) => {
    cartCtx.addItem({
      id: item.id,
      imageUrl: item.imageUrl,
      title: item.title,
      price: item.price,
      amount: 1,
    });
    console.log(item);
    const response = await fetch(
      `https://react-project-82760-default-rtdb.firebaseio.com//ProductData/${authCtx.email}.json`,
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <Fragment>
      <p
        className="display-5 text-center p-3 bg-secondary mt-1 text-white"
        style={{ fontSize: "8em", fontFamily: "bold" }}
      >
        The Generics
      </p>
      <h2 style={{ textAlign: "center" }}>Music</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          {productsArr.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <Card
                  style={{
                    width: "18rem",
                    margin: "20px",
                    marginRight: "70px",
                    border: "none",
                  }}
                  key={index}
                >
                  <Card.Body>
                    <Card.Title
                      style={{ marginBottom: "15px", textAlign: "center" }}
                    >
                      {item.title}
                    </Card.Title>

                    <Link to={`/product/${item.id}`}>
                      <Card.Img
                        variant="center"
                        src={item.imageUrl}
                        style={{
                          transition: "transform .3s",
                          width: "100%",
                          height: "100%",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    </Link>

                    <Card.Text style={{ float: "left", marginTop: "15px" }}>
                      ${item.price}
                    </Card.Text>
                    <Button
                      variant="primary"
                      style={{ float: "right", marginTop: "15px" }}
                      onClick={() => addToCartHandler(item)}
                    >
                      Add to Cart
                    </Button>
                    <div style={{ clear: "both" }}></div>
                  </Card.Body>
                </Card>
              );
            } else {
              return null;
            }
          })}
        </div>

        <div>
          {productsArr.map((item, index) => {
            if (index % 2 !== 0) {
              return (
                <Card
                  style={{
                    width: "18rem",
                    margin: "20px",
                    marginLeft: "70px",
                    border: "none",
                  }}
                  key={index}
                >
                  <Card.Body>
                    <Card.Title
                      style={{ marginBottom: "15px", textAlign: "center" }}
                    >
                      {item.title}
                    </Card.Title>

                    <Link to={`/product/${item.id}`}>
                      <Card.Img
                        variant="center"
                        src={item.imageUrl}
                        style={{
                          transition: "transform .3s",
                          width: "100%",
                          height: "100%",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    </Link>

                    <Card.Text style={{ float: "left", marginTop: "15px" }}>
                      ${item.price}
                    </Card.Text>
                    <Button
                      variant="primary"
                      style={{ float: "right", marginTop: "15px" }}
                      onClick={() => addToCartHandler(item)}
                    >
                      Add to Cart
                    </Button>
                    <div style={{ clear: "both" }}></div>
                  </Card.Body>
                </Card>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default STORE;