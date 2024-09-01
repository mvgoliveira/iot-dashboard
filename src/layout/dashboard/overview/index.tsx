import { Theme } from "@/themes";
import { Col, Row } from "antd";
import { useSearchParams } from "next/navigation";
import React, { ReactElement } from "react";

import { Asset } from "./panels/asset";
import { Controllers } from "./panels/controllers";
import { DeviceStatus } from "./panels/deviceStatus";
import { Gauge } from "./panels/gauge";
import { TitleSection } from "./panels/title";
import { Root } from "./styles";

const Overview = (): ReactElement => {
    const searchParams = useSearchParams();
    const assetId = searchParams.get("assetId");

    return (
        <Root>
            {assetId && (
                <Row gutter={[1, 1]} style={{ background: Theme.colors.gray60 }}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Asset />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <DeviceStatus />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
                        <Gauge />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <TitleSection title="Gerenciamento de energia" />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
                        <Controllers />
                    </Col>
                </Row>
            )}
        </Root>
    );
};

export { Overview };
