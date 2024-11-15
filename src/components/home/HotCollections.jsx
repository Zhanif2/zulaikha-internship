import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../css/styles/style.css';
import Skeleton from '../UI/Skeleton';

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true); 
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setCollections(data);
      setIsLoading(false); 
    };

    fetchCollections();
  }, []);

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={`arrow-button ${className}`}
        style={style}
        onClick={onClick}
      >
        <i className="fa fa-chevron-left icon-left"></i>
      </button>
    );
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={`arrow-button ${className}`}
        style={style}
        onClick={onClick}
      >
        <i className="fa fa-chevron-right icon-right"></i>
      </button>
    );
  }

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return isLoading ? (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Skeleton width="100%" height="190px" borderRadius="5px" />
                </div>
                <div className="nft_coll_pp">
                  <Skeleton width="40px" height="40px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <Skeleton
                      width="160px"
                      height="25px"
                      borderRadius="5px"
                    />
                  </Link>
                </div>
                <Skeleton width="120px" height="25px" borderRadius="5px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {collections.map((item, index) => (
              <div className="item" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>
                    <span>ERC-{item.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
