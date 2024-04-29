import { useEffect, useRef } from "react";
import { getCoordinates } from "../../lib/canvas";


//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

// Draw exercise
export const DrawCanvas = ({canvas}) => {
  const isDrawing = useRef(false);
  

  const startDrawing = (event) => {
    isDrawing.current = true;
   
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const draw = (event) => {
    if(!isDrawing.current) return;

    const context = canvas.current?.getContext('2d')

    const coordinate = getCoordinates(event, canvas.current)

    if(!context || !coordinate) return;

    context.fillRect(coordinate.x, coordinate.y, 1, 1)
  };
  
  
  useEffect(() => {
 const handleMouseUp = () => {
  stopDrawing()
 }
 window.addEventListener('mouseup', handleMouseUp)
 return () => {
   window.removeEventListener('mouseup', handleMouseUp)
 }

  }, []);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseMove={draw}
      width={560}
      height={315}
      ref={canvas}
      className="m-auto rounded-md bg-white shadow-md"
    />
  );
};
