import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./config/constants";
import "./sass/Like.scss";

function Like() {
  const { heart } = useParams();
  const [product, setProduct] = useState(null);

  const getParea = () => {
    axios
      .get(`${API_URL}/likepage/${heart}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getParea();
  }, []);

  return (
    <div className="packages">
      <h3 className="section-title">찜한 상품</h3>
      <div className="package-wrap">
        {product &&
          product.map((data, idx) => {
            return (
              <div className="package-box" key={idx}>
                {data.soldout === 1 ? (
                  <div className="soldout">
                    <p>예약 마감</p>
                  </div>
                ) : null}
                <Link className="product-link" to={`/packages/${data.id}`}>
                  <div className="info-box">
                    <div className="new-img imgfit-wrap">
                      <img src={`${API_URL}/${data.imageUrl}`} alt="" />
                    </div>
                    <p className="info-title">{data.p_name}</p>
                    <p className="info-price">
                      <span>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> 원 ~
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default Like;
