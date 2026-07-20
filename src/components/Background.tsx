/**
 * Fixed, non-interactive background system rendered once behind all content:
 * a slow drifting aurora + gradient mesh wash + masked grid + floating accent
 * glows + grain overlay. The aurora is what gives the page its premium, living
 * gradient; everything else adds depth without stealing focus from content.
 */
export function Background() {
  return (
    <div className="bg-layers" aria-hidden="true">
      <div className="bg-aurora" />
      <div className="bg-mesh" />
      <div className="bg-grid" />
      <div
        className="bg-glow animate-float"
        style={{
          top: "-8rem",
          left: "-6rem",
          width: "34rem",
          height: "34rem",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 65%)",
        }}
      />
      <div
        className="bg-glow animate-float"
        style={{
          top: "10rem",
          right: "-8rem",
          width: "36rem",
          height: "36rem",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-2) 34%, transparent), transparent 65%)",
          animationDelay: "-3.5s",
        }}
      />
      {/* subtle violet depth blob, low + off to the side */}
      <div
        className="bg-glow animate-float"
        style={{
          top: "60%",
          left: "8%",
          width: "30rem",
          height: "30rem",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-3) 26%, transparent), transparent 66%)",
          animationDelay: "-6s",
        }}
      />
      {/* soft central emerald wash — keeps lower sections from going flat-black */}
      <div
        className="bg-glow"
        style={{
          top: "52%",
          left: "50%",
          width: "52rem",
          height: "42rem",
          transform: "translate(-50%, -28%)",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent), transparent 68%)",
        }}
      />
      <div className="bg-grain" />
    </div>
  );
}
