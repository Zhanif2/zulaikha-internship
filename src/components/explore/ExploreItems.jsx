import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../UI/NftCard"; 

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const explore_API = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

  useEffect(() => {
    const fetchExploreItems = async () => {
      setIsLoading(true); 
      const { data } = await axios.get(explore_API);
      setExploreItems(data);
      setIsLoading(false); 
    };

    fetchExploreItems();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
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
                <NftCard loading={true} /> 
              </div>
            ))
          : exploreItems.map((item, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block" }}
              >
                <NftCard
                  loading={false} 
                  nftId={item.nftId}
                  nftImage={item.nftImage}
                  title={item.title}
                  price={item.price}
                  likes={item.likes}
                  expiryDate={item.expiryDate}
                  authorImage={item.authorImage}
                />
              </div>
            ))}
      </div>
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
