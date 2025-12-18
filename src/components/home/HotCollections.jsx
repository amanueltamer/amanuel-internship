import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/HotCollections.css";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Skeleton from "../UI/Skeleton.jsx";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 1500,
});

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState(null);

  async function getHotCollections() {
    const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`;

    const { data } = await axios.get(apiUrl);

    setHotCollections(data);
  }

  useEffect(() => {
    getHotCollections();
  }, []);

  const PrevArrow = ({ className, onClick }) => (
    <div className={`${className} custom-arrow-prev`} onClick={onClick}>
      <KeyboardArrowLeftIcon />
    </div>
  );

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
        breakpoint: 576,
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
    <section id="section-collections" className="no-bottom">
      <div
        className="container"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="0"
        data-aos-offset="0"
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {hotCollections && hotCollections.length > 0 ? (
            <Slider {...settings}>
              {hotCollections.map((hc) => (
                <div key={hc.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`item-details/${hc.nftId}`}>
                        <img
                          src={hc.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${hc.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={hc.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{hc.title}</h4>
                      </Link>
                      <span>ERC-{hc.code}</span>
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

export default HotCollections;
