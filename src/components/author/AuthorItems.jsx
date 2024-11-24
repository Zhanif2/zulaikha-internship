import React from "react";
import Skeleton from "../UI/Skeleton";
import NftCard from "../UI/NftCard"; 

const AuthorItems = ({ isLoading, nftCollection, authorImage, authorId }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading
            ? new Array(8).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <Skeleton width="100%" height="350px" borderRadius="8px" />
                </div>
              ))
            : nftCollection.map((nft, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <NftCard
                    nftImage={nft.nftImage}
                    nftId={nft.nftId}
                    title={nft.title}
                    price={nft.price}
                    likes={nft.likes}
                    authorImage={authorImage}
                    authorId={authorId}  
                    expiryDate={nft.expiryDate} 
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
