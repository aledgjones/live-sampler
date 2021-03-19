import React, { FC } from "react";
import { render } from "react-dom";
import { DeviceSelector } from "./components/device-selector";
import { Spinner } from "./components/spinner";
import { useDevice } from "./hooks/use-device";
import { midiStore, useMidi } from "./hooks/use-midi";

import "./index.css";

const App: FC = () => {
  useMidi();
  useDevice();

  const ready = midiStore.useState((s) => s.ready);
  const supported = midiStore.useState((s) => s.supported);
  const current = midiStore.useState((s) => {
    return s.inputs.find((input) => input.id === s.current);
  });

  if (!ready) {
    return (
      <div className="view">
        <Spinner size={48} color="grey" />
      </div>
    );
  }

  if (!supported) {
    return (
      <div className="view">
        <div className="card">
          <h1>
            <span>Darn, </span>
            <span className="lighter">
              your browser doesn't support WebMidi
            </span>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="view">
      <DeviceSelector />
    </div>
  );
};

render(<App />, document.getElementById("root"));
