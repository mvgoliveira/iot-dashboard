import { DualSpinning } from "@/components/loading/dualSpinning";
import { Tree as RadixTree } from "@/components/tree";
import { Typography } from "@/components/typography";
import { UrlQueryControl } from "@/utils/urlQueryControl";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import { MdWorkspaces } from "react-icons/md";

import { Root, Header, Content } from "./styles";

interface IItemProps {
    id: string;
    type: "space" | "asset";
    icon: string;
    name: string;
    metadata: any;
    childs: IItemProps[] | [];
}

const Item = (props: IItemProps): ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const [data, setData] = useState<IItemProps[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getTreeBySpace = async (): Promise<void> => {
        try {
            setIsLoading(true);

            setData(props.childs);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const onHandleSelectAsset = async (): Promise<void> => {
        await router.push(
            UrlQueryControl("", params, [
                {
                    key: "assetId",
                    value: props.id,
                },
                {
                    key: "mac",
                    value: props.metadata.temperature.mac,
                },
            ]),
            undefined
        );
    };

    const selectEntity = async (): Promise<void> => {
        if (props.type === "space") await getTreeBySpace();
        if (props.type === "asset") await onHandleSelectAsset();
    };

    return (
        <RadixTree
            value={props.name}
            icon={props.icon}
            metadata={props.metadata}
            isLoading={isLoading}
            hasArrow={props.type !== "asset"}
            onClick={selectEntity}
            key={props.id}
        >
            <RadixTree.Content
                items={data?.map((item: IItemProps) => <Item {...item} key={item.id} />)}
            />
        </RadixTree>
    );
};

const Tree = (): ReactElement => {
    const { status, data } = useQuery({
        queryKey: ["generate_tree"],
        queryFn: async (): Promise<AxiosResponse<Space[]>> =>
            axios.get("http://localhost:4000/spaces"),
    });

    const [rootTree, setRootTree] = useState<IItemProps[] | []>([]);

    const convertToTreeItems = (spaces: Space[]): IItemProps[] => {
        const spacesItems: IItemProps[] = spaces.map(space => {
            const assetItems: IItemProps[] = space.assets.map(asset => ({
                id: asset.id,
                type: "asset",
                name: asset.name,
                icon: "asset",
                metadata: asset,
                childs: [],
            }));

            return {
                id: space.id,
                type: "space",
                name: space.name,
                icon: "space",
                metadata: space,
                childs: assetItems,
            };
        });

        return spacesItems;
    };

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                const response: Space[] = data?.data || [];

                const spacesAndAssets: IItemProps[] = convertToTreeItems(response);

                setRootTree(spacesAndAssets);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [data]);

    return (
        <Root>
            <Header>
                <Typography tag="h2" color="white" fontSize={{ xs: "fs75" }} fontWeight="bold">
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <MdWorkspaces size={15} />
                        Selecione um ambiente
                    </span>
                </Typography>
            </Header>

            <Content>
                {status === "pending" && <DualSpinning />}

                {status === "error" && (
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
                )}

                {status !== "error" &&
                    status !== "pending" &&
                    rootTree?.map((item: IItemProps) => <Item {...item} key={item.id} />)}
            </Content>
        </Root>
    );
};

export { Tree };
