import loadImage from 'blueimp-load-image';
import { saveAs } from 'file-saver';
import pica from 'pica';
import mime from 'mime-types';
import { canvasToBlob } from 'blob-util';

/**
 * Resize an image file and save the result.
 * @param {File} file The image file to resize.
 * @param {Object} options Options including width, height, and quality.
 * @param {number} options.width The target width.
 * @param {number} options.height The target height.
 * @param {number} [options.quality=0.92] The quality of the output image.
 */
export function resizeImage(file, options) {
  const { width, height, quality = 0.92 } = options;

  loadImage(
    file,
    (canvas) => {
      const picaResizer = pica();

      picaResizer.resize(canvas, document.createElement('canvas'), {
        width,
        height
      })
        .then(resizedCanvas => canvasToBlob(resizedCanvas, mime.lookup(file.name) || 'image/png', quality))
        .then(blob => saveAs(blob, `resized-${file.name}`))
        .catch(err => console.error('Resize error:', err));
    },
    { canvas: true, orientation: true }
  );
}
