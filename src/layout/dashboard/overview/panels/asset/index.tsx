import { DualSpinning } from "@/components/loading/dualSpinning";
import { Tag } from "@/components/tag";
import { Tooltip } from "@/components/tooltip";
import { Typography } from "@/components/typography";
import { Theme } from "@/themes/Theme";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";
import { FaInfoCircle } from "react-icons/fa";

import { Root, TagContainer, DetailsContainer, SecondaryRoot } from "./styles";

const Asset = (): ReactNode => {
    const searchParams = useSearchParams();
    const assetId = searchParams.get("assetId");

    const { status, data } = useQuery({
        queryKey: ["asset", assetId],
        queryFn: async (): Promise<AxiosResponse<Asset>> =>
            axios.get(`http://localhost:4000/assets/${assetId}`),
    });

    if (!assetId || status === "error") {
        return (
            <SecondaryRoot>
                <Typography
                    tag="span"
                    color="gray30"
                    fontSize={{ xs: "fs75" }}
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

    if (status === "pending") {
        return (
            <SecondaryRoot>
                <DualSpinning />
            </SecondaryRoot>
        );
    }

    return (
        <Root>
            {data && (
                <>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            tag="h2"
                            color="white"
                            fontSize={{ xs: "fs200" }}
                            fontWeight="bold"
                        >
                            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {data.data.name ?? "Hidrômetro"}
                                <Tooltip>
                                    <Tooltip.Trigger>
                                        <FaInfoCircle size={16} color={Theme.colors.gray30} />
                                    </Tooltip.Trigger>
                                    <Tooltip.Content>Nome do Ambiente Monitorado</Tooltip.Content>
                                </Tooltip>
                            </span>
                        </Typography>
                    </div>

                    <TagContainer>
                        <Tag fontColor="white" bgColor="deepOrangeA700">
                            Temperatura
                        </Tag>
                        <Tag fontColor="white" bgColor="yellow900">
                            Energia
                        </Tag>
                    </TagContainer>

                    <DetailsContainer>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                            }}
                        >
                            <Typography
                                tag="span"
                                color="gray10"
                                fontSize={{ xs: "fs75" }}
                                fontWeight="regular"
                            >
                                <strong>Dispositivos:</strong> {data.data.energies.length + 1}{" "}
                                cadastrados
                            </Typography>
                        </div>
                    </DetailsContainer>
                </>
            )}
        </Root>
    );
};

export { Asset };
