import React from "react";
import "../../css/styles/style.css";

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} slick-prev`} onClick={onClick}>
      <i className="fa fa-chevron-left icon-left"></i>
    </div>
  );
};

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} slick-next`} onClick={onClick}>
      <i className="fa fa-chevron-right icon-right"></i>
    </div>
  );
};

export const sliderSettings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};
