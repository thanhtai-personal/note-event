module.exports = {
  pageNumberStringReg: /\/trang-[0-9]+\//gm,
  pageNumberReg: /[0-9]+/gm,
  scriptTag: /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  adsTag: /<div class="mb-1 fz-13"><small class="text-muted"><small>— QUẢNG CÁO —<\/small><\/small><\/div>/gi,
  alertTag: /<div class="text-center nh-read__alert mt-3 mb-0 p-2">[\s\S]*?<br>/gi
}