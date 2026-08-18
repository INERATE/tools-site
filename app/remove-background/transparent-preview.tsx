"use client";

/** A checkerboard ground behind the result so a transparent PNG actually reads as transparent. */
export function TransparentPreview({ url }: { url: string }) {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #d8d8dc 25%, transparent 25%), linear-gradient(-45deg, #d8d8dc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d8d8dc 75%), linear-gradient(-45deg, transparent 75%, #d8d8dc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="Result with the background removed" className="block max-h-[60vh] w-full object-contain" />
    </div>
  );
}
