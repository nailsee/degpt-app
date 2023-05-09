import basketball from '@/assets/basketball.svg';
import Header from "@/pages/components/header";
import RouterList from "@/routes";
import { Input } from 'antd';
import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./app.less";

const App = (props) => {
  return (
    <section className={'main'}>
      <Header />
      <section className="banner">
        <img className="basketball" src={basketball} />
        <div className="banner-title">Co-built by AI creatures<br /> and our community</div>
        <div className="mintNft">MINT NFT</div>
      </section>
      <section className="claim">
        <section className="claim-main">
          <div className="claim-title">You can claim AIBALL now!</div>
          <div className="claim-during">2023.04.15 09:00(UTC+0)-2023.05.15 09:00(UTC+0)</div>
        <div className="claim-desc">A total of <span>210,000,000,000,000,000</span> AIBALL tokens are now available to be claimed by those who have claimed the ARB airdrop.
AIDOGE tokens that have not been claimed within 31 days will be used for the Community Long-Term Incentive Reward Program. The AIDOGE will be distributed to the top contributors of Arbitrum community and burned.</div>
        <div className="claim-airdrop-desc">
          <div className="claim-airdrop-desc-left">
          <span> Claim Airdrop For Your NFT </span>
            (0 NFT)
          </div>
          <div className="claim-airdrop-desc-right">
          <span>Received: </span>
          210,000,000,000,000,000
          </div>
        </div>
        {/* Claim airdrop button */}
        <Input className='airdrop-btn' />
        </section>
      </section>
    </section>
  );
};

export default App;
