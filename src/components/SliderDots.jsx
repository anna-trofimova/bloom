export default function SliderDots({ products, currentSlide, instanceRef }) {
  return (
    <div className="flex justify-center gap-2 mt-6 mb-16">
      {products.map((_, idx) => (
        <button
          key={idx}
          onClick={() => instanceRef.current?.moveToIdx(idx)}
          className={`h-3 w-3 rounded-full ${
            currentSlide === idx ? "bg-primary" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
