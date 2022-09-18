import clsx from "clsx";
import React from "react";

import icons from "./iconDefinitions";

const Icon = ({
  name,
  stroke,
  size = "w-6 h-6",
  margin = "m-0",
  currentColor,
  fillNone,
  customStyle,
  ...props
}: IIcon) => {
  const icon = icons[name];
  const { style } = props || {};
  const { color } = style || {};
  const classes = clsx(
    size,
    margin,
    currentColor,
    color ? color : fillNone ?? "fill-current",
    customStyle,
    "select-none"
  );

  return (
    <svg
      className={classes}
      viewBox={icon?.viewBox ?? "0 0 20 20"}
      stroke={stroke || icon?.stroke}
      xmlns="http://www.w3.org/2000/svg"
      fill={fillNone ? "none" : color ? color : ""}
      style={style}
      {...props}
    >
      {icon?.path}
    </svg>
  );
};

interface IIcon extends React.SVGProps<SVGSVGElement> {
  name: string;
  margin?: string;
  currentColor?: string;
  size?: string;
  fillNone?: boolean;
  customStyle?: string;
}

export default Icon;
