import React, { ReactElement } from "react";

import { Root } from "./styles";
import { AssetView } from "./views/asset";

const Overview = (): ReactElement => {
    return (
        <Root>
            <AssetView />
        </Root>
    );
};

export { Overview };
