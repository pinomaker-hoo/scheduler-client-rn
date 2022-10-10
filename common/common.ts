export const nullCheck = (arr: any[]) => {
  for (const item of arr) {
    if (!item) return false
  }
  return true
}

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0')
}

export const formatDate = (date: Date) => {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-')
}
