import RestaurantCard from './RestaurantCard';
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer"; 
const Body = () => {
  const [listOfRestaurants,setListOfRestaurant] = useState([]);
  const [filteredRestaurant,setFilteredRestaurant] = useState([]);
  
  const[searchText,setSearchText] = useState("");
  
  console.log("Body Rendered");
  useEffect(()=>{
  fetchData();
  },[]);

  const fetchData = async() => {
  const data = await fetch(
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"    
  );
  const json = await data.json();
        //Optional Chaining
  setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
     };
   if(listOfRestaurants.length === 0){
     return <Shimmer/>;
     };
    return listOfRestaurants.length === 0 ? (
    <Shimmer/>
     ) : (
      <div className="body">
        <div className="filter"> 
          <div className="search">

            <input 
            type ="text"
            className = "search-box"
            value={searchText}
            onChange = {(e) => {
            setSearchText(e.target.value);
            }}
            />
           <button
            onClick = {() => {
              console.log(searchText);
              const filteredRestaurant = listOfRestaurants.filter((res) => 
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setListOfRestaurant(filteredRestaurant);
            }}
            >
              Search
            </button>
          </div>
          <button
          className="filter-btn"
          onClick = {() => {
            const filteredList = listOfRestaurants.filter(
                (res)=> res.info.avgRating > 4
            );
            setListOfRestaurant(filteredList);
          }}
        >
        Top rated restaurant
        </button>
        </div>
        <div className="res-container">
          {filteredRestaurant.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          ))}
        </div>
      </div>
    );
  };
  export default Body;

