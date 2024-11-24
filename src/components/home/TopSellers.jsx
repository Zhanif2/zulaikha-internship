import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import "aos/dist/aos.css";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      setIsLoading(true);
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellers(response.data);
      setIsLoading(false);
    };

    fetchTopSellers();
  }, []);

  return isLoading ? (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50px" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info">
                    <Skeleton width="60px" height="25px"/>
                    <div>
                    <Skeleton width="30px" height="20px"/>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers.map((item, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>
                      {item.authorName}
                    </Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
