import React, { useRef, useState, useEffect, useCallback } from "react";

function HoverButton({ children, className = "", ...props }) {
  const buttonRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [circles, setCircles] = useState([]);
  const lastAddedRef = useRef(0);

  const createCircle = useCallback((x, y) => {
    const buttonWidth = buttonRef.current?.offsetWidth || 0;
    const xPos = x / buttonWidth;

    const color = `linear-gradient(to right, #a0d9f8 ${xPos * 100}%, #3a5bbf ${
      xPos * 100
    }%)`;

    setCircles((prev) => [
      ...prev,
      { id: Date.now(), x, y, color, fadeState: null },
    ]);
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      if (!isListening) return;

      const currentTime = Date.now();
      if (currentTime - lastAddedRef.current > 100) {
        lastAddedRef.current = currentTime;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createCircle(x, y);
      }
    },
    [isListening, createCircle]
  );

  useEffect(() => {
    circles.forEach((circle) => {
      if (!circle.fadeState) {
        setTimeout(() => {
          setCircles((prev) =>
            prev.map((c) =>
              c.id === circle.id ? { ...c, fadeState: "in" } : c
            )
          );
        }, 0);

        setTimeout(() => {
          setCircles((prev) =>
            prev.map((c) =>
              c.id === circle.id ? { ...c, fadeState: "out" } : c
            )
          );
        }, 1000);

        setTimeout(() => {
          setCircles((prev) => prev.filter((c) => c.id !== circle.id));
        }, 2200);
      }
    });
  }, [circles]);

  return (
    <button
      ref={buttonRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsListening(true)}
      onPointerLeave={() => setIsListening(false)}
      className={`relative px-6 py-3 rounded-2xl bg-[#1a1a1a] border border-gray-700 text-white overflow-hidden ${className}`}
      {...props}
    >
      {circles.map(({ id, x, y, color, fadeState }) => (
        <div
          key={id}
          className={`absolute w-3 h-3 rounded-full blur-lg pointer-events-none transition-opacity ${
            fadeState === "in"
              ? "opacity-70"
              : fadeState === "out"
              ? "opacity-0"
              : "opacity-0"
          }`}
          style={{
            left: x,
            top: y,
            background: color,
          }}
        />
      ))}

      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default HoverButton;