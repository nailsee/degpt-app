import React from "react";
import twitter from "@/assets/contact/twitter.png";
import discord from "@/assets/contact/discord.png";
import opensea from "@/assets/contact/opensea.png";

const FooterBox = props => {
    return (
        <footer>
        <div className="trust">© 2023 by Aiball. All rights reserved!</div>
        <a href="https://twitter.com/AiBall_ai" target="_blank">
          <img alt="twitter" src={twitter} />
        </a>
        <a href="https://discord.gg/zC3qxXBDPa" target="_blank">
          <img alt="discord" src={discord} />
        </a>
        <a href="https://opensea.io/collection/aiballnft" target="_blank"><img alt='opensea' src={opensea} /></a>
      </footer>
    )
}
export default FooterBox;