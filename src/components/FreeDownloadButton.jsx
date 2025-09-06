
export default function FreeDownloadButton({ fileKey }) {
  const handleClick = async () => {
    try {
      if (!fileKey) {
        console.error("Missing fileKey");
        alert("Missing file key on this card");
        return;
      }

      const res = await fetch(
        `http://localhost:4242/free-download?file_key=${encodeURIComponent(fileKey)}`
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Free download API error:", err);
        alert(err.error || "Could not create download link");
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else {
        alert("No URL returned");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error preparing download");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute top-3 right-3 z-10 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
    >
      Download for free
    </button>
  );
}
