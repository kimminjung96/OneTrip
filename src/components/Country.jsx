import React from "react";
import { Link } from "react-router-dom";
import "./sass/Main.scss";

const country = [
  {
    ImgUrl: "/images/anywhere-jeju.png",
    p_area: "제주",
  },
  {
    ImgUrl: "/images/anywhere-gangwon.png",
    p_area: "경기",
  },
  {
    ImgUrl: "/images/anywhere-busan.png",
    p_area: "경상",
  },
  {
    ImgUrl: "/images/anywhere-jeonju.png",
    p_area: "전라",
  },
  {
    ImgUrl: "/images/anywhere-singapore.png",
    p_area: "동남아시아",
  },
  {
    ImgUrl: "/images/anywhere-paris.png",
    p_area: "서유럽",
  },
  {
    ImgUrl: "/images/anywhere-america.png",
    p_area: "북아메리카",
  },
  {
    ImgUrl: "/images/anywhere-vacation.png",
    p_area: "휴양지",
  },
];
function Country() {
  return (
    <div className="countrys">
      <h3 className="section-title">어디든, 원트립</h3>
      <div className="country-wrap">
        {country &&
          country.map((value, idx) => {
            const countryBack = { background: `no-repeat center bottom /cover url(${country[idx].ImgUrl})` };
            return (
              <Link className="country" key={idx} to={`/productt/${value.p_area}`}>
                <div className="country-img" style={countryBack}></div>
                <p>{country[idx].p_area}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
export default Country;
