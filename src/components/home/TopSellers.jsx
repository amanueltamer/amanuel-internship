import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Skeleton from "../UI/Skeleton.jsx";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState(null);

  async function getTopSellers() {
    const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`;

    const { data } = await axios.get(apiUrl);

    setTopSellers(data)
  }

  useEffect(() => {
    getTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers && topSellers.length > 0 ? (
                topSellers.map((topSeller) => (
                  <li key={topSeller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${topSeller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={topSeller.authorImage}
                          alt={topSeller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${topSeller.authorId}`}>{topSeller.authorName}</Link>
                      <span>{topSeller.price} ETH</span>
                    </div>
                  </li>
                ))
              ) : (
                [...Array(10)].map((_, i) => (
                  <li key={i}>
                    <div className="author_list_pp">
                      <div className="pp-wrapper">
                        <Skeleton width="60px" height="60px" borderRadius="50%" />
                
                        <i className="fa fa-check"></i>
                      </div>
                    </div>
                
                    <div className="author_list_info">
                      <Skeleton width="120px" height="16px" borderRadius="4px" />
                      <Skeleton width="80px" height="14px" borderRadius="4px" />
                    </div>
                  </li>
                ))                
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
