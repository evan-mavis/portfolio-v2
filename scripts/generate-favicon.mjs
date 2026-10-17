import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const SOURCE = new URL("./assets/favicon.jpeg", import.meta.url);
const APP_DIR = new URL("../app/", import.meta.url);
const ICO_SIZES = [16, 32, 48];

function resize(size) {
  return sharp(SOURCE.pathname)
    .resize(size, size)
    .ensureAlpha()
    .png({ compressionLevel: 9 })
    .toBuffer();
}

await Promise.all(
  [
    ["icon.png", 192],
    ["apple-icon.png", 180],
  ].map(async ([filename, size]) =>
    writeFile(new URL(filename, APP_DIR), await resize(size)),
  ),
);

const images = await Promise.all(ICO_SIZES.map(resize));
const headerSize = 6 + images.length * 16;
const header = Buffer.alloc(headerSize);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);

let offset = headerSize;
for (const [index, image] of images.entries()) {
  const entry = 6 + index * 16;
  header[entry] = ICO_SIZES[index];
  header[entry + 1] = ICO_SIZES[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
}

await writeFile(
  new URL("favicon.ico", APP_DIR),
  Buffer.concat([header, ...images]),
);
console.log("Generated favicon.ico, icon.png, and apple-icon.png.");
