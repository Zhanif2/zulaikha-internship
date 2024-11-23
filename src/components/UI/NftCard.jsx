import React from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";

const NftCard = ({
  loading,
  nftImage,
  nftId,
  title,
  price,
  likes,
  expiryDate,
  authorImage,
}) => {
  if (loading) {

    return (
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton width="50px" height="50px" borderRadius="50%" />
          <i className="fa fa-check"></i> 
        </div>

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
    );
  }

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to="/author"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator"
        >
          <img className="lazy" src={authorImage} alt="Author" />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {expiryDate && (
        <div className="de_countdown">
          <Countdown expiryDate={expiryDate} />
        </div>
      )}

      <div className="nft__item_wrap">
        <Link to={`/item-details/${nftId}`}>
          <img src={nftImage} className="lazy nft__item_preview" alt={title} />
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to={`/item-details/${nftId}`}>
          <h4>{title}</h4>
        </Link>
        <div className="nft__item_price">{price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
