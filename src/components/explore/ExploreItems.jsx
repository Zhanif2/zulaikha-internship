import React, { useEffect, useState } from "react";
import axios from "axios";
import NftCard from "../UI/NftCard";
import Skeleton from "../UI/Skeleton";
import "aos/dist/aos.css";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [count, setCount] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("Default");

  const explore_API =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

  const filterUrl = () => {
    let url = explore_API;

    if (filter === "price_low_to_high") {
      url += "?filter=price_low_to_high";
    } else if (filter === "price_high_to_low") {
      url += "?filter=price_high_to_low";
    } else if (filter === "likes_high_to_low") {
      url += "?filter=likes_high_to_low";
    }

    return url;
  };

  const fetchExploreItems = async () => {
    setIsLoading(true);
    const url = filterUrl();
    const { data } = await axios.get(url);
    setExploreItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExploreItems();
  }, [filter]);

  const loadMoreItems = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
    <div className="container" data-aos="fade-up">
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Default">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most Liked</option>
        </select>
      </div>

      <div className="row">
        {isLoading
          ? new Array(8).fill(0).map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block" }}
              >
                <Skeleton width="100%" height="400px" />
              </div>
            ))
          : exploreItems.slice(0, count * 4).map((item, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block" }}
              >
                <NftCard
                  nftId={item.nftId}
                  nftImage={item.nftImage}
                  title={item.title}
                  price={item.price}
                  likes={item.likes}
                  expiryDate={item.expiryDate}
                  authorImage={item.authorImage}
                  authorId={item.authorId}
                />
              </div>
            ))}
      </div>
      {count * 4 < exploreItems.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMoreItems} className="btn-main lead">
            Load More
          </button>
        </div>
      )}
      </div>
    </>
  );
};

export default ExploreItems;
