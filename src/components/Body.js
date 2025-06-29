import RestarantCard from "./RestarantCard";
import resList from "../utils/mockData";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Shimmer from "./Shimmer";

const Body = () => {
  // local state variable to store the restaurant list
  const [restaurantList, setRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  console.log("Body Rendered");

  const fetchData = async () => {
    try {
      // const response = await axios.get(
      //   "https://api.allorigins.win/raw?url=" +
      //     encodeURIComponent(
      //       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.277693&lng=74.1843535&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      //     )
      // );
      // const jsonData = response.data;
      const data = await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.277693&lng=74.1843535&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"));
      const jsonData = await data.json();
      
      console.log(jsonData);
      // Optional Chaining
      setRestaurantList(
        jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (restaurantList.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={() => {
            const filteredRestaurants = restaurantList.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setRestaurantList(filteredRestaurants);
          }}>Search</button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const topRatedRestaurants = restaurantList.filter((res) => {
              return res.info.avgRating > 4.0;
            });
            setRestaurantList(topRatedRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {restaurantList.map((restaurant) => {
          return (
            <RestarantCard key={restaurant.info.id} resData={restaurant} />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
