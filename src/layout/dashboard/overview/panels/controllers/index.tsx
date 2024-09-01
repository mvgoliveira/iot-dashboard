import { EnergyControl } from "@/components/energyControl";
import { DualSpinning } from "@/components/loading/dualSpinning";
import { Typography } from "@/components/typography";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

import { Root, BoxContainer, SecondaryRoot } from "./styles";

const Controllers = (): ReactNode => {
    const searchParams = useSearchParams();
    const assetId = searchParams.get("assetId");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status, data } = useQuery({
        queryKey: ["asset", assetId],
        queryFn: async (): Promise<AxiosResponse<Asset>> =>
            axios.get(`http://localhost:4000/assets/${assetId}`),
    });

    if (status === "pending") {
        return (
            <SecondaryRoot>
                <div style={{ height: "100%" }}>
                    <DualSpinning />
                </div>
            </SecondaryRoot>
        );
    }

    if (status === "error") {
        return (
            <SecondaryRoot>
                <Typography
                    tag="span"
                    color="gray30"
                    fontSize={{ xs: "fs100" }}
                    fontWeight="bold"
                    textAlign="center"
                >
                    Aconteceu um erro inesperado!
                    <br />
                    Tente novamente mais tarde!
                </Typography>
            </SecondaryRoot>
        );
    }

    return (
        <Root>
            <BoxContainer>
                {data.data.energies.map(energy => (
                    <EnergyControl
                        name={energy.name}
                        id={energy.id}
                        defaultState={energy.status}
                        type={energy.type}
                    />
                ))}
            </BoxContainer>
        </Root>
    );
};

export { Controllers };
