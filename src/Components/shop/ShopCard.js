import React, { useContext } from "react";
import Rating from "material-ui-rating";
import ReactStars from "react-rating-stars-component";
import { Store } from "../../Store";
import  {Link} from 'react-router-dom'
import axios from "../../axios";
function ShopCard({item}) {
  const { state, dispatch: ctxDispatch} = useContext(Store);
  const {
    cart: { basket }
  } = state;
  const addToBasket = async (e) => {
    e.preventDefault();
    const existItem = basket.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/id/${item._id}`);
    if (data.countInstock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <div className="shop-box">
      <div className="d-flex justify-content-between align-items-center  flex-column">
        <Link to={`/product/${item._id}`}>
          <img
            src={`https://shoppee-backend.herokuapp.com/${item.image}`}
            alt=""
            width="100px"
            height="150px"
          />
        </Link>

        <span>{item.title}</span>
        <div>
          <ReactStars
            count={8}
            size={24}
            value={item.rating}
            edit={false}
            activeColor="#ffd700"
          />
        </div>
        
        <p>$ {item.price}</p>
        <button onClick={addToBasket}>Add to Cart</button>
      </div>
    </div>
  );
}


export default ShopCard;