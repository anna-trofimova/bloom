import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { allProducts } from "../data/products";
import CheckoutButton from "../components/CheckoutButton";
import FreeDownloadButton from "../components/FreeDownloadButton";
import ProductImages from "../components/ProductImages";

export default function ProductPage() {
  const { id } = useParams();

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [id]);

  const product = allProducts.find((p) => p.id === id);

  if (!product) return <p>Product not found</p>;

  const images = product.images ?? [product.image];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">

      {/* Back to Main */}
      <Link
        to="/"
        className="inline-block mb-6 bg-gray-100 text-gray-800 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition"
      >
        ← Back to Main
      </Link>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Left: Gallery */}
        <ProductImages images={images} />

        {/* Right: Info */}
        <div className="flex flex-col gap-6">

          <h1 className="text-3xl font-semibold">{product.title}</h1>

          <p className="text-gray-600">{product.description}</p>

          {/* Price + Buy Now — grouped in a card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col gap-4 shadow-sm">

            {/* Pricing */}
            <div className="flex items-center gap-3">
              {product.originalPrice && (
                <span className="line-through text-red-400 text-lg">
                  {product.originalPrice}
                </span>
              )}
              {product.price && (
                <span className="text-3xl font-bold text-green-700">
                  {product.price}
                </span>
              )}
            </div>

            {/* CTA Button — full width, high contrast */}
            {product.priceId ? (
             <CheckoutButton
               className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-4 rounded-xl font-bold text-xl shadow-md hover:shadow-lg transition-all duration-150"
               priceId={product.priceId}
             />
            ) : (
              <FreeDownloadButton
                className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-4 rounded-xl font-bold text-xl shadow-md hover:shadow-lg transition-all duration-150"
                fileKey={product.fileKey}
              />
            )}

            <p className="text-xs text-gray-400 text-center">
              Secure checkout · Instant delivery
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}