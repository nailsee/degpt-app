import "./index.less";
import { lazy, Suspense } from "react";
import logo from '@/assets/logo.svg'
const Header = (props) => {
  return (
    <section className='header'>
        <section className="header-center">
          <div className="header-left">
            <img alt="AIBALL" className="logo" src={logo} />
            <ul className="nav">
              <li>Home</li>
              <li>Airdrop</li>
              <li>Docs</li>
              <li>Mint NFT</li>
            </ul>
          </div>
          <div className="header-right">Connect Wallet</div>
        </section>
    </section>
  );
};

export default Header;
