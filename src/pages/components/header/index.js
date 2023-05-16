import "./index.less";
import {
  lazy,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Button, message } from "antd";
import logo from "@/assets/logo.svg";
import { shortenAddress } from "@/utils/web3tools";
import {netWorkList} from '@/utils/constant' 
const currentChainId = netWorkList.testnet.chainId;
const Header = forwardRef((props, ref) => {
  const [address, setAddress] = useState();
  const [chainId, setChainId] = useState();

  useEffect(() => {
    checkConnection();
  }, []);
  const checkConnection = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(async (accounts) => {
          setAddress(accounts[0]);
          checkChainId()
        })
        .catch(console.error);
    }
  };
  const checkChainId = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      console.log({chainId});
      setChainId(chainId);
    }
  };
  const injectWallet = useCallback(async () => {
    let ethereum = window.ethereum;
    if (ethereum) {
      try {
        const chainId = await ethereum.request({ method: "eth_chainId" });
        console.log(chainId, "teshi");
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
            params: [
              netWorkList.testnet
            ],
          });
        }
      } catch {
        // message.error('Connect failed!');
      }

      //  监听节点切换
      ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });

      // 监听账号切换
      ethereum.on("accountsChanged", (accounts) => {
        setAddress(accounts[0]);
      });
      // 监听账号退出
      ethereum.on("disconnect", (accounts) => {
        setAddress(accounts[0]);
      });
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
  useImperativeHandle(ref, () => ({
    address,
    chainId,
    injectWallet,
  }));

  return (
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
        <Button type="primary" onClick={handleConnect} className={!address?"header-noConnect":"header-right"}>
          {address ? shortenAddress(address) : "Connect Wallet"}
        </Button>
      </section>
    </section>
  );
});

export default Header;
