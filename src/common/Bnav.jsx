import React,{useEffect,useState} from "react";
import {HomeOutlined,UserOutlined,HeartOutlined,SearchOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Bnav.scss"


const Bnav = () => {
    
    useEffect(()=>{
        window.addEventListener('scroll',function(){
            let nowScr = this.scrollY;
            let start = 350;
            if(nowScr >= start){
                document.querySelector('.bottom-nav').style.bottom = '-80px';
            }else if(nowScr < start){
                document.querySelector('.bottom-nav').style.bottom = '0px';
            }
        })
    },[])

    return (
        <div class="bottom-nav">
        <Link to={'/'} className="bottom-nav-btn">
                <HomeOutlined />
                <p class="icontext">홈</p>
            </Link>
        <Link to={'/searchpage'} className="bottom-nav-btn">
                <SearchOutlined />
                <p class="icontext">검색</p>
            </Link>
        <Link to={'/Mypage'} className="bottom-nav-btn">
                <UserOutlined />
                <p class="icontext">마이페이지</p>
            </Link>
        <Link to={'/Like'} className="bottom-nav-btn">
                <HeartOutlined />
                <p class="icontext">찜</p>
            </Link>
        </div>
    )
}

export default Bnav;