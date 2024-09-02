import { EnergyControl } from "@/components/energyControl";
import { DualSpinning } from "@/components/loading/dualSpinning";
import { Typography } from "@/components/typography";
import { useData } from "@/contexts/dataContext";
import { useWebSocket } from "@/contexts/webSocketContext";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

import { Root, BoxContainer, SecondaryRoot } from "./styles";

const Controllers = (): ReactNode => {
    const searchParams = useSearchParams();
    const assetId = searchParams.get("assetId");
    const { energies } = useData();
    const [status, setStatus] = useState("pending");

    const { ws, isConnected } = useWebSocket();

    useEffect(() => {
        if (isConnected && ws && assetId) {
            setStatus("pending");
            ws.send(JSON.stringify({ type: "energiesRequest", assetId }));
        }
    }, [ws, isConnected, assetId]);

    useEffect(() => {
        try {
            if (energies) {
                setStatus("normal");
            }
        } catch (err) {
            setStatus("error");
            console.error(err);
        }
    }, [energies]);

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
                {energies &&
                    energies.map(energy => (
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
