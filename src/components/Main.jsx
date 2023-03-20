import { LikeOutlined, EyeOutlined,EnvironmentOutlined,SwapOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Link } from "react-router-dom";
import RecomSlider from "./RecomSlider";
import SpecialsSlider from "./SpecialsSlider";
import "./Main.scss";

const country = [
    {
        ImgUrl:"/images/main.png",
        text:"한국"
    },
    {
        ImgUrl:"/images/main.png",
        text:"호주"
    },
    {
        ImgUrl:"/images/main.png",
        text:"영국"
    },
    {
        ImgUrl:"/images/main.png",
        text:"독일"
    },
    {
        ImgUrl:"/images/main.png",
        text:"일본"
    },
    {
        ImgUrl:"/images/main.png",
        text:"대만"
    },
    {
        ImgUrl:"/images/main.png",
        text:"베트남"
    },
    {
        ImgUrl:"/images/main.png",
        text:"스위스"
    },
] 

const recommend = [
  {
    ImgUrl: "/images/countrys1.png",
    destination: "코타키나발루 7일",
    tag: "#하얏트 #5박 이상",
    price: 10000,
  },
  {
    ImgUrl: "/images/countrys2.png",
    destination: "오키나와 2일",
    tag: "#온천 #1박 이상",
    price: 10000,
  },
  {
    ImgUrl: "/images/countrys3.png",
    destination: "혜주마음속 2일",
    tag: "#온천 #1박 이상",
    price: 100,
  },
  {
    ImgUrl: "/images/countrys1.png",
    destination: "혜주마음속 2일",
    tag: "#온천 #1박 이상",
    price: 100,
  },
];

const tripTheme = [
  "🛍️ 쇼핑하고 ",
  "🍽️ 맛있는걸 먹고 ",
  "🖼 문화 생활을 즐기고 ",
  "🏄‍♂️ 액티비티를 즐기고 ",
  "🌿 조용히 휴식하고 ",
]

const Main = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <div className="main">
        <h3><span>혼자</span>라서<br/>충분한 여행</h3>
        <Link className="main-card" to={'/'}>
          <div className="main-card-title">
            <EnvironmentOutlined /><span className="main-card-now">지금 떠나보세요!</span>
          </div>
          <div className="main-card-travel">
            <div className="main-card-left">
              <div className="main-info">
                <p className="main-info-where">서울</p>
                <p className="main-info-when">4월 4일 (화)<br />05:00</p>
              </div>
              <SwapOutlined className="main-icon-switch" />
              <div className="main-info">
                <p className="main-info-where">푸켓</p>
                <p className="main-info-when">4월 10일 (월)<br />18:00</p>
              </div>
            </div>
            <div className="main-card-right">
              최저<span>594,000</span>원
            </div>
          </div>
        </Link>
      </div>

      <div className="main-contents">
        <div className="select">
          <h2>나는 요즘</h2>
          <Select 
            defaultValue={tripTheme[0]}
            /* bordered={false} */
            onChange={handleChange}
            options={tripTheme.map((theme)=>({
              label: theme,
              value: theme,
            }))}
          />
          <p className="select-want">싶어요</p>
        </div>

        <div className="recommends">
          <h3>님을 위한 추천 여행</h3>
          <RecomSlider />
        </div>

        <div className="packages">
          <h3>원트립 패키지</h3>
          <div className="package-wrap">
            {recommend &&
              recommend.map((value, idx) => {
                const recomBack = {background:`no-repeat center/cover url(${recommend[idx].ImgUrl})`}
                return (
                  <div className="package-box">
                    {/* <img src={recommend[idx].ImgUrl} alt="" /> */}
                    <div className="recom-img" style={recomBack}></div>
                    <div>
                      <p>{recommend[idx].destination}</p>
                      <p>{recommend[idx].price}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="banner">
          <img src="/images/mainbanner.png" alt="마일리지 사용하고 항공권으로 돌려받자! 2023년 03월 01일 부터 31일까지 항공 포함 패키지 결제 고객대상 배너이미지" />
        </div>

        <div className="specials">
          <h3>원트립 특가</h3>
          <SpecialsSlider />
        </div>

        <div className="countrys">
        <h3>국가별</h3>
          <div className="country-wrap">
            {country &&
              country.map((value, idx) => {
                return (
                  <div className="country">
                    <img src={country[idx].ImgUrl} alt="" />
                    <p>{country[idx].text}</p>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="review">
          <h3>혼자라서 더 좋은, 원트립 후기</h3>
          <div className="review-wrap">
              <div className="review-user">
                  <div className="user">
                      <img src="/images/main.png" alt="" />
                      <p>사용자이름</p>
                  </div>
                  <div className="good">
                      <p><span><LikeOutlined /></span>60</p>
                      <p><span><EyeOutlined /></span>756+</p>
                  </div>
              </div>
              <div className="review-img">
                  <img src="/images/review.png" alt="" />
              </div>
              <div className="review-text">
                  <p className="title">나홀로 유유자적 바다와 물회</p>
                  <p>[특가] 제주도 3박 4일 월정리</p>
              </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Main;
