import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";
import { sliderSettings } from "../UI/SliderSettings"; 
import NftCard from "../UI/NftCard"; 

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
      );
      setNewItems(data);
      setIsLoading(false);
    };

    fetchNewItems();
  }, []);

  return isLoading ? (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="300px" borderRadius="8px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="180px" height="30px" />
                  <div className="nft__item_price">
                    <Skeleton width="100px" height="20px" />
                  </div>
                  <div className="nft__item_like">
                    <Skeleton width="30px" height="15px" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...sliderSettings}> 
            {newItems.map((item, index) => (
              <div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <NftCard
                  nftId={item.nftId}
                  title={item.title}
                  price={item.price}
                  likes={item.likes}
                  nftImage={item.nftImage}
                  expiryDate={item.expiryDate} 
                  authorImage={item.authorImage}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
