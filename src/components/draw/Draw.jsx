
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
useEffect(() => {
  const context = canvas.current?.getContext('2d')
  if(!context) return;
  context.strokeStyle = DEFAULT_COLOR
  context.lineWidth = DEFAULT_SIZE
},[])

 

  return (
    <div className="flex flex-col gap-8">
      <DrawCanvas canvas={canvas}/>
      <DrawControl defaultColor={DEFAULT_COLOR} defaultSize={DEFAULT_SIZE} onChangeColor={(color)=>{
        const context = canvas.current.getContext("2d")
        if (!context) return

        context.strokeStyle = color
      }} onChangeSize={(size) => {
        const context = canvas.current.getContext("2d")
        if (!context) return

        context.lineWidth = size
      }}/>
      <div className="m-auto flex gap-4">
        <Button onClick={() => {}}>Reset</Button>
        <Button onClick={() => {}}>Save my drawing</Button>
      </div>
    </div>
  );
};
