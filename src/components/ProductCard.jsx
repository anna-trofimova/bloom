import { Link } from "react-router-dom";
import FreeDownloadButton from "./FreeDownloadButton";

export default function ProductCard({ item, onPreview, CheckoutButton }) {
  return (
    <div className="w-full max-w-sm mx-auto h-[420px] flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-300 shadow-lg">

    {/* IMAGE */}
    <div className="relative">
      <button
        type="button"
        className="block w-full"
        aria-label={`Open ${item.title}`}
        onClick={() => onPreview?.(item)}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-52 object-cover"
        />
      </button>

      {/* Buy button overlaid on image */}
      {item.priceId ? (
        <CheckoutButton
          priceId={item.priceId}
          className="absolute top-3 right-3 z-10 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
        />
      ) : (
        item.fileKey && (
          <FreeDownloadButton
            fileKey={item.fileKey}
            className="absolute top-3 right-3 z-10 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
          />
        )
      )}
    </div>
      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow">

        {/* TITLE + PRICE */}
        <div className="flex justify-between items-start">
          <h3 className="text-card-title leading-tight">{item.title}</h3>

          <div className="flex flex-col items-end text-sm">
            {item.originalPrice && (
              <span className="text-red-400 line-through">{item.originalPrice}</span>
            )}
            {item.price && (
              <span className="text-green-700 font-semibold">{item.price}</span>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        {item.description && (
          <div className="relative mt-2 text-sm text-[color:hsl(var(--muted-foreground))] flex-grow overflow-hidden">
            <p className="line-clamp-4">{item.description}</p>
            {/* FADE */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent" />
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-4 flex items-center justify-between">

          {/* Link на страницу продукта */}
          <Link
            to={`/product/${item.id}`}
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            More info →
          </Link>

        </div>
      </div>
    </div>
  );
}