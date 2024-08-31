"use client";

import { Content } from "@/layout/dashboard";
import { Overview } from "@/layout/dashboard/overview";
import { Tree } from "@/layout/dashboard/tree";
import { ServiceBar } from "@/layout/serviceBar";
import { ReactElement } from "react";

import { Container } from "./styles";

export default function Dashboard(): ReactElement {
    return (
        <Container>
            <ServiceBar>Monitoramento de Ambiente</ServiceBar>
            <Content>
                <Tree />
                <Overview />
            </Content>
        </Container>
    );
}
