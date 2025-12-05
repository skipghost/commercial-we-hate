import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

import { Mode } from "./enums";

export type AppProps = {
  mode: Mode;
};

export type ActionError = {
  error: string;
};

export type ServerActionResponse<T = {}> = ActionError | undefined | T;

export type Option = {
  value: string;
  label: string;
};

export type AttachmentParams = {
  url: string;
  filename: string;
  size: number;
};

export interface NavLink {
  title: string;
  url?: string;
  icon?: IconDefinition;
  isActive?: boolean;
  items?: NavLink[];
  private?: boolean;
}

