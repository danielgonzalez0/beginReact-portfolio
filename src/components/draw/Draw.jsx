
import { useEffect, useRef } from "react";
import { Button } from "../atom/Button";
import { DrawCanvas } from "./DrawCanvas";
import { DrawControl } from "./DrawControl";

export const DEFAULT_COLOR = "#000000";
export const DEFAULT_SIZE = 4;

// Draw exercise
export const Draw = () => {
  //step 1 setup
  const canvas = useRef(null);
  //step 2 make default style

  //step3 fix bug and refactor size and color selection and persisting
  const canvasConfig = useRef({ color: DEFAULT_COLOR, size: DEFAULT_SIZE })

  const handleConfigChange = () => {
    const context = canvas.current.getContext("2d")
    if (!context) return;
    context.strokeStyle = canvasConfig.current.color
    context.lineWidth = canvasConfig.current.size

  }

  useEffect(() => {
    handleConfigChange()
  }, [])



  return (
    <div className="flex flex-col gap-8">
      <DrawCanvas canvas={canvas} />
      <DrawControl defaultColor={DEFAULT_COLOR} defaultSize={DEFAULT_SIZE} onChangeColor={(color) => {
        canvasConfig.current.color = color
        handleConfigChange()
      }} onChangeSize={(size) => {
        canvasConfig.current.size = size
        handleConfigChange()
      }} />
      <div className="m-auto flex gap-4">
        <Button onClick={() => {
          canvas.current.getContext("2d").clearRect(0, 0, canvas.current.width, canvas.current.height)
        }}>Reset</Button>
        <Button onClick={() => { }}>Save my drawing</Button>
      </div>
    </div>
  );
};
