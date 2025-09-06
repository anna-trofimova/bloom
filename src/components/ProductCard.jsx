
import FreeDownloadButton from "./FreeDownloadButton";

export default function ProductCard({ item, onPreview, CheckoutButton }) {
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl bg-white border border-gray-300 shadow-lg">
      <div className="relative">
        <button
          type="button"
          className="block w-full"
          title="Preview"
          aria-label={`Preview ${item.title}`}
          onClick={() => item.images?.length && onPreview?.(item)}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-52 object-cover"
          />
        </button>

        {/* Paid → Buy Now; Free → Download for free */}
        {item.priceId ? (
          <CheckoutButton priceId={item.priceId} />
        ) : (
          item.fileKey && <FreeDownloadButton fileKey={item.fileKey} />
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-card-title">{item.title}</h3>
          <div className="flex items-baseline gap-2">
            {item.originalPrice && (
              <span className="text-red-400 line-through">{item.originalPrice}</span>
            )}
            {item.price && (
              <span className="text-green-700 font-semibold">{item.price}</span>
            )}
          </div>
        </div>

        {item.description && (
          <p className="mt-2 text-sm text-[color:hsl(var(--muted-foreground))]">
            {item.description}
          </p>
        )}

        {item.images?.length ? (
          <button
            onClick={() => onPreview?.(item)}
            className="mt-3 text-sm font-medium text-blue-700 hover:underline"
          >
            Preview
          </button>
        ) : null}
      </div>
    </div>
  );
}

