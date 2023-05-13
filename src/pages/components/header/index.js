import "./index.less";
import { lazy, useCallback, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import {Button, message} from 'antd';
import logo from '@/assets/logo.svg';
import {shortenAddress} from '@/utils/web3tools'
const Header = forwardRef((props, ref) => {
  const [address, setAddress] = useState()
  useEffect(()=>{
    console.log(window.ethereum?.selectedAddress,'window.ethereum?.selectedAddress')
    if(window.ethereum?.selectedAddress) {
      injectWallet()
    }
  },[])
  const injectWallet = useCallback(async () => {
		let ethereum = window.ethereum
		if (ethereum) {
      try{
        const reqAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            message.error(err.message);
          } else {
            console.error(err);
          }
        });
        setAddress(reqAccounts[0])

      }catch{
        message.error('Connect failed!');

      }
        
			//  监听节点切换
			ethereum.on('chainChanged', (chainId) => {
				window.location.reload()
			})
			// 监听网络切换
			ethereum.on('networkChanged', (networkIDstring) => {
      console.log(networkIDstring,'networkIDstring')
			})
		
			// 监听账号切换
			ethereum.on('accountsChanged', (accounts) => {
        setAddress(accounts[0])

			})
		}
	}, [address])
  const handleConnect = async () => {
    if (typeof window.ethereum === 'undefined') {
      message.error('MetaMask is unInstalled!');
      return;
    }
    injectWallet()
   
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
    address,
    injectWallet,
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
          <Button type='primary' onClick={handleConnect} className="header-right">{address? shortenAddress(address):'Connect Wallet'}</Button>
        </section>
    </section>
  );
});

export default Header;
