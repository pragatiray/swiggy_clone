import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const {resList} = props;
    const {  cloudinaryImageId, cuisines, totalRatings, deliveryTime, name, avgRating } = resList?.info;
    return(
        <div className="res-card">
            <img 
            className="resImg"
            alt="res-logo" src={CDN_URL + cloudinaryImageId} />
            <h3>{name}</h3>
            <p>{cuisines}</p>
            <p>{totalRatings} STARS</p>
            <p>Time to deliver: {avgRating} </p>
        </div>
    )
}
export default RestaurantCard;