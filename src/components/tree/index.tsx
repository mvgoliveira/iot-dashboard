import { Smart, Space } from "@/assets/svgs/tree";
import { Spinner } from "@/components/loading/spinner";
import { IReactChildren } from "@/interfaces/core";
import { Theme } from "@/themes/Theme";
import { useSearchParams } from "next/navigation";
import React, { ReactElement, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { PiHouse } from "react-icons/pi";
import { v4 as uuid } from "uuid";

import {
    StyledRoot,
    StyledTrigger,
    CollapsibleTrigger,
    StyledContent,
    StyledLeef,
    StyledNode,
    StyledDropdownContainer,
    Icon,
} from "./styles";

const handleClick = (value: string): void => console.log(value);

const GetComponentByType = (item: ReactElement | string, key: string): ReactElement => {
    if (typeof item === "object") return <StyledNode key={key}>{item}</StyledNode>;

    return (
        <StyledLeef onClick={() => handleClick(item)} key={key} selected={false}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <Smart fillColor="purpleA400" />
                {item}
            </div>
        </StyledLeef>
    );
};

interface ITreeProps extends IReactChildren {
    value: string;
    icon: string;
    metadata: any;
    isLoading: boolean;
    hasArrow?: boolean;
    onClick: () => void;
}

const ICON_CONFIG: Record<string, Record<string, string | ReactElement>> = {
    space: {
        icon: (
            <div
                style={{
                    display: "flex",
                    height: 20,
                    width: 20,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <PiHouse color="white" size={16} />
            </div>
        ),
        color: "tealA700",
    },
    asset: {
        icon: <Space fillColor="white" />,
        color: "lightBlueA700",
    },
};

const Tree = ({
    value,
    icon,
    onClick,
    isLoading,
    metadata,
    hasArrow = true,
    children,
}: ITreeProps): ReactElement => {
    const searchParams = useSearchParams();
    const assetId = searchParams.get("assetId");

    const [open, setOpen] = useState<boolean>(false);

    return (
        <StyledRoot open={open} onOpenChange={setOpen}>
            <StyledTrigger onClick={onClick} selected={metadata?.id === assetId}>
                <CollapsibleTrigger>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {hasArrow ? (
                        !open ? (
                            <IoIosArrowForward size={16} color="#FFF" />
                        ) : (
                            <IoIosArrowDown size={16} color="#FFF" />
                        )
                    ) : (
                        <div style={{ width: "16px" }} />
                    )}

                    <Icon $bgColor={ICON_CONFIG[icon].color as keyof typeof Theme.colors}>
                        {ICON_CONFIG[icon].icon}
                    </Icon>

                    <span className="value">{value}</span>
                </CollapsibleTrigger>

                {isLoading && (
                    <StyledDropdownContainer>
                        <div style={{ transform: "scale(0.7)" }}>
                            <Spinner />
                        </div>
                    </StyledDropdownContainer>
                )}
            </StyledTrigger>
            {children}
        </StyledRoot>
    );
};

interface IContentProps {
    items: Array<ReactElement | string>;
}

const Content = ({ items }: IContentProps) => (
    <StyledContent>{items?.map(item => GetComponentByType(item, uuid()))}</StyledContent>
);
Content.displayName = "Content";
Tree.Content = Content;

export { Tree };
