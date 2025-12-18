import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown.jsx";
import Skeleton from "../UI/Skeleton.jsx";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 1200,
});

const ExploreItems = () => {
  const [exploreItem, setExploreItem] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filterValue, setFilterValue] = useState("");

  async function getExploreItems() {
    const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`;

    const { data } = await axios.get(apiUrl);

    setExploreItem(data);
  }

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  useEffect(() => {
    getExploreItems();
  }, [filterValue]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItem && exploreItem.length > 0
        ? exploreItem.slice(0, visibleCount).map((exploreItem) => (
            <div
              key={exploreItem.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="0"
              data-aos-offset="0"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${exploreItem.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={exploreItem.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Countdown expiryDate={exploreItem.expiryDate} />

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${exploreItem.nftId}`}>
                    <img
                      src={exploreItem.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${exploreItem.nftId}`}>
                    <h4>{exploreItem.title}</h4>
                  </Link>
                  <div className="nft__item_price">{exploreItem.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{exploreItem.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="0"
              data-aos-offset="0"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width="100%" height="350px" borderRadius="4px" />
            </div>
          ))}

      {exploreItem &&
        exploreItem.length > 0 &&
        visibleCount < exploreItem.length && (
          <div className="col-md-12 text-center">
            <Link
              to=""
              id="loadmore"
              className="btn-main lead"
              onClick={loadMore}
            >
              Load more
            </Link>
          </div>
        )}
    </>
  );
};

export default ExploreItems;
