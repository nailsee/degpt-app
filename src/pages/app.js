import basketball from "@/assets/basketball.svg";
import Header from "@/pages/components/header";
import { Button, Input } from "antd";
import "./app.less";
import bg1 from "@/assets/background/bg-1.svg";
import bg2 from "@/assets/background/bg-2.svg";
import TokenSupply from "./components/tokenSupply";
import RoadMap from "./components/roadMap";
import FooterBox from "./components/footer";
import CountDown from "@/hooks/useCountdown";
import { useRef } from "react";
import SwiperSlide from "@/pages/components/swiperSlide";
import MintModal from "./components/mintModal";

const App = () => {
  const timeDeadline =
    new Date("2023-05-16 16:00:00").getTime() - new Date().getTime();

  const { day, hour, minute, second } = CountDown({
    // endTime: new Date('2023-05-16 16:00:00').getTime(),
    endTime: timeDeadline,
  });
  const headerRef = useRef();
  const mintModalRef = useRef();
  const handleAirdrop = () => {
    if (!headerRef?.current?.address) {
      headerRef.current.injectWallet();
      return;
    } else {
      console.log(headerRef?.current?.address);
    }
  };
  const handleMintNft = () => {
    // if(timeDeadline >=0) return;
    mintModalRef.current.showModal();
  };
  return (
    <section className={"main"} id="home">
      <Header ref={headerRef} />
      <div className="header-banner">
        <section className="banner">
          <img className="basketball" src={basketball} />
          <div className="banner-title">
            Co-built by AI creatures
            <br /> and our community
          </div>
          <Button
            type="primary"
            onClick={handleMintNft}
            // style={{cursor: timeDeadline>=0 ? 'not-allowed': 'pointer'}}
            // disabled={timeDeadline>=0}
            className="mintNft"
          >
            MINT NFT
          </Button>
          {timeDeadline >= 0 && (
            <div className="countdown">{`${day}d : ${hour}h : ${minute}m : ${second}s`}</div>
          )}
        </section>
      </div>
      <section className="what-airdrop">
        <SwiperSlide />
      </section>
      <section className="claim" id="airdrop">
        <section className="claim-main">
          <img alt="claim-ball" className="claim-ball1" src={bg1} />
          <img alt="claim-ball" className="claim-ball2" src={bg2} />

          <div className="claim-title">You can claim AIBALL now!</div>
          <div className="claim-during">
            2023.05.16 09:00(UTC+0)-2023.05.25 09:00(UTC+0)
          </div>
          <div className="claim-invite">
            Invite to Earn, A total of <span>3,750,000,000</span> $AIBALL tokens
            are now available to be claimed.
          </div>
          <div className="claim-desc">
            1. 750,000,000 $AIBALL will be airdropped to the top 1,000 users who
            have the most accumulatively invited numbers
            <br />
            2. 750,000,000 $AIBALL will be airdropped to the 10,000 Arbitrum
            active users(those who have claimed the ARB airdrop or ARB balance
            >1)
            <br />
            3. 2,250,000,000 $AIBALL will be airdropped to the AIBALL NFT
            holders who have invited >1
          </div>
          <div className="claim-btn">
            <Button className="airdrop-btn">Claim</Button>
            <Button className="airdrop-btn">Invite friends</Button>

          </div>
        </section>
      </section>
      <TokenSupply />
      <RoadMap />
      <FooterBox />
      <MintModal ref={mintModalRef} address={headerRef?.current?.address} />
    </section>
  );
};

export default App;
