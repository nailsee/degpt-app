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
  const [open, setOpen] = useState(false);
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
      message.success('Mint Successful!')
      setLoading(false);
      hideModal()

    } catch (err) {
      message.error(err?.message);
      setLoading(false);

    }
  };

  return (
    <Modal
      title="MINT NFT"
      open={open}
      onCancel={hideModal}
      width={390}
      footer={null}
      className="wrapModal"
      closeIcon={<img width={20} src={close} />}
    >
      <div className="public-sale">
        <span>Public Sale: </span>
        <span className="rightValue">0.0005ETH</span>
      </div>
      <div className="public-sale amountTitle">
        <span>Mint Amount </span>
        <div>
          <span className="mintAmount">{formatterSum(MintedQuantity)}</span>
          <span className="line">/</span>
          <span className="rightValue">{formatterSum(30000)}</span>
        </div>
      </div>

      <Form name="validate_other" onFinish={onFinish} form={form}>
        <Form.Item
          name="quantity"
          rules={[{ required: true, message: "Please mint account" }]}
        >
          <InputNumber
            controls={{
              upIcon: <img src={upIcon} width={15} />,
              downIcon: <img src={downIcon} width={15} />,
            }}
            min={0}
            className="inputNumber"
            style={{ width: "100%", color: "#FFF" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <div className="desc">
          The first <span>1500</span> NFTs will be minted for free.
        </div>
        <Button
          loading={loading}
          className="mint-btn"
          type="primary"
          htmlType="submit"
        >
          MINT NFT
        </Button>
      </Form>
    </Modal>
  );
});

export default MintModal;
