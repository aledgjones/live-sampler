import { useEffect } from "react";
import WebMidi, { InputEventNoteoff, InputEventNoteon } from "webmidi";
import { midiStore } from "./use-midi";

const ac = new AudioContext();

const noteOn = (e: InputEventNoteon) => {
  const diff = (e.note.number - 60) * 100;
  const node = new OscillatorNode(ac, { type: "sine", detune: diff });
  node.connect(ac.destination);
  node.start(ac.currentTime);
  node.stop(ac.currentTime + 0.25);
};

export function useDevice() {
  const id = midiStore.useState((s) => s.current);
  useEffect(() => {
    if (id) {
      const device = WebMidi.getInputById(id);
      if (!device) {
        // could not connect so clear current
        midiStore.update((s) => {
          s.current = null;
        });
      } else {
        device.addListener("noteon", "all", noteOn);
        return () => {
          device.removeListener("noteon", "all", noteOn);
        };
      }
    }
  }, [id]);
}
