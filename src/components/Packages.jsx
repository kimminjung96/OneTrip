import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./config/constants";
import { Button, message } from "antd";
import { ArrowRightOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./sass/Packages.scss";

dayjs.extend(relativeTime);

function Packages() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [LikeAction, setLikeAction] = useState(false);
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
    if (trip.count === 1) {
      axios
        .post(`${API_URL}/purchase/${id}`)
        .then((result) => {
          message.info("결제가 완료되었습니다.");
          getPackage();
          window.scrollTo(0, 0);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          message.de("결제가 실패하였습니다.");
          console.danger(error);
        });
    } else if (trip.count > 1) {
      axios
        .post(`${API_URL}/purchase2/${id}`)
        .then((result) => {
          message.info("결제가 완료되었습니다.");
          getPackage();
          window.scrollTo(0, 0);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          message.de("결제가 실패하였습니다.");
          console.danger(error);
        });
    }
  };
  const onClickHeart = () => {
    setLikeAction(!LikeAction);
    if (trip.heart === 0) {
      axios
        .post(`${API_URL}/heart/${id}`)
        .then((result) => {
          message.info("찜하기가 완료되었습니다.");
          getPackage();
        })
        .catch((error) => {
          message.de("찜하기가 실패하였습니다.");
          console.danger(error);
        });
    }
    if (trip.heart === 1) {
      axios
        .post(`${API_URL}/heart2/${id}`)
        .then((result) => {
          message.info("찜하기가 취소되었습니다.");
          getPackage();
        })
        .catch((error) => {
          message.de("취소가 실패하였습니다.");
          console.danger(error);
        });
    }
  };
  if (trip == null) {
    return <p>...</p>;
  }

  return (
    <div className="check-package-wrap">
      <div className="packimg">
        <img src={`${API_URL}/${trip.imageUrl}`} alt="관광상품이미지" />
      </div>
      <div className="packinfo">
        <div className="packinfo-title">
          <div className="packinfo-title-text">
            <p className="packinfo-title-area">&#91;{trip.p_area}&#93;</p>
            <p className="packinfo-title-name">{trip.p_name}</p>
          </div>
          <span onClick={onClickHeart} className="heart-button">
            {trip && trip.heart ? <HeartFilled style={{ fontSize: "2.5rem", color: "#ff0000" }} /> : <HeartOutlined style={{ fontSize: "2.5rem", color: "#ff0000" }} />}
          </span>
        </div>
        <div className="packinfo-theme">{trip.theme}</div>

        <span> 잔여 수량 {trip.count}</span>

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
            <span>{trip.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> 원
          </p>
        </div>
        <Button type="primary" className="package-payment" onClick={onClickPurchase} disabled={trip.soldout === 1}>
          결제하기
        </Button>
      </div>
    </div>
  );
}

export default Packages;
