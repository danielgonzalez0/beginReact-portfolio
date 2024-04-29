// Draw exercise
export const DrawControl = ({defaultColor, defaultSize, onChangeColor, onChangeSize}) => {
  return (
    <div>
      <label
        htmlFor="draw-color-picker"
        className="flex items-center justify-center gap-4"
        defaultValue={defaultColor}
        onChange={(event) => onChangeColor(event.target.value)}
      >
        Color
        <input id="draw-color-picker" type="color" />
      </label>
      <label
        htmlFor="draw-size-picker"
        className="flex items-center justify-center gap-4"
        defaultValue={defaultSize}
        onChange={(event) => onChangeSize(event.target.value)}
      >
        Line size
        <input id="draw-size-picker" type="range" min="2" max="32" step="2" />
      </label>
    </div>
  );
};
