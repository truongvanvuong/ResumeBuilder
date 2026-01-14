export const getLightColorFromImage = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!imageUrl || typeof imageUrl !== 'string') {
      return reject(new Error('Invalid image URL'));
    }
    const img = new Image();
    if (!imageUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Cannot obtain 2D canvas context'));
      }
      try {
        ctx.drawImage(img, 0, 0);
      } catch (e) {
        return reject(new Error('Failed to draw image on canvas (possible CORS restriction)'));
      }
      let imageData: Uint8ClampedArray;
      try {
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      } catch (e) {
        return reject(new Error('Unable to read image data (image is likely blocked by CORS)'));
      }

      let r = 0,
        g = 0,
        b = 0,
        count = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        const red = imageData[i];
        const green = imageData[i + 1];
        const blue = imageData[i + 2];
        const brightness = (red + green + blue) / 3;

        // Only count light pixels (tweak the threshold as needed)
        if (brightness > 180) {
          r += red;
          g += green;
          b += blue;
          count++;
        }
      }
      if (count === 0) {
        return resolve('#FFFFFF'); // Default to white if no light pixels found
      } else {
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);
        const lightColor = `rgb(${r}, ${g}, ${b})`;
        resolve(lightColor);
      }
    };
    img.onerror = (err) => {
      console.error('Failed to load image:', err);
      reject(new Error('Image cloud not be loaded or is blocked by CORS'));
    };
  });
};
