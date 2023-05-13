import React, { useState, forwardRef, useImperativeHandle } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {mintNFTAbi} from '@/abi/AiBall'

import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
  Modal,
  Input,
} from "antd";
import Web3 from "web3";
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const gasLimit = 3000000

const MintModal = forwardRef((props, ref) => {
  const {address} = props
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
    form.resetFields()
  };
  useImperativeHandle(ref, () => ({
    showModal,
    hideModal,
  }));
  const onFinish = async (values) => {
    window.web3 = new Web3(window.ethereum)

    const contract = '0xD5529F5956eC381F336Ed3b287daFE6a3b277E4f';
    const mintContract = new window.web3.eth.Contract(mintNFTAbi, contract)
    console.log({address,contract,mintContract})

    let isApproved = await mintContract.methods
    .setApprovalForAll(
      contract,
      true
    )
    .send({
      from: address,
      gasLimit,
    })
    console.log(isApproved,address, 'isApprovedisApprovedisApproved')
    console.log("Received values of form: ", window.web3,values);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Modal
      title="MINT NFT"
      open={open}
      onCancel={hideModal}
      okText="确认"
      cancelText="取消"
      footer={null}
    >
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        form={form}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
        }}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Plain Text" name={"aaa"}>
          <Input />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <div>
          <Button type='primary' htmlType="submit">tijiao</Button>
        </div>
      </Form>
    </Modal>
  );
});

export default MintModal;
