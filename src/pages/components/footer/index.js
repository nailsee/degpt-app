import React from "react";
import twitter from "@/assets/contact/twitter.png";
import discord from "@/assets/contact/discord.png";

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
        {/* <a><img alt='telegram' src={telegram} /></a> */}
      </footer>
    )
}
export default FooterBox;