import React from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";

const NftCard = ({
  nftImage,
  nftId,
  title,
  price,
  likes,
  expiryDate,
  authorImage,
  authorId,
}) => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${authorId}`}
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
