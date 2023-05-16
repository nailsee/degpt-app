import React, { useRef } from "react";
import "./index.less";
import useChart from "./useChart";

const Tokenomics = (props) => {
  const chartRef = useRef(null);
  const options = {
    series: [
      {
        data: [
          { name: "Liquidity Pool", value: 95 },
          { name: "Airdrop", value: 5 },
        ],
        color: ["#D8210F", "#FCB167"],
        type: "pie",
        radius: [60, 90],
        height: "33.33%",
        // left: "center",
        right: 20,
        top: 80,
        width: 300,
        itemStyle: {
          normal: {
            borderColor: "#161827",
            borderWidth: 5,
          },
        },
        label: {
          formatter: "{time|{c}%}\n{value|{b}}",
          minMargin: 10,
          edgeDistance: 10,
          lineHeight: 20,
          rich: {
            time: {
              fontFamily: "Roboto-Regular",
              fontSize: 18,
              color: "#fff",
            },
            value: {
              fontWeight: 400,
              fontSize: 12,
              color: "rgba(255, 255, 255, 0.5",
            },
          },
        },

        labelLine: {
          show:true,

          normal: {
            length: 40,
            color: "#fff",
            borderColor: "#161827",
            borderWidth: 5,
            length2: 20,

          },
          color: "#fff",
          length2: 20,
          maxSurfaceAngle: 20,
        },
       
      },

    ],
  };
  useChart(chartRef, options);
  return (
    <section className="tokenomics" id='tokenomics'>
      <div className="coming">coming soon</div>
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
        <div className="right">
          <div style={{ width: "400px", height: "400px" }} ref={chartRef} />
        </div>
      </div>
    </section>
  );
};
export default Tokenomics;
