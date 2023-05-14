import React from "react";
import { Button, Input } from "antd";
import bg1 from "@/assets/background/bg-1.svg";
import bg2 from "@/assets/background/bg-2.svg";
import axios from "axios";
import { post } from "@/utils/request";
import "./index.less";
const Airdrop = (props) => {
  const { address } = props;
  const handleInvite = async () => {
    console.log(address, "address");
    const result = await post("/inviteAuth", {address });
    const result1 = await post("/GetInviteCode", {address });

    console.log(result,result1, "result");
  };
  return (
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
          active users(those who have claimed the ARB airdrop or ARB balance >1)
          <br />
          3. 2,250,000,000 $AIBALL will be airdropped to the AIBALL NFT holders
          who have invited >1
        </div>
        <div className="claim-btn">
          <Button className="airdrop-btn">Claim</Button>
          <Button onClick={handleInvite} className="airdrop-btn">
            Invite friends
          </Button>
        </div>
      </section>
    </section>
  );
};
export default Airdrop;
