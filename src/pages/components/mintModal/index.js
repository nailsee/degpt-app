import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { mintNFTAbi } from "@/abi/AiBall";
import close from "@/assets/close.png";
import upIcon from "@/assets/up.png";
import downIcon from "@/assets/down.png";
import "./index.less";
import { Button, Form, InputNumber, message, Modal } from "antd";
import Web3 from "web3";
import { formatterSum } from "@/utils/web3tools";
import { tokenContract } from "@/utils/constant";
import { netWorkList } from "@/utils/constant";
// import {fromWei} from 'web3-utils'

const gasLimit = 3000000;
const MintModal = forwardRef((props, ref) => {
  const { address, chainId,  handleNetwork } = props;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState({
    minted: "", // 已minted的数据
    totalSupply: "", // 所有数量
    totalCost: "", // 总成本
  });
  const showModal = async () => {
    console.log(address,'address')
    if (!address) {
      message.warning("Please Connect Wallet");
      return;
    } else if (netWorkList.testnet.chainId !== chainId) {
      message.error("Wrong network");
      handleNetwork()

      return;
    }
    setOpen(true);
    window.web3 = new Web3(window.ethereum);

    const mintContract = new window.web3.eth.Contract(
      mintNFTAbi,
      tokenContract.testnet
    );

    let getAllMintedQuantity = await mintContract.methods
      .getCurrentId()
      .call();

    let getTotalCost = await mintContract.methods
      .getTotalCost(1)
      .call();

    let totalSupply = await mintContract.methods.totalSupply().call();

    setQuantity({
      minted: getAllMintedQuantity,
      totalSupply: totalSupply,
      total: Web3.utils.fromWei(String(getTotalCost), "ether"),
      // total: 0,
    });

  };

  const hideModal = () => {
    setOpen(false);
    form.resetFields();
  };
  useImperativeHandle(ref, () => ({
    showModal,
    hideModal,
  }));
  const getPrice = (value) => {
    if (isNaN(value)) return "";
    if (Number(value) === 0) {
      return "free mint";
    } else {
      return `${value}ETH`;
    }
  };
  const onFinish = async (values) => {
    window.web3 = new Web3(window.ethereum);
    setLoading(true);
    try {
      const mintContract = new window.web3.eth.Contract(
        mintNFTAbi,
        tokenContract.testnet
      );
      let getMintedQuantity = await mintContract.methods
      .getMintedQuantity(address)
      .call();
      if(Number(getMintedQuantity || 0) + Number(values.quantity) > 15) {
        message.error('current address has exceeded the max limit');
        setLoading(false);

        return;
      }
      let getTotalCostNum = await mintContract.methods
        .getTotalCost(values.quantity)
        .call();

      // let isApproved = await mintContract.methods
      //   .isApprovedForAll(address, tokenContract.testnet)
      //   .call();
      // if (!isApproved) {
      //   await mintContract.methods
      //     .setApprovalForAll(tokenContract.testnet, true)
      //     .send({
      //       from: address,
      //       gasLimit,
      //     });
      // }

      await mintContract.methods.mint(values.quantity).send({
        from: address,
        gasLimit,
        value: getTotalCostNum,
      });
      message.success("Mint Successful!");
      setLoading(false);
      hideModal();
    } catch (err) {
      if (err?.code === 4001) {
        message.error(err?.message);
      } else {
        message.error("Mint Failed!");
      }
      setLoading(false);
    }
  };
  let timeout;
  const handleChange = async (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      window.web3 = new Web3(window.ethereum);
      const mintContract = new window.web3.eth.Contract(
        mintNFTAbi,
        tokenContract.testnet
      );

      let getTotalCostNum = await mintContract.methods.getTotalCost(e).call();
      setQuantity({
        ...quantity,
        // totalCost: getTotalCost,
        total: Web3.utils.fromWei(String(getTotalCostNum), "ether"),
      });
    }, 1000);
  };

  return (
    <Modal
      title={
        <div className="headerModal">
          <div className="left">MINT NFT</div>
          <div className="right">
            <span>{formatterSum(quantity.minted)}</span>
            <i>/</i>
            {formatterSum(quantity.totalSupply)}
          </div>
        </div>
      }
      open={open}
      onCancel={hideModal}
      width={390}
      footer={null}
      className="wrapModal"
      closeIcon={<img width={20} src={close} />}
    >
      <div className="public-sale">
        <span>Price</span>
        <span className="rightValue">{getPrice(quantity.total)}</span>
      </div>
      <Form
        name="validate_other"
        onFinish={onFinish}
        form={form}
        initialValues={{ quantity: 1 }}
      >
        <div className="amountBox">
          <span className="amountBoxSpan">Amount</span>
          <Form.Item
            name="quantity"
            // label='Amount'
            rules={[{ required: true, message: "Please Enter" }]}
          >
            <InputNumber
              controls={{
                upIcon: <img src={upIcon} width={15} />,
                downIcon: <img src={downIcon} width={15} />,
              }}
              min={1}
              max={15}
              maxLength={2}
              className="inputNumber"
              style={{ width: "95px", color: "#FFF" }}
              onChange={handleChange}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
        </div>

        <Button
          loading={loading}
          className="mint-btn"
          type="primary"
          htmlType="submit"
        >
          MINT NFT
        </Button>
        <div className="tip">
          1~1500, free mint
          <br />
          1501~5000, 0.0005 ETH per NFT
          <br />
          5,001~15,000, 0.00075ETH per NFT
          <br />
          15,001~30000, 0.001ETH per NFT
        </div>
        <div className="each">Each address can mint up to 15 NFTs</div>
      </Form>
    </Modal>
  );
});

export default MintModal;
