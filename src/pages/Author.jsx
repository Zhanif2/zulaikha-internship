import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchAuthorData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthor(response.data);
      setFollowersCount(response.data.followers); 
      setIsLoading(false);
    };

    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);


  const toggleFollow = async () => {
    const newFollowing = !isFollowing;
    setIsFollowing(newFollowing);
    setFollowersCount((prevCount) => prevCount + (newFollowing ? 1 : -1));
  };
  

  if (isLoading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width="140px" height="140px" borderRadius="50%" />
                      </div>
                      <div className="profile_name">
                        <h4>
                          <Skeleton width="160px" height="25px" />
                          <span className="profile_username">
                            <Skeleton width="60px" height="25px" />
                          </span>
                          <span id="wallet" className="profile_wallet">
                            <Skeleton width="160px" height="18px" />
                          </span>
                        </h4>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width="160px" height="40px" borderRadius="5px" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems isLoading={isLoading} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="Author" />
                    </div>
                    <div className="profile_name">
                      <h4>
                        {author.authorName}
                        <span className="profile_username">@{author.tag}</span>
                        <span id="wallet" className="profile_wallet">
                          {author.address}
                        </span>
                        <button id="btn_copy" title="Copy Text">
                          Copy
                        </button>
                      </h4>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followersCount} followers
                      </div>
                      <button className="btn-main" onClick={toggleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={author.nftCollection}
                    authorImage={author.authorImage}
                    authorId={author.authorId}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
