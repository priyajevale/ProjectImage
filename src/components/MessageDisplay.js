import React, { useContext,useState,useEffect } from "react";
import ProductConsumer from "./ProductConsumer";

const MessageDisplay = () => {
  const { addedItemMessage } = useContext(ProductConsumer);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (addedItemMessage) {
      setIsVisible(true);
      // Clear the message after 3 seconds
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeout);
    }
  }, [addedItemMessage]);

  return isVisible ? (
    <div className="message-display" style={{ position: "fixed", bottom: 20, right: 20, backgroundColor:"lightblue",fontWeight:"bold", color: "black", padding: "10px 30px", borderRadius: 8,height:"60px",textAlign:"center" }}>
      {addedItemMessage}
    </div>
  ) : null;
};
export default MessageDisplay;