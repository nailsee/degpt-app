import "./index.less";
import { lazy, Suspense, useState, forwardRef, useImperativeHandle } from "react";
import {message} from 'antd';
import logo from '@/assets/logo.svg'
const Header = (props) => {
  const [account, setAccount] = useState()
  const handleConnect = async () => {
    if (typeof window.unisat === 'undefined') {
      console.log('UniSat Wallet is installed!');
      message.error('UniSat Wallet is unInstalled!')
      return;
    }
    try {
      let accounts = await window.unisat.requestAccounts();
      setAccount(accounts[0])
      console.log('connect success', accounts);
    } catch (e) {
      message.error('connect failed')
      console.log('connect failed');
    }
  }
  const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'}); }
    }
  }

  return (
    <section className='header'>
        <section className="header-center">
          <div className="header-left">
            <img  onClick={()=>scrollToAnchor('home')} alt="AIBALL" className="logo" src={logo} />
            <ul className="nav">
              <li onClick={()=>scrollToAnchor('home')}>Home</li>
              <li onClick={()=>scrollToAnchor('airdrop')}>Airdrop</li>
              <li>Docs</li>
            </ul>
          </div>
          <div onClick={handleConnect} className="header-right">Connect Wallet</div>
        </section>
    </section>
  );
};

export default Header;
