const html2canvas = window.html2canvas;

const mapToPng = (elementId) => {
  html2canvas(document.getElementById(elementId)).then((canvas) => {
    return canvas.toDataURL('image/png');
  });
};

exports.mapToPng = mapToPng;
