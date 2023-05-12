import {useState, useEffect} from 'react';
import moment from 'moment';
 const CountDown = ({
  endTime }) => {
 
 const [day, setDay] = useState(0)
 const [hour, setHour] = useState(0)
 const [minute, setMinute] = useState(0)
 const [second, setSecond] = useState(0)
 const [isShow, setIsShow] = useState(false)

 useEffect(() => {
 
     let sys_second = (endTime - new Date().getTime());
     
     const timerId = setInterval(() => {
         //防止倒计时出现负数
         if (sys_second > 1000) {
 
             sys_second -= 1000;
             let day = Math.floor((sys_second / 1000 / 3600) / 24);
             let hour = Math.floor((sys_second / 1000 / 3600) % 24);
             let minute = Math.floor((sys_second / 1000 / 60) % 60);
             let second = Math.floor(sys_second / 1000 % 60);
             setDay(day);
             setHour(hour < 10 ? "0" + hour : hour);
             setMinute(minute < 10 ? "0" + minute : minute);
             setSecond(second < 10 ? "0" + second : second);
         } else {
 
             clearInterval(timerId);
         }
     }, 1000);

     return () => {
   //返回一个回调函数用来清除定时器
         clearInterval(timerId)
     };
 }, [endTime]);

 return {day,hour,minute,second,isShow}
}
export default CountDown;