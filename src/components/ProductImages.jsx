import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function ProductImages({ images }) {
  const [current, setCurrent] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    rubberband: true,
    slideChanged(s) {
      setCurrent(s.track.details.rel);
    },
  });

  return (
    <div>
      {/* Main slider */}
      <div ref={sliderRef} className="keen-slider rounded-2xl overflow-hidden shadow-lg">
        {images.map((src, i) => (
          <div key={i} className="keen-slider__slide">
            <img src={src} alt={`Product ${i + 1}`} className="w-full h-[60vh] object-contain bg-neutral-50" />
          </div>
        ))}
      </div>

      {/* Mini-thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => instanceRef.current?.moveToIdx(i)}
            className={`border rounded-md p-1 ${i === current ? "border-blue-500" : "border-gray-200"}`}
          >
            <img src={src} alt={`Thumb ${i + 1}`} className="h-16 w-16 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}