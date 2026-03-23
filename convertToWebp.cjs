const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'public/frame');
const outputDir = path.join(__dirname, 'public/frame-webp');

async function main() {
  console.log("Starting batch conversion to WebP...");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  for (let i = 1; i <= 6; i++) {
    const frameFolder = path.join(inputDir, `frame${i}`);
    const outFrameFolder = path.join(outputDir, `frame${i}`);
    if (!fs.existsSync(outFrameFolder)) fs.mkdirSync(outFrameFolder, { recursive: true });

    if (fs.existsSync(frameFolder)) {
      const files = fs.readdirSync(frameFolder).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
      for (const file of files) {
        const inFile = path.join(frameFolder, file);
        const outFile = path.join(outFrameFolder, file.replace(/\.(jpg|png)$/i, '.webp'));
        
        try {
          await sharp(inFile)
            .webp({ quality: 65, effort: 4 }) // 65 quality is heavily optimized for fast scroll loads
            .toFile(outFile);
        } catch (err) {
          console.error(`Error converting ${file}:`, err);
        }
      }
      console.log(`Finished converting folder frame${i}`);
    }
  }
  console.log('All frames converted successfully! You can find them in public/frame-webp');
}

main().catch(console.error);
