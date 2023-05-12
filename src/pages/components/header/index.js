import "./index.less";
import { lazy, Suspense, useState, forwardRef, useImperativeHandle } from "react";
import {message} from 'antd';
import logo from '@/assets/logo.svg';
import {shortenAddress} from '@/utils/web3tools'
const Header = forwardRef((props, ref) => {
  const [account, setAccount] = useState()
  const handleConnect = async () => {
    if (typeof window.ethereum === 'undefined') {
      message.error('MetaMask is unInstalled!');
      return;
    }
 
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          message.error(err.message);
        } else {
          console.error(err);
        }
      });
      setAccount(accounts[0])
    } catch (e) {
      // message.error('connect failed')
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
  useImperativeHandle(ref, () => ({
    account,
  }));


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
          <div onClick={handleConnect} className="header-right">{account? shortenAddress(account):'Connect Wallet'}</div>
        </section>
    </section>
  );
});

export default Header;
