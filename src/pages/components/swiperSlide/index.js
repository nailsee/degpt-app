import React, { useEffect } from "react";
import "./index.less";
// swiper@5.4.5
import Swiper from "swiper/js/swiper.js"; // 引入js
import "swiper/css/swiper.min.css"; // 引入样式
import leftIcon from "@/assets/leftIcon.png";
import rightIcon from "@/assets/rightIcon.png";
import nft1 from '@/assets/30nba/blazers.png';
import nft2 from '@/assets/30nba/bucks.png';
import nft3 from '@/assets/30nba/bulls.png';
import nft4 from '@/assets/30nba/cavaliers.png';
import nft5 from '@/assets/30nba/Celtics.png';
import nft6 from '@/assets/30nba/clippers.png';
import nft7 from '@/assets/30nba/Frame 16.png';
import nft8 from '@/assets/30nba/Frame 22.png';
import nft9 from '@/assets/30nba/Frame 27.png';
import nft10 from '@/assets/30nba/grizzlies.png';
import nft11 from '@/assets/30nba/heat.png';
import nft12 from '@/assets/30nba/hornets.png';
import nft13 from '@/assets/30nba/Jazz.png';
import nft14 from '@/assets/30nba/king.png';
import nft15 from '@/assets/30nba/Knicks.png';
import nft16 from '@/assets/30nba/lakers.png';
import nft17 from '@/assets/30nba/magic.png';
import nft18 from '@/assets/30nba/Mavericks.png';
// import nft19 from '@/assets/30nba/nuggets.png';
import nft20 from '@/assets/30nba/pistons.png';
import nft21 from '@/assets/30nba/raptors.png';
import nft22 from '@/assets/30nba/rockets.png';
import nft23 from '@/assets/30nba/Sixers.png';
import nft24 from '@/assets/30nba/spurs.png';
import nft25 from '@/assets/30nba/suns.png';
import nft26 from '@/assets/30nba/thunder.png';
import nft27 from '@/assets/30nba/timberwolves.png';
import nft28 from '@/assets/30nba/warriors.png';
import nft29 from '@/assets/30nba/wizards.png';

import nft30 from '@/assets/30nba/hawks.png';
import nft19 from '@/assets/30nba/ball19.png';


export default function App() {
  useEffect(() => {
    // 配置swiper播放 配置项都写这里面
    var swiper = new Swiper(".swiper-container", {
      loop: true,
      speed: 1000,
      slidesPerView: "auto",
      spaceBetween: 21,
      centeredSlides: true,
      watchSlidesProgress: true,
      on: {
        setTranslate: function () {
          var slides = this.slides;
          for (var i = 0; i < slides.length; i++) {
            var slide = slides.eq(i);
            var progress = slides[i].progress;
            slide.transform(""); //清除样式
            slide.transform("scale(" + (1 - Math.abs(progress) / 8) + ")");
          }
        },
        setTransition: function (transition) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i);
            slide.transition(transition);
          }
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);
  return (
    <div className="swiper-box">
      <div id="certify">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {
              [nft1,nft2,nft3,nft4,nft5,nft6,nft7,nft8,nft9,nft10,nft30,nft11,nft12,nft13,nft14,nft15,nft16,nft17,nft18,nft19,nft20,nft21,nft22,nft23,nft24,nft25,nft26,nft27,nft28,nft29].map((obj,i)=>{
                return <div className="swiper-slide" key={i}>
                  <img alt="" src={obj} />
                
              </div>
              })
            }
          </div>
        </div>
        <div className="swiper-button-prev">
          <img src={leftIcon} />
        </div>
        <div className="swiper-button-next">
          <img src={rightIcon} />
        </div>
      </div>
    </div>
  );
}
