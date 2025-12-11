import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Skeleton from "../UI/Skeleton.jsx"
import Countdown from "../UI/Countdown.jsx"

const NewItems = () => {
  const [newItems, setNewItems] = useState(null);

  async function getNewItems() {
    const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`

    const { data } = await axios.get(apiUrl);

    setNewItems(data);
  }

  useEffect(() => {
    getNewItems();
  }, [])

  const PrevArrow = ({ className, onClick }) => (
    <div className={`${className} custom-arrow-prev`} onClick={onClick}>
      <KeyboardArrowLeftIcon />
    </div>
  )

  const NextArrow = ({ className, onClick }) => (
    <div className={`${className} custom-arrow-next`} onClick={onClick}>
      <KeyboardArrowRightIcon />
    </div>
  );

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {newItems && newItems.length > 0 ? (
            <Slider {...settings}>
              {newItems.map((newItem) => (
            <div key={newItem.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${newItem.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={newItem.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Countdown expiryDate={newItem.expiryDate} />

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

                  <Link to={`/item-details/${newItem.nftId}`}>
                    <img
                      src={newItem.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${newItem.nftId}`}>
                    <h4>{newItem.title}</h4>
                  </Link>
                  <div className="nft__item_price">{newItem.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{newItem.likes}</span>
                  </div>
                </div>
              </div>
            </div>
              ))}
            </Slider>
          ) : (
            <div className="row">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <Skeleton width="100%" height="300px" borderRadius="4px" />
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
