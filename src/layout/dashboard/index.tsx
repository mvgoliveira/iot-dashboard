import { IReactChildren } from "@/interfaces/core";
import { ReactElement } from "react";

import { Root } from "./styles";

const Content = ({ children }: IReactChildren): ReactElement => <Root>{children}</Root>;

export { Content };
