import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";



const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filterRestaurant, setFilterRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("Body rendered");

  useEffect(() => {
    console.log("use effect called");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"    
      );
    const json = await data.json();

    // Use optional chaining to avoid errors if the path doesn't exist
    const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setListOfRestaurants(restaurants);
    setFilterRestaurants(restaurants);
  };

  // Conditional rendering: Check if list is defined and has a length
  if (!listOfRestaurants || listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div>
      <div className="body">
        <div className="filter">
          <div className="search">
            <input
              type="text"
              className="search-box"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              onClick={() => {
                console.log(searchText);
                const filterRestaurant = listOfRestaurants.filter(
                  (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilterRestaurants(filterRestaurant);
              }}
            >
              Search 
            </button>
          </div>

          <button
            className="filter-btn"
            onClick= {() => {
              const filterList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4);
              setFilterRestaurants(filterList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
        <div className="res-container">
         
          {filterRestaurant.map(restaurant => (
            <RestaurantCard key={restaurant.info.id} resList={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Body;
