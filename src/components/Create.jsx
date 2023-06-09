import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { API_URL } from "./config/constants";
import { ArrowRightOutlined, PictureOutlined } from "@ant-design/icons";
import { Button, Cascader, DatePicker, Form, Input, InputNumber, message, Radio, Upload } from "antd";
import axios from "axios";
import "./sass/Create.scss";

dayjs.extend(customParseFormat);
const disabledDate = (current) => {
  return current && current < dayjs().endOf("day");
};

const Create = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const onFinish = (val) => {
    axios
      .post(`${API_URL}/products`, {
        imageUrl: imageUrl,
        p_name: val.p_name,
        price: val.price,
        p_country: val.p_area[0],
        p_area: val.p_area[1],
        hotel: val.hotel,
        departure: val.departure,
        redeparture: val.redeparture,
        trans: val.trans,
        retrans: val.retrans,
        p_sdate: val.p_sdate,
        p_edate: val.p_edate,
        count: val.count,
        theme: val.theme,
        start: val.start,
        end: val.end,
      })
      .then((result) => {
        console.log(result);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생하였습니다`);
      });
  };
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };
  const goTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Form className="FormWrap" onFinish={onFinish}>
        <Form.Item className="borderNone" name="files" valuePropName="image">
          <Upload name="image" action={`${API_URL}/image`} listType="picture" showUploadList={false} onChange={onChangeImage}>
            {imageUrl ? (
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} alt="" />
            ) : (
              <>
                <div id="upload-img-placeholder">
                  <PictureOutlined />
                  <p className="img-text">이미지를 업로드 해주세요</p>
                </div>
              </>
            )}
          </Upload>
        </Form.Item>
        <Form.Item name="p_name" rules={[{ required: true, message: "패키지명은 필수 입력 사항입니다." }]}>
          <Input size="large" bordered={false} prefix="패키지명" placeholder="등록하실 패키지명을 입력하세요" />
        </Form.Item>
        <Form.Item name="price" rules={[{ required: true, message: "가격은 필수 입력 사항입니다." }]} className="upload-price">
          <InputNumber size="large" bordered={false} prefix="￦" placeholder="가격을 입력하세요" min={0} />
        </Form.Item>
        <Form.Item name="p_area" rules={[{ required: true, message: "여행지는 필수 입력 사항입니다." }]}>
          <Cascader
            size="large"
            bordered={false}
            placeholder="여행지를 선택해주세요"
            style={{ textAlign: "left" }}
            options={[
              {
                value: "국내",
                label: "국내",
                children: [
                  {
                    value: "서울",
                    label: "서울",
                  },
                  {
                    value: "경기",
                    label: "경기",
                  },
                  {
                    value: "인천",
                    label: "인천",
                  },
                  {
                    value: "강원",
                    label: "강원",
                  },
                  {
                    value: "경상",
                    label: "경상",
                  },
                  {
                    value: "전라",
                    label: "전라",
                  },
                  {
                    value: "충청",
                    label: "충청",
                  },
                  {
                    value: "제주",
                    label: "제주",
                  },
                ],
              },
              {
                value: "해외",
                label: "해외",
                children: [
                  {
                    value: "동아시아",
                    label: "동아시아",
                  },
                  {
                    value: "동남아시아",
                    label: "동남아시아",
                  },
                  {
                    value: "서유럽",
                    label: "서유럽",
                  },
                  {
                    value: "동유럽",
                    label: "동유럽",
                  },
                  {
                    value: "북아메리카",
                    label: "북아메리카",
                  },
                  {
                    value: "서아메리카",
                    label: "서아메리카",
                  },
                  {
                    value: "오세아니아",
                    label: "오세아니아",
                  },
                  {
                    value: "휴양지",
                    label: "휴양지",
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="hotel">
          <Input size="large" bordered={false} prefix="숙소" placeholder="숙소명을 입력해주세요" />
        </Form.Item>
        <div className="airWrap">
          <div className="airline">
            <Form.Item name="start" rules={[{ required: true, message: "출발지는 필수 입력 사항입니다." }]} className="airline-half">
              <Input size="large" bordered={false} prefix="출발지" placeholder="출발지" />
            </Form.Item>
            <Form.Item name="end" rules={[{ required: true, message: "도착지는 필수 입력 사항입니다." }]} className="airline-half">
              <Input size="large" bordered={false} prefix="도착지" placeholder="도착지" />
            </Form.Item>
          </div>
          <div className="airline">
            <Form.Item name="departure" rules={[{ required: true, message: "출발공항(역)은 필수 입력 사항입니다." }]} className="airline-half">
              <Input size="large" bordered={false} prefix="출발공항(역)" placeholder="출발공항(역)" />
            </Form.Item>
            <Form.Item name="redeparture" rules={[{ required: true, message: "도착공항(역)은 필수 입력 사항입니다." }]} className="airline-half">
              <Input size="large" bordered={false} prefix="도착공항(역)" placeholder="도착공항(역)" />
            </Form.Item>
          </div>
          <ArrowRightOutlined className="positionA" />
          <div className="airline">
            <Form.Item name="trans" rules={[{ required: true, message: "교통수단은 필수 입력 사항입니다." }]} className="airline-half">
              <Input size="large" bordered={false} prefix="교통수단" placeholder="출발시 교통수단" />
            </Form.Item>
            <Form.Item name="retrans" rules={[{ required: true, message: "교통수단은 필수 입력 사항입니다." }]} className="airline-half">
              <Input size="large" bordered={false} prefix="교통수단" placeholder="도착시 교통수단" />
            </Form.Item>
          </div>
          <div className="airline-date">
            <Form.Item name="p_sdate" rules={[{ required: true, message: "출발 날짜는 필수 입력 사항입니다." }]}>
              <DatePicker
                showTime={{
                  format: "HH:mm",
                }}
                format="YYYY-MM-DD HH:mm"
                disabledDate={disabledDate}
                size="large"
                bordered={false}
                placeholder="출발일"
              />
            </Form.Item>
            <Form.Item name="p_edate" rules={[{ required: true, message: "도착 날짜는 필수 입력 사항입니다." }]}>
              <DatePicker
                showTime={{
                  format: "HH:mm",
                }}
                format="YYYY-MM-DD HH:mm"
                disabledDate={disabledDate}
                size="large"
                bordered={false}
                placeholder="도착일"
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item name="count" rules={[{ required: true, message: "수량은 필수 입력 사항입니다." }]}>
          <InputNumber size="large" bordered={false} min={0} max={100} prefix="수량" placeholder="총 판매 수량을 입력하세요" />
        </Form.Item>
        <Form.Item name="theme" className="borderNone" rules={[{ required: true, message: "테마는 필수 선택 사항입니다." }]}>
          <Radio.Group buttonStyle="solid" className="radio">
            <Radio.Button className="radio-btn" value="쇼핑">
              쇼핑
            </Radio.Button>
            <Radio.Button className="radio-btn" value="맛집탐방">
              맛집탐방
            </Radio.Button>
            <Radio.Button className="radio-btn" value="문화생활">
              문화생활
            </Radio.Button>
            <Radio.Button className="radio-btn" value="엑티비티">
              엑티비티
            </Radio.Button>
            <Radio.Button className="radio-btn" value="조용휴식">
              조용휴식
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <div className="submit">
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" onClick={goTop}>
              패키지 등록하기
            </Button>
          </Form.Item>
          <Link size="large" to={"/"} className="cancel" onClick={goTop}>
            취소
          </Link>
        </div>
      </Form>
    </>
  );
};
export default Create;
