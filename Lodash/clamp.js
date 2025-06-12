function clamp(number, lower, upper) {
  if (number < lower) {
    return lower
  } else if (number > upper) {
    return upper
  } else {
    return number
  }
}

function clamp2(number, lower, upper) {
  return Math.min(upper, Math.max(lower, number))
}