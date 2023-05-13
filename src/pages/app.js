import basketball from '@/assets/basketball.svg';
import Header from "@/pages/components/header";
import { Button, Input } from 'antd';
import "./app.less";
import bg1 from '@/assets/background/bg-1.svg';
import bg2 from '@/assets/background/bg-2.svg';
import twitter from '@/assets/contact/twitter.png';
import telegram from '@/assets/contact/telegram.png';
import discord from '@/assets/contact/discord.png';

import CountDown from '@/hooks/useCountdown';
import { useRef } from 'react';
import SwiperSlide from '@/pages/components/swiperSlide';
import MintModal from './components/mintModal';
const App = () => {
  const timeDeadline = new Date('2023-05-16 16:00:00').getTime() - new Date().getTime();

  const { day, hour, minute, second, } = CountDown({
    // endTime: new Date('2023-05-16 16:00:00').getTime(),
    endTime: timeDeadline
  });
  const headerRef = useRef();
  const mintModalRef = useRef();
  const handleAirdrop = () =>{
    if(!headerRef?.current?.address) {
      headerRef.current.injectWallet();
      return
    }else {
      console.log(headerRef?.current?.address)
    }
  }
  const handleMintNft = () => {
    // if(timeDeadline >=0) return;
    mintModalRef.current.showModal()
  }
  return (
    <section className={'main'} id='home'>
        <Header ref={headerRef} />
      <div className='header-banner'>

        <section className="banner">
          <img className="basketball" src={basketball} />
          <div className="banner-title">Co-built by AI creatures<br /> and our community</div>
          <Button
            type="primary" 
            onClick={handleMintNft}
            // style={{cursor: timeDeadline>=0 ? 'not-allowed': 'pointer'}}
            // disabled={timeDeadline>=0} 
            className="mintNft"
          >
            MINT NFT
          </Button>
          {timeDeadline>=0 && <div className='countdown'>{`${day}d : ${hour}h : ${minute}m : ${second}s`}</div>}
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
        <div className='airdrop-btn-input'>
          <Input value={'384,739,049.098'} readOnly className='airdrop-btn' />
          <Button type="primary" onClick={handleAirdrop} danger className='btn'>{headerRef?.current?.address?'Claim airdrop':'Connect Wallet'}</Button>
        </div>

        </section>
      </section>
      <section className='what-airdrop'>
        <SwiperSlide />
      </section>
      <footer>
        <a href='https://twitter.com/AiBall_ai' target='_blank'><img alt='twitter' src={twitter} /></a>
        <a href='https://discord.gg/zC3qxXBDPa' target='_blank'><img alt='discord' src={discord} /></a>
        {/* <a><img alt='telegram' src={telegram} /></a> */}
      </footer>
      <MintModal ref={mintModalRef} address={headerRef?.current?.address} />
    </section>
  );
};

export default App;
