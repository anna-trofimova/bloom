import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function ProductPreviewModal({ product, onClose }) {
  const [current, setCurrent] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    rubberband: true,
    slideChanged(s) {
      setCurrent(s.track.details.rel);
    },
  });

  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full border px-2 py-1 text-sm hover:bg-gray-50"
        >
          ✕
        </button>

        <h3 className="mb-3 text-center text-lg font-semibold">{product.title}</h3>

        <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden">
          {(product.images ?? []).map((src, i) => (
            <div key={i} className="keen-slider__slide">
              <img
                src={src}
                alt={`${product.title} preview ${i + 1}`}
                className="h-[80vh] w-full object-contain bg-neutral-50"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* dots */}
        <div className="mt-3 flex justify-center gap-2">
          {(product.images ?? []).map((_, i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`h-2 w-2 rounded-full ${i === current ? "bg-black" : "bg-gray-300"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* arrows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="pointer-events-auto rounded-full bg-white/80 px-3 py-1 shadow hover:bg-white"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="pointer-events-auto rounded-full bg-white/80 px-3 py-1 shadow hover:bg-white"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
