import { Tree as RadixTree } from "@/components/tree";
import { Typography } from "@/components/typography";
import { UrlQueryControl } from "@/utils/urlQueryControl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import { MdWorkspaces } from "react-icons/md";
import { v4 as uuid } from "uuid";

import { Root, Header, Content } from "./styles";

interface IItemProps {
    id: string;
    type: "space" | "asset";
    icon: string;
    name: string;
    metadata: any;
    childs: IItemProps[] | [];
}

type Space = {
    name: string;
    assets: [
        {
            name: string;
            temperature: {
                mac: string;
                value: number;
                status: string;
            };
            energies: {
                name: string;
                type: string;
                status: string;
            }[];
        },
    ];
};

const SPACES: Space[] = [
    {
        name: "Casa do Marcelo",
        assets: [
            {
                name: "quarto",
                temperature: {
                    value: 30,
                    mac: "87236726384ADG",
                    status: "normal",
                },
                energies: [
                    { type: "tomada", name: "tomada cama", status: "on" },
                    { type: "tomada", name: "tomada cama", status: "on" },
                    { type: "tomada", name: "tomada cama", status: "on" },
                ],
            },
        ],
    },
];

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
    const [rootTree, setRootTree] = useState<IItemProps[] | []>([]);

    const convertToTreeItems = (spaces: Space[]): IItemProps[] => {
        const spacesItems: IItemProps[] = spaces.map(space => {
            const assetItems: IItemProps[] = space.assets.map(asset => ({
                id: uuid(),
                type: "asset",
                name: asset.name,
                icon: "asset",
                metadata: asset,
                childs: [],
            }));

            return {
                id: uuid(),
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
                const response: Space[] = SPACES;

                const spacesAndAssets: IItemProps[] = convertToTreeItems(response);

                setRootTree(spacesAndAssets);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

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
                {rootTree?.map((item: IItemProps) => <Item {...item} key={item.id} />)}
            </Content>
        </Root>
    );
};

export { Tree };
