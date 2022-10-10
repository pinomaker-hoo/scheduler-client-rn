export const nullCheck = (arr: any[]) => {
  for (const item of arr) {
    if (!item) return false
  }
  return true
}
