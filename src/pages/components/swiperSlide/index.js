import React, { useEffect } from "react";
import "./index.less";
// swiper@5.4.5
import Swiper from 'swiper/js/swiper.js' // 引入js
import 'swiper/css/swiper.min.css' // 引入样式

export default function App() {
  useEffect(() => {
    // 配置swiper播放 配置项都写这里面
    var swiper = new Swiper('.swiper-container', {
      loop: true,
      speed: 1000,
      slidesPerView: 'auto',
      spaceBetween: 30,
      centeredSlides: true,
      watchSlidesProgress: true,
      on: {
       setTranslate: function() {
       var slides = this.slides
        for (var i = 0; i < slides.length; i++) {
        var slide = slides.eq(i)
         var progress = slides[i].progress
         slide.transform(''); //清除样式
         slide.transform('scale(' + (1 - Math.abs(progress) / 22) + ')');
        }
       },
       setTransition: function(transition) {
        for (var i = 0; i < this.slides.length; i++) {
         var slide = this.slides.eq(i)
         slide.transition(transition);
        }
       },
      },
      navigation: {
       nextEl: '.swiper-button-next',
       prevEl: '.swiper-button-prev',
      },
     });
  }, [])
  return (
    <>
    <div id="certify">
			<div className="swiper-container">
				<div className="swiper-wrapper">
					<div className="swiper-slide"><img
							src="https://img2.baidu.com/it/u=3794047227,1753003173&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684083600&t=fe717f581bb9a97288365f2c659ecc0b"
							alt=""/>1</div>
					<div className="swiper-slide"><img
							src="https://img1.baidu.com/it/u=4279385200,2972484463&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1684083600&t=63e677db18aa8353185eb864968f9f8c"
							alt=""/>2</div>
					<div className="swiper-slide"><img
							src="https://t8.baidu.com/it/u=784471838,3471093757&fm=3035&app=3035&size=f242,162&n=0&g=0n&f=JPEG?s=D6B835C646027AE6158382F10300800A&sec=1684045463&t=f789b745bf0593b403cf9df12cd02d72"
							alt=""/></div>
					<div className="swiper-slide"><img
							src="https://img2.baidu.com/it/u=3794047227,1753003173&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684083600&t=fe717f581bb9a97288365f2c659ecc0b"
							alt=""/></div>
					<div className="swiper-slide"><img
							src="https://img1.baidu.com/it/u=4279385200,2972484463&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1684083600&t=63e677db18aa8353185eb864968f9f8c"
							alt=""/></div>
					<div className="swiper-slide"><img
							src="https://t8.baidu.com/it/u=784471838,3471093757&fm=3035&app=3035&size=f242,162&n=0&g=0n&f=JPEG?s=D6B835C646027AE6158382F10300800A&sec=1684045463&t=f789b745bf0593b403cf9df12cd02d72"
							alt=""/></div>
					<div className="swiper-slide"><img
							src="https://t8.baidu.com/it/u=784471838,3471093757&fm=3035&app=3035&size=f242,162&n=0&g=0n&f=JPEG?s=D6B835C646027AE6158382F10300800A&sec=1684045463&t=f789b745bf0593b403cf9df12cd02d72"
							alt=""/></div>
					<div className="swiper-slide"><img
							src="https://t8.baidu.com/it/u=784471838,3471093757&fm=3035&app=3035&size=f242,162&n=0&g=0n&f=JPEG?s=D6B835C646027AE6158382F10300800A&sec=1684045463&t=f789b745bf0593b403cf9df12cd02d72"
							alt=""/></div>
				</div>
			</div>
			<div className="swiper-button-prev"></div>
			<div className="swiper-button-next"></div>
		</div>
    </>
  );
}
