import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import bg1 from "@/assets/background/bg-1.svg";
import bg2 from "@/assets/background/bg-2.svg";
import axios from "axios";
import { post } from "@/utils/request";
import "./index.less";
const Airdrop = (props) => {
  const { address } = props;

  const [inviteAuth, setInviteAuth] = useState(false);
  const [inviteCode, setInviteCode] = useState();

  useEffect(() => {
    if (address) getInviteAuth();
  }, [address]);
  const getInviteAuth = async () => {
    const getInviteAuth = await post("/inviteAuth", { address });
    if (getInviteAuth?.status === 200 && getInviteAuth?.data?.data) {
      setInviteAuth(true);
    }
  };
  const handleInvite = async () => {
    const GetInviteCode = await post("/GetInviteCode", { address });
    if (GetInviteCode?.status === 200) {
      setInviteCode(GetInviteCode?.data?.data);
      console.log(GetInviteCode?.data?.data, "GetInviteCode?.data?.data");
    }
  };
  const handleClaim = async () => {
    if(!address) {
        message.error('Please connect wallet')
        return
    }
    const claimStatus = await post("/claimStatus", { address });
    if (claimStatus.status === 200) {
      console.log(inviteCode, claimStatus?.data, "inviteCode");
        
      if (claimStatus?.data?.data) {
        message.info("Has been claimed successfully");
        return;
      }
      if (!claimStatus?.data?.data && inviteCode) {
        const claim = await post("/claim", { address, code: inviteCode });
        if (claim?.data) message.success("Claim Successful");
      }
    }
  };
  return (
    <section className="claim" id="airdrop">
      <section className="claim-main">
        <img alt="claim-ball" className="claim-ball1" src={bg1} />
        <img alt="claim-ball" className="claim-ball2" src={bg2} />

        <div className="claim-title">You can claim $AIBALL now!</div>
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
          active users(those who have claimed the ARB airdrop or ARB balance >1)
          <br />
          3. 2,250,000,000 $AIBALL will be airdropped to the AIBALL NFT holders
          who have invited >1
        </div>
        <div className="claim-btn">
          <Button onClick={handleClaim} className="airdrop-btn">
            Claim
          </Button>
          <Button
            disabled={!inviteAuth}
            onClick={handleInvite}
            className="airdrop-btn"
          >
            Invite friends
          </Button>
        </div>
      </section>
    </section>
  );
};
export default Airdrop;
