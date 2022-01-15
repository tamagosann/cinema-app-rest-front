export const onlyImageFile = (v: FileList) =>
  Array.from(v).every((k) =>
    ['image/png', 'image/jpeg', 'image/gif', 'image/svg'].includes(k.type),
  ) || '画像ファイルのみ有効です'

export const emailValidationPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const phoneNumberValidationPatten =
  /^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/
