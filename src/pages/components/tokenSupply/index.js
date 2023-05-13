import React from "react";
import "./index.less";
const Tokenomics = (props) => {
  return (
    <section className="tokenomics">
      <div className="title">TOKENOMICS</div>
      <div className="subtitle">
        All jokes aside, here is a rough sketch of $AIBALL path ahead. We dont
        wan’t to give everything away on day 1, Expect surprises along the way
        ;)
      </div>
      <div className="token-supply">
        <div className="left">
          <div className="left-title">Token Supply:</div>
          <div className="left-amount">75,000,000,000</div>
          <div className="left-desc">
            No Taxes, No Team Reserved, No Bullshit. It’s that simple.
            <br />
            95% of the tokens were sent to the liquidity pool, LP tokens
            <br /> were burnt, and contract is renounced.
            <br />
            5% of the tokens were for <span>airdrop</span>.
          </div>
        </div>
        {/* echarts */}
        <div className="right"></div>
      </div>
    </section>
  );
};
export default Tokenomics;
