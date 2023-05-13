import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { mintNFTAbi } from "@/abi/AiBall";
import close from "@/assets/close.png";
import upIcon from "@/assets/up.png";
import downIcon from "@/assets/down.png";
import "./index.less";
import { Button, Form, InputNumber, message, Modal } from "antd";
import Web3 from "web3";
import { formatterSum } from "@/utils/web3tools";

const gasLimit = 3000000;
const MintModal = forwardRef((props, ref) => {
  const { address } = props;
  const [open, setOpen] = useState(true);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [MintedQuantity, setMintedQuantity] = useState();
  const showModal = async () => {
    setOpen(true);
    const contract = "0xD5529F5956eC381F336Ed3b287daFE6a3b277E4f";
    window.web3 = new Web3(window.ethereum);

    const mintContract = new window.web3.eth.Contract(mintNFTAbi, contract);
    let getMintedQuantity = await mintContract.methods
      .getMintedQuantity(address)
      .call();
    setMintedQuantity(Number(getMintedQuantity) + 1);
  };

  const hideModal = () => {
    setOpen(false);
    form.resetFields();
  };
  useImperativeHandle(ref, () => ({
    showModal,
    hideModal,
  }));
  const getPrice = (value) =>{
    if(isNaN(value)) return '';
    if(value>=0&&value<=1500) {
      return 'free mint'
    }else if(value>1500&&value<=5000) {
      return '0.0005ETH'
    }else if(value>5000&&value<=15000) {
      return '0.00075ETH'
    }else if(value>15000&&value<=30000) {
      return '0.001ETH'
    }
  }
  const onFinish = async (values) => {
    window.web3 = new Web3(window.ethereum);
    setLoading(true);
    try {
      const contract = "0xD5529F5956eC381F336Ed3b287daFE6a3b277E4f";
      const mintContract = new window.web3.eth.Contract(mintNFTAbi, contract);
      console.log({ address, contract, mintContract });

      let isApproved = await mintContract.methods
        .isApprovedForAll(address, contract)
        .call();
      console.log(isApproved, "isApprovedisApprovedisApproved");
      if (!isApproved) {
        await mintContract.methods.setApprovalForAll(contract, true).send({
          from: address,
          gasLimit,
        });
      }

      await mintContract.methods.mint(values.quantity).send({
        from: address,
        gasLimit,
      });
      message.success("Mint Successful!");
      setLoading(false);
      hideModal();
    } catch (err) {
      message.error(err?.message);
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="headerModal">
          <div className="left">MINT NFT</div>
          <div className="right">
            <span>{formatterSum(MintedQuantity)}</span>
            <i>/</i>
            {formatterSum(30000)}
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
        <span>Price: </span>
        <span className="rightValue">{getPrice(MintedQuantity)}</span>
      </div>
      <Form name="validate_other" onFinish={onFinish} form={form}>
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
