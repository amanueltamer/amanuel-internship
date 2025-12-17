import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";

import Skeleton from "../components/UI/Skeleton.jsx";

const ItemDetails = () => {
  const [itemDetail, setItemDetail] = useState(null);
  const { nftId } = useParams();

  async function getItemDetails() {
    const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`;

    const { data } = await axios.get(apiUrl);

    setItemDetail(data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getItemDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {itemDetail && itemDetail.nftId ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={itemDetail.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {itemDetail.title} #{itemDetail.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemDetail.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemDetail.likes}
                      </div>
                    </div>
                    <p>{itemDetail.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetail.ownerId}`}>
                              <img
                                className="lazy"
                                src={itemDetail.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetail.ownerId}`}>
                              {itemDetail.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetail.creatorId}`}>
                              <img
                                className="lazy"
                                src={itemDetail.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetail.creatorId}`}>
                              {itemDetail.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{itemDetail.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="630px" height="500px" borderRadius="3px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="616px" height="40px" borderRadius="3px" />

                    <div className="item_info_counts">
                      <Skeleton width="80px" height="30px" borderRadius="3px" />

                      <Skeleton width="80px" height="30px" borderRadius="3px" />
                    </div>
                    <p>
                      <Skeleton
                        width="616px"
                        height="80px"
                        borderRadius="3px"
                      />
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <Skeleton
                          width="150px"
                          height="16px"
                          borderRadius="3px"
                        />

                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <Skeleton
                              width="100px"
                              height="20px"
                              borderRadius="3px"
                            />
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <Skeleton
                          width="150px"
                          height="16px"
                          borderRadius="3px"
                        />

                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <Skeleton
                              width="100px"
                              height="20px"
                              borderRadius="3px"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <Skeleton
                        width="100px"
                        height="16px"
                        borderRadius="3px"
                      />

                      <div className="nft-item-price">
                        <Skeleton
                          width="616px"
                          height="30px"
                          borderRadius="3px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
