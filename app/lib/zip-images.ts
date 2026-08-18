/**
 * A minimal store-only (uncompressed) ZIP writer — enough to bundle a
 * handful of already-compressed JPEGs without pulling in a zip library.
 */
export async function zipImages(images: { name: string; url: string }[]): Promise<Blob> {
  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  function crc32(bytes: Uint8Array) {
    let c = ~0;
    for (const b of bytes) {
      c ^= b;
      for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
    }
    return ~c >>> 0;
  }

  for (const img of images) {
    const res = await fetch(img.url);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    const nameBytes = encoder.encode(img.name);
    const crc = crc32(bytes);

    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0, true);
    local.setUint16(8, 0, true);
    local.setUint16(10, 0, true);
    local.setUint16(12, 0, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, bytes.length, true);
    local.setUint32(22, bytes.length, true);
    local.setUint16(26, nameBytes.length, true);
    local.setUint16(28, 0, true);
    parts.push(new Uint8Array(local.buffer), nameBytes, bytes);

    const centralEntry = new DataView(new ArrayBuffer(46));
    centralEntry.setUint32(0, 0x02014b50, true);
    centralEntry.setUint16(4, 20, true);
    centralEntry.setUint16(6, 20, true);
    centralEntry.setUint32(16, crc, true);
    centralEntry.setUint32(20, bytes.length, true);
    centralEntry.setUint32(24, bytes.length, true);
    centralEntry.setUint16(28, nameBytes.length, true);
    centralEntry.setUint32(42, offset, true);
    central.push(new Uint8Array(centralEntry.buffer), nameBytes);

    offset += 30 + nameBytes.length + bytes.length;
  }

  const centralSize = central.reduce((n, p) => n + p.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, images.length, true);
  end.setUint16(10, images.length, true);
  end.setUint32(12, centralSize, true);
  end.setUint32(16, offset, true);

  const endBytes = new Uint8Array(end.buffer);
  return new Blob(
    [...parts, ...central, endBytes].map((p) => p.slice().buffer),
    { type: "application/zip" },
  );
}
