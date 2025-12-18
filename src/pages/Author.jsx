import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton.jsx";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 1200,
});

const Author = () => {
  const [authorItem, setAuthorItem] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [displayedFollowers, setDisplayedFollowers] = useState(0);

  const { authorId } = useParams();

  async function getAuthorItems() {
    const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`;

    const { data } = await axios.get(apiUrl);

    setAuthorItem(data);
    setDisplayedFollowers(data.followers);
  }

  const handleFollowers = () => {
    if (isFollowing === false) {
      setDisplayedFollowers((prev) => prev + 1);
      setIsFollowing(true);
    } else {
      setDisplayedFollowers((prev) => prev - 1);
      setIsFollowing(false);
    }
  };

  useEffect(() => {
    getAuthorItems();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {authorItem && authorItem.id ? (
                <div
                  className="col-md-12"
                  key={authorItem.id}
                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-delay="0"
                  data-aos-offset="0"
                >
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorItem.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorItem.authorName}
                            <span className="profile_username">
                              @{authorItem.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorItem.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {displayedFollowers} followers
                        </div>
                        {isFollowing === false ? (
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={handleFollowers}
                          >
                            Follow
                          </Link>
                        ) : (
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={handleFollowers}
                          >
                            Unfollow
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="col-md-12"
                  data-aos="fade-zoom-in"
                  data-aos-easing="ease-in-back"
                  data-aos-delay="0"
                  data-aos-offset="0"
                >
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                        <div
                          className="profile_name"
                          style={{
                            marginTop: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "18px",
                            alignItems: "flex-start",
                          }}
                        >
                          <Skeleton
                            width="200px"
                            height="28px"
                            borderRadius="4px"
                          />
                          <Skeleton
                            width="120px"
                            height="16px"
                            borderRadius="4px"
                            style={{ marginTop: "6px" }}
                          />
                          <Skeleton
                            width="300px"
                            height="16px"
                            borderRadius="4px"
                            style={{ marginTop: "6px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div
                        className="de-flex-col"
                        style={{
                          marginLeft: "24px",
                          display: "flex",
                          gap: "12px",
                        }}
                      >
                        <Skeleton
                          width="80px"
                          height="16px"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="100px"
                          height="36px"
                          borderRadius="6px"
                          style={{ marginTop: "8px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
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
