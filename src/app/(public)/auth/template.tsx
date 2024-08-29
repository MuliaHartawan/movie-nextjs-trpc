import { Flex, Layout } from "antd";
import { FC, PropsWithChildren, ReactElement } from "react";

const AuthTemplate: FC<Readonly<PropsWithChildren>> = (props): ReactElement => {
  return (
    <Flex style={{ height: "100vh" }} justify="center" align="center">
      {props.children}
    </Flex>
  );
};

export default AuthTemplate;
