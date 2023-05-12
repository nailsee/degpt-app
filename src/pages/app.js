import basketball from '@/assets/basketball.svg';
import Header from "@/pages/components/header";
import RouterList from "@/routes";
import { Input } from 'antd';
import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./app.less";
import bg1 from '@/assets/background/bg-1.svg'
import bg2 from '@/assets/background/bg-2.svg'
import nft from '@/assets/background/nft.png'
import nft1 from '@/assets/background/nft.svg'
import CountDown  from '@/hooks/useCountdown'
import moment from 'moment';
import { useRef } from 'react';
const App = (props) => {
  const { day, hour, minute, second,isShow } = CountDown({
    endTime: new Date('2023-05-16 16:00:00').getTime(),
  });
  const headerRef = useRef();
  // console.log(headerRef?.current?.account,'headerRef')
  return (
    <section className={'main'} id='home'>
        <Header ref={headerRef} />
      <div className='header-banner'>

        <section className="banner">
          <img className="basketball" src={basketball} />
          <div className="banner-title">Co-built by AI creatures<br /> and our community</div>
          <div className="mintNft">MINT NFT</div>
          { <div className='countdown'>{`${day}d : ${hour}h : ${minute}m : ${second}s`}</div>}
        </section>
      </div>

      <section className="claim" id='airdrop'>
        <section className="claim-main">
          <img alt='claim-ball' className='claim-ball1' src={bg1} />
          <img alt='claim-ball' className='claim-ball2' src={bg2} />

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
      <section className='what-airdrop'>
        <img alt='nft' className='airdrop-nft' src={nft1} />
        {/* <div className='what-airdrop-title'>What is AIDOGE?</div>
        <div className='what-airdrop-subtitle'>AIDOGE is a deflationary token. It will be used by AIDOGE ecosystem applications. The total supply is 210,000,000,000,000,000 tokens. AIDOGE belongs to everyone in the Arbitrum<br /> community and is also a necessary key to unlock the future chapters of the AIDOGE story.<br />
AIDOGE has a 15% burning tax, so adjusting your slippage tolerance to around 20% is suggested when buying/selling to ensure your successful transactions. Every time you buy<br /> AIDOGE, you will receive a Lucky Drop ticket with a chance to win an ARB prize based on the purchase amount. You can also stake your AIDOGE to earn more.</div>
        <div className='what-airdrop-btn'>
          <div className='airdrop-btn mint-btn'>Mint NFT</div>
          <div className='airdrop-btn view-btn'>Mint NFT</div>
        </div> */}
      </section>
    </section>
  );
};

export default App;
