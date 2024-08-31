import { ReactElement } from "react";

import { Container, Loading } from "./styles";

const Spinner = (): ReactElement => {
    return (
        <Container>
            <Loading />
        </Container>
    );
};

export { Spinner };
