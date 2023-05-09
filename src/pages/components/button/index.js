import "./index.less";
import { Button } from "antd";
const AIButton = (props) => {
  const {children, } = props
  return (
    <Button className='btn'>
        {children}
    </Button>
  );
};

export default AIButton;
