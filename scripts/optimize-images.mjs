// shrink large public photos in place. sharp strips exif and fixes orientation.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(import.meta.dirname, "../public");
const SIZE_THRESHOLD_BYTES = 400 * 1024;
const MAX_LONG_EDGE = 2400;
const JPEG_QUALITY = 80;

const KB = 1024;
const formatKb = (bytes) => `${(bytes / KB).toFixed(0)} KB`;

const candidates = readdirSync(PUBLIC_DIR)
  .filter((file) => /\.(jpe?g|png)$/i.test(file))
  .map((file) => path.join(PUBLIC_DIR, file))
  .filter((filePath) => statSync(filePath).size > SIZE_THRESHOLD_BYTES);

if (candidates.length === 0) {
  console.log("no images over the 400 KB threshold — nothing to do.");
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;

for (const filePath of candidates) {
  const before = statSync(filePath).size;
  const isPng = filePath.toLowerCase().endsWith(".png");

  const pipeline = sharp(filePath).rotate().resize({
    width: MAX_LONG_EDGE,
    height: MAX_LONG_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });

  const buffer = await (isPng
    ? pipeline.png({ compressionLevel: 9 }).toBuffer()
    : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer());

  writeFileSync(filePath, buffer);

  const { width, height, exif } = await sharp(buffer).metadata();
  if (exif) {
    console.error(`ERROR: EXIF metadata survived in ${filePath}`);
    process.exit(1);
  }

  totalBefore += before;
  totalAfter += buffer.length;
  console.log(
    `${path.basename(filePath)}: ${formatKb(before)} -> ${formatKb(buffer.length)} (${width}x${height})`,
  );
}

console.log(
  `\noptimized ${candidates.length} image(s): ${formatKb(totalBefore)} -> ${formatKb(totalAfter)} total.`,
);
