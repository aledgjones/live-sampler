import React, { CSSProperties, FC } from "react";
import classNames from "classnames";

import "./styles.css";

interface Props {
  id?: string;
  className?: string;
  style?: CSSProperties;

  size: number;
  color: string;
}

export const Spinner: FC<Props> = ({ id, className, style, size, color }) => {
  return (
    <svg
      id={id}
      className={classNames("ui-spinner", className)}
      style={{
        height: size,
        width: size,
        ...style,
      }}
      viewBox="25 25 50 50"
    >
      <circle
        className="ui-spinner__circle"
        cx="50"
        cy="50"
        r="20"
        stroke={color}
      />
    </svg>
  );
};
