import { useEffect } from "react";
import { Store } from "pullstate";
import WebMidi from "webmidi";

interface Input {
  id: string;
  name: string;
}

interface MidiStore {
  ready: boolean;
  supported: boolean;
  inputs: Input[];
  current: string | null;
}

export const midiStore = new Store<MidiStore>({
  ready: false,
  supported: false,
  inputs: [],
  current: null,
});

const connectionListener = () => {
  const inputs = WebMidi.inputs.map((input) => {
    return {
      id: input.id,
      name: input.name,
    };
  });

  midiStore.update((s) => {
    s.inputs = inputs;
    if (!inputs.find((input) => input.id === s.current)) {
      s.current = null;
    }
  });
};

export function useMidi() {
  useEffect(() => {
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
        midiStore.update((s) => {
          s.ready = true;
        });
      } else {
        WebMidi.addListener("connected", connectionListener);
        WebMidi.addListener("disconnected", connectionListener);
        midiStore.update((s) => {
          s.ready = true;
          s.supported = true;
        });

        return () => {
          WebMidi.removeListener("connected", connectionListener);
          WebMidi.removeListener("disconnected", connectionListener);
        };
      }
    });
  }, []);
}
