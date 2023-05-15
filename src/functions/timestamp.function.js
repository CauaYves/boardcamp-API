export function timestamp(dateParam) {
  return dateParam.getTime()
}

export function integerTimestamp(number) {
  return number * 24 * 60 * 60 * 1000
}