import basketball from "@/assets/basketball.svg";
import Header from "@/pages/components/header";
// import { Button } from "antd";
import "./app.less";
import TokenSupply from "./components/tokenSupply";
import RoadMap from "./components/roadMap";
import FooterBox from "./components/footer";
import CountDown from "@/hooks/useCountdown";
// import { useRef } from "react";
import {
  lazy,
  // ref,
  useRef,
  useCallback,
  useState,
  forwardRef,
  // useImperativeHandle,
  useEffect,
 
} from "react";
import SwiperSlide from "@/pages/components/swiperSlide";
import MintModal from "./components/mintModal";
import Airdrop from "./components/aridrop";
import { Button, message,  Dropdown, } from "antd";
import logo from "@/assets/logo.svg";
import { shortenAddress } from "@/utils/web3tools";
import { netWorkList } from "@/utils/constant";
const currentChainId = netWorkList.testnet.chainId;
const App = () => {
  const timeDeadline =
    new Date("2023-05-18 16:00:00").getTime() - new Date().getTime();

  const { day, hour, minute, second } = CountDown({
    // endTime: new Date('2023-05-16 16:00:00').getTime(),
    endTime: timeDeadline,
  });
  const headerRef = useRef();
  const mintModalRef = useRef();
  const [address, setAddress] = useState();
  const [chainId, setChainId] = useState();

  useEffect(() => {
    checkConnection();
  }, []);
  useEffect(() => {
    if (window.ethereum) {
      //  监听节点切换
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });

      // 监听账号切换
      window.ethereum.on("accountsChanged", (accounts) => {
        setAddress(accounts[0]);
      });
    }
  }, []);
  const checkConnection = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(async (accounts) => {
          console.log(accounts, "accounts");
          setAddress(accounts[0]);
          checkChainId();
        })
        .catch(console.error);
    }
  };
  const checkChainId = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setChainId(chainId);
    }
  };
  const injectWallet = useCallback(async () => {
    let ethereum = window.ethereum;
    if (ethereum) {
      try {
        const chainId = await ethereum.request({ method: "eth_chainId" });
        // arb的测试网
        if (chainId === currentChainId) {
          const reqAccounts = await window.ethereum
            .request({
              method: "eth_requestAccounts",
              params: [
                {
                  chainId: currentChainId,
                },
              ],
            })
            .catch((err) => {
              if (err.code === 4001) {
                message.error(err.message);
              } else {
                console.error(err);
              }
            });
          console.log(reqAccounts, "reqAccounts");
          setAddress(reqAccounts[0]);
          setChainId(currentChainId);
        } else {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [netWorkList.testnet],
          });
        }
      } catch {
        // message.error('Connect failed!');
      }

      //  监听节点切换
      ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });

      // // 监听账号切换
      // ethereum.on("accountsChanged", (accounts) => {
      //   console.log('accountsChangedaccountsChangedaccountsChanged')

      //   setAddress(accounts[0]);
      // });
      // // 监听账号退出
      // ethereum.on("disconnect", (accounts) => {
      //   setAddress(accounts[0]);
      // });
    }
  }, [address, chainId]);
  const handleConnect = async () => {
    if (typeof window.ethereum === "undefined") {
      message.error("MetaMask is unInstalled!");
      return;
    }
    injectWallet();
  };
  const scrollToAnchor = (anchorName) => {
    if (anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  };
  // useImperativeHandle(ref, () => ({
  //   address,
  //   chainId,
  //   injectWallet,
  // }));
  const handleMintNft = () => {
    // if(timeDeadline >=0) return;
    mintModalRef.current.showModal();
  };
  const item = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
  ];
  return (
    <section className={"main"} id="home">
      {/* <Header ref={headerRef} /> */}
      <section className="header">
        <section className="header-center">
          <div className="header-left">
            <img
              onClick={() => scrollToAnchor("home")}
              alt="AIBALL"
              className="logo"
              src={logo}
            />
            <ul className="nav">
              <li onClick={() => scrollToAnchor("home")}>Home</li>
              <li onClick={() => scrollToAnchor("nft")}>NFT</li>
              <li onClick={() => scrollToAnchor("tokenomics")}>Tokenomics</li>
              <li>Game</li>
              <li onClick={() => scrollToAnchor("roadmap")}>RoadMap</li>
            </ul>
          </div>
          {address ? (
            // <Dropdown
            //   menu={{
            //     item
            //   }}
            //   placement="bottomLeft"
            // >
              <Button
                type="primary"
                onClick={handleConnect}
                className={"header-right"}
              >
                {shortenAddress(address)}
              </Button>
            // </Dropdown>
          ) : (
            <Button
              type="primary"
              onClick={handleConnect}
              className={"header-noConnect"}
            >
              Connect Wallet
            </Button>
          )}
          {/* <Button
            type="primary"
            onClick={handleConnect}
            className={!address ? "header-noConnect" : "header-right"}
          >
            {address ? shortenAddress(address) : "Connect Wallet"}
          </Button> */}
        </section>
      </section>
      <div className="header-banner">
        <section className="banner">
          <img className="basketball" src={basketball} />
          <div className="banner-title">
            Win 1 BTC with 2023 NBA
            <br /> championship prediction
          </div>
          <Button
            type="primary"
            onClick={handleMintNft}
            style={{ cursor: timeDeadline >= 0 ? "not-allowed" : "pointer" }}
            disabled={timeDeadline >= 0}
            className="mintNft"
          >
            MINT NFT
          </Button>
          {timeDeadline >= 0 && (
            <div className="countdown">{`${day}d : ${hour}h : ${minute}m : ${second}s`}</div>
          )}
          <div className="banner-title banner-subtitle">
            Co-built by AI creatures and our community
          </div>
        </section>
      </div>
      <SwiperSlide />
      {/* <Airdrop address={headerRef?.current?.address} /> */}
      <TokenSupply />
      <RoadMap />
      <FooterBox />
      <MintModal
        ref={mintModalRef}
        address={address}
        chainId={chainId}
        handleNetwork={injectWallet}
      />
    </section>
  );
};

export default App;
