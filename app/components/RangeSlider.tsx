import { useState, type ReactElement } from "react";

type RangeSliderProps = {
    min: number,
    max: number,
    initialMinValue: number,
    initialMaxValue: number,
    title: string,
    onMinValueChanged:  (newValue:number) => void,
    onMaxValueChanged:  (newValue:number) => void,
}
const RangeSlider = (props:RangeSliderProps) : ReactElement => {
    // TODO useRef or useState
    const {min, max, initialMaxValue, initialMinValue, title, onMinValueChanged, onMaxValueChanged} = props
    const [currentMinValue, SetCurrentMinValue] = useState<number>(initialMinValue)
    const [currentMaxValue, SetCurrentMaxValue] = useState<number>(initialMaxValue)

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), currentMaxValue - 1)
    SetCurrentMinValue(value)
    onMinValueChanged(value)
  }

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), currentMinValue + 1)
    SetCurrentMaxValue(value)
    onMaxValueChanged(value)
  }

  return (
    <div className="w-full">
      <h3 className="font-medium mb-2 text-gray-800">
        {title}: {currentMinValue}€ – {currentMaxValue}€
      </h3>

      <div className="relative w-full">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded-full" />
        
        <div
          className="absolute top-1/2 h-1 bg-orange-900 rounded-full"
          style={{
            left: `${(currentMinValue / currentMaxValue) * 100}%`,
            right: `${100 - (currentMaxValue / currentMaxValue) * 100}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={currentMinValue}
          onChange={handleMinSliderChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-900 [&::-webkit-slider-thumb]:cursor-pointer"
        />

        <input
          type="range"
          min={min}
          max={max}
          value={currentMaxValue}
          onChange={handleMaxSliderChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-900 [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
}

export default RangeSlider
