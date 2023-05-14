import basketball from "@/assets/basketball.svg";
import Header from "@/pages/components/header";
import { Button } from "antd";
import "./app.less";
import TokenSupply from "./components/tokenSupply";
import RoadMap from "./components/roadMap";
import FooterBox from "./components/footer";
import CountDown from "@/hooks/useCountdown";
import { useRef } from "react";
import SwiperSlide from "@/pages/components/swiperSlide";
import MintModal from "./components/mintModal";
import Airdrop from "./components/aridrop";
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
      <SwiperSlide />
      <Airdrop address={headerRef?.current?.address} />
      <TokenSupply />
      <RoadMap />
      <FooterBox />
      <MintModal
        ref={mintModalRef}
        address={headerRef?.current?.address}
        chainId={headerRef?.current?.chainId}
      />
    </section>
  );
};

export default App;
