import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 224 }); // px
  const btnRef = useRef(null);

  // Compute dropdown position relative to viewport
  const updatePosition = () => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      top: r.bottom,         // sits flush under button
      left: r.left,          // align left edges
      width: Math.max(224, r.width), // at least 224px wide
    });
  };

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => updatePosition();
    const onDocClick = (e) => {
      // close if clicked outside button or menu
      const menu = document.getElementById("products-menu-portal");
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        menu &&
        !menu.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);

    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="btn-ghost focus-ring"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        Our Products ▾
      </button>

      {open &&
        createPortal(
          <div
            id="products-menu-portal"
            role="menu"
            aria-label="Products"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: pos.width,
              zIndex: 2000,            // above everything
            }}
            className="rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden"
          >
            <a
              role="menuitem"
              href="#astrology"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Astrology Guides
            </a>
            <a
              role="menuitem"
              href="#trackers"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Habit Trackers
            </a>
            <a
              role="menuitem"
              href="#coloring"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Coloring Books
            </a>
            <a
              role="menuitem"
              href="#bundles"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Bundles
            </a>
          </div>,
          document.body
        )}
    </>
  );
}
