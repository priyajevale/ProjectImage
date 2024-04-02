import './Home.css';
import {Button} from 'react-bootstrap';
function HomePage () {
    return (
        <div>
            <div className="gen">
            <h2>The Generics</h2>
           
      
      <h3>Get our Latest Album   <span> ► </span> </h3>
      
    
     
      </div>
      <p>TOURS</p>
      <ul className="tour-list"> {/* Add class name for styling */}
        <li>
          <strong>JUL16</strong> DETROIT, MI - DTE ENERGY MUSIC THEATRE -  <Button variant="info">BUY TICKETS</Button>
        </li>
        <li>
          <strong>JUL19</strong> TORONTO, ON - BUDWEISER STAGE -  <Button variant="info">BUY TICKETS</Button>
        </li>
        <li>
          <strong>JUL22</strong> BRISTOW, VA - JIGGY LUBE LIVE -  <Button variant="info">BUY TICKETS</Button>
        </li>
        <li>
          <strong>JUL29</strong> PHOENIX, AZ - AK-CHIN PAVILION -  <Button variant="info">BUY TICKETS</Button>
        </li>
        <li>
          <strong>AUG2</strong> LAS VEGAS, NV - T-MOBILE ARENA -  <Button variant="info">BUY TICKETS</Button>
        </li>
        <li>
          <strong>AUG7</strong> CONCORD, CA - CONCORD PAVILION - <Button variant="info">BUY TICKETS</Button>
        </li>
      </ul>
      <p>The Generics</p>
    </div>
  );
};


export default HomePage;