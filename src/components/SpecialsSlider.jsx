import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import { API_URL } from "./config/constants";
import { SwapOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const SpecialsSlider = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let url = `${API_URL}/productdate`;
    axios
      .get(url)
      .then((result) => {
        const products = result.data.product;
        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Swiper className="specials-wrap" spaceBetween={20} slidesPerView={2.3}>
      {products.map((value, idx) => {
          return (
            <SwiperSlide className="specials-box" key={idx}>
              {value.soldout === 1?<div className="soldout">예약 마감</div>:null}
              <Link className="specials-link" to={`/packages/${value.id}`}>
                <img src={`${API_URL}/${value.imageUrl}`} alt="" className="specials-img" />
                <div className="specials-text">
                  <div className="specials-area">
                    <p className="specials-where">
                      {value.start}
                      <span>
                        <SwapOutlined />
                      </span>
                      {value.end}
                    </p>
                    <p className="specials-price">최저 <span>{value.price} 원</span></p>
                  </div>
                  <div className="specials-date">
                    <p>{value.p_sdate}</p>
                    <p>{value.p_edate}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default SpecialsSlider;
