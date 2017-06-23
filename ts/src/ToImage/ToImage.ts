function ToImage() {
  function toImage(c): HTMLImageElement {
    const img = new Image();
    img.src = c.toDataURL("image/png");
    return img;
  }

  return {
    toImage
  };
}

export default ToImage;
