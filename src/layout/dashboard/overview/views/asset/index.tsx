import { Theme } from "@/themes/Theme";
import { Row, Col } from "antd";
import React, { ReactNode } from "react";

import { Root } from "./styles";

const AssetView = (): ReactNode => {
    return (
        <Root>
            <Row gutter={[1, 1]} style={{ background: Theme.colors.gray60 }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <></>
                </Col>
            </Row>
        </Root>
    );
};

export { AssetView };
