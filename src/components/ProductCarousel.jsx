import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProductCard from "./ProductCard";

export default function ProductCarousel({
  products,
  onPreview,
  renderCard,          // optional: custom renderer (item, onPreview) => JSX
  options,             // optional: keen config overrides
  showDots = true,
  onReady,
  onSlideChanged,
  CheckoutButton,      // optional: passed down to ProductCard
}) {
  const [current, setCurrent] = useState(0);

  const defaultOptions = {
    loop: false,
    mode: "snap",
    slides: { perView: 1.1, spacing: 16 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2.2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
    },
    slideChanged(s) {
      const idx = s.track.details.rel;
      setCurrent(idx);
      onSlideChanged && onSlideChanged(idx);
    },
  };

  const [containerRef, instanceRef] = useKeenSlider({ ...defaultOptions, ...(options || {}) });

  useEffect(() => {
    onReady && onReady(instanceRef);
  }, [instanceRef, onReady]);

  return (
    <div className="relative">
      <div ref={containerRef} className="keen-slider">
        {products.map((item, idx) => (
          <div key={item.id ?? idx} className="keen-slider__slide px-2">
            {renderCard ? renderCard(item, onPreview) : (
              <ProductCard item={item} onPreview={onPreview} CheckoutButton={CheckoutButton} />
            )}
          </div>
        ))}
      </div>

      {showDots && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`h-2 w-2 rounded-full ${i === current ? "bg-black" : "bg-gray-300"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
