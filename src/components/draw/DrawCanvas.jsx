import { useEffect, useRef } from "react";
import { getCoordinates } from "../../lib/canvas";


//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

// Draw exercise
export const DrawCanvas = ({canvas}) => {
  //step 1 setup
  const isDrawing = useRef(false);
  //step 2 make lines
  const lastCoordinates = useRef(null);
  

  const startDrawing = (event) => {
    //step 1 setup
    isDrawing.current = true;
    //step 2 make lines
    lastCoordinates.current = getCoordinates(event, canvas.current)
   
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const draw = (event) => {
    //step 1 setup
    if(!isDrawing.current) return;

    const context = canvas.current?.getContext('2d')

    const coordinate = getCoordinates(event, canvas.current)

    if(!context || !coordinate) return;

    //step 2 make lines
if(lastCoordinates.current){
context.lineCap = 'round'
context.lineJoin = "round"
context.beginPath()
context.moveTo(lastCoordinates.current.x, lastCoordinates.current.y)
context.lineTo(coordinate.x, coordinate.y)
context.stroke()
}

    lastCoordinates.current = coordinate;
  };
  
  
  useEffect(() => {
 const handleMouseUp = () => {
   //step 1 setup
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
