import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProductCard from "./ProductCard";

export default function ProductCarousel({
  products,
  onPreview,
  renderCard,
  options,
  onReady,
  onSlideChanged,
  CheckoutButton,
}) {
  const [current, setCurrent] = useState(0);
  const [maxIdx, setMaxIdx] = useState(0);

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
    created(s) {
      setMaxIdx(s.track.details.maxIdx);
    },
    updated(s) {
      setMaxIdx(s.track.details.maxIdx);
    },
  };

  const [containerRef, instanceRef] = useKeenSlider({ ...defaultOptions, ...(options || {}) });

  useEffect(() => {
    onReady && onReady(instanceRef);
  }, [instanceRef, onReady]);

  const isFirst = current === 0;
  const isLast = current >= maxIdx;

  return (
    <div className="relative">
      {!isFirst && (
        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div ref={containerRef} className="keen-slider">
        {products.map((item, idx) => (
          <div key={item.id ?? idx} className="keen-slider__slide px-2">
            {renderCard ? renderCard(item, onPreview) : (
              <ProductCard item={item} onPreview={onPreview} CheckoutButton={CheckoutButton} />
            )}
          </div>
        ))}
      </div>

      {!isLast && (
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
          aria-label="Next slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}