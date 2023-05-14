import React from "react";
import "./index.less";
import ball from "@/assets/ball.png";

const RoadMap = (props) => {
  const roadList = [
    {
      title: "Game 1",
      content: [
        "AIBALL NFT Launch",
        "Opensea/Blur Listings",
        "1,000+ Holders",
        "Get AIBALL NFT with a Bonus Win based on 2023 NBA championship predictions",
      ],
    },
    {
      title: "Game 2",
      content: [
        "$ AIBALL Launch",
        "Uniswap/CEX Listings",
        "10,000+ Holders",
        "Get $AIBALL Trending on twitter with our memetic power",
      ],
    },
    {
      title: "Game 3",
      content: [
        "AIBALL Gaming Launch",
        "iOS/android  Launch",
        "100,000+ Holders",
        "Join Basketball web3 game based on NTFs(in Game1) and $AIBALL(in Game2)",
      ],
    },
  ];
  return (
    <div className="roadmap" id='roadmap'>
      <div className="title">ROADMAP</div>
      <div className="subtitle">let's play a 3 game series</div>
      <div className="roadmap-card">
        {roadList.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-title">{item.title}</div>
            {item.content.map((obj, i) => (
              <div className="card-content" key={`${index}_${i}`}>
                <img src={ball}></img>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default RoadMap;
