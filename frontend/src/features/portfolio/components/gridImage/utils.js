export const documentSizeToImageSize = (documentObj, imageSize) => ({
  width: imageSize.width,
  height: (documentObj.width / imageSize.width) * imageSize.height,
  rate: documentObj.width / imageSize.width,
  getGridSize: (gridValue) => ({
    width: imageSize.width / gridValue,
    height: imageSize.width / gridValue,
  })
})