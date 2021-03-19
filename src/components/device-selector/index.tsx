import React, { FC, useEffect, useRef, useState } from "react";
import { midiStore } from "../../hooks/use-midi";

import "./styles.css";

export const DeviceSelector: FC = () => {
  const [open, setOpen] = useState(false);
  const inputs = midiStore.useState((s) => s.inputs);
  const current = midiStore.useState((s) => {
    return s.inputs.find((input) => input.id === s.current);
  });

  const select = (id) => {
    midiStore.update((s) => {
      s.current = id;
    });
  };

  return (
    <div className="device-selector" onClick={() => setOpen((o) => !o)}>
      <div className="device-selector__value">
        <p className="device-selector__label-with-icon">
          <svg
            style={{ width: 24, height: 24, color: "rgb(150,150,150)" }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.15 8.26H22V15.74H20.15M13 8.26H18.43C19 8.26 19.3 8.74 19.3 9.3V14.81C19.3 15.5 19 15.74 18.38 15.74H13V11H14.87V13.91H17.5V9.95H13M10.32 8.26H12.14V15.74H10.32M2 8.26H8.55C9.1 8.26 9.41 8.74 9.41 9.3V15.74H7.59V10.15H6.5V15.74H4.87V10.15H3.83V15.74H2Z"
            />
          </svg>
          <span>{current ? current.name : "Select MIDI Input..."}</span>
        </p>
        <svg
          className="device-selector__icon"
          style={{ width: 24, height: 24, transform: open && "rotate(180deg)" }}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      </div>
      {open && (
        <div className="device-selector__options">
          {inputs.length === 0 && (
            <div className="device-selector__option device-selector__option--disabled">
              No devices found...
            </div>
          )}
          {inputs.map((input) => {
            return (
              <div
                key={input.id}
                className="device-selector__option"
                onClick={() => select(input.id)}
              >
                {input.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
