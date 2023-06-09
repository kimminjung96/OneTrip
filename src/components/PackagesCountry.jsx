import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./config/constants";
import { Button, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import "./sass/Packages.scss";

dayjs.extend(relativeTime);

function PackagesCountry() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

  const getPackage = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setTrip(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPackage();
  }, []);

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("결제가 완료되었습니다.");
        getPackage();
        navigate("/", { replace: true });
      })
      .catch((error) => {
        message.de("결제가 실패하였습니다.");
        console.danger(error);
      });
  };

  if (trip == null) {
    return <p>...</p>;
  }

  return (
    <div className="check-package-wrap">
      <div className="packimg">
        <Swiper
          pagination={{
            type: "fraction",
          }}
          modules={[Pagination]}
          className="packimg-swiper"
        >
          <SwiperSlide>
            <img src={`${API_URL}/${trip.imageUrl}`} alt="관광상품이미지" />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
        </Swiper>
      </div>
      <div className="packinfo">
        <div className="packinfo-title">
          <p className="packinfo-title-area">&#91;{trip.p_area}&#93;</p>
          <p className="packinfo-title-name">{trip.p_name}</p>
        </div>
        <div className="packinfo-theme">{trip.theme}</div>
        <div className="packinfo-airline">
          <div className="packinfo-airline-box">
            <p className="airline-state">출발</p>
            <p className="airline-date">{dayjs(trip.p_sdate).format("YYYY.MM.DD")}</p>
            <p className="airline-time">{dayjs(trip.p_sdate).format("HH:MM")}</p>
            <p className="airline-trans">{trip.trans}</p>
          </div>
          <ArrowRightOutlined className="packinfo-airline-arrow" />
          <div className="packinfo-airline-box">
            <p className="airline-state">도착</p>
            <p className="airline-date">{dayjs(trip.p_edate).format("YYYY.MM.DD")}</p>
            <p className="airline-time">{dayjs(trip.p_edate).format("HH:MM")}</p>
            <p className="airline-trans">{trip.retrans}</p>
          </div>
        </div>
        <div className="packinfo-total">
          <p className="total-text">상품 가격</p>
          <p className="total-price">
            <span>{trip.price}</span> 원
          </p>
        </div>
        <Button type="primary" className="package-payment" onClick={onClickPurchase} disabled={trip.soldout === 1}>
          결제하기
        </Button>
      </div>
    </div>
  );
}

export default PackagesCountry;
