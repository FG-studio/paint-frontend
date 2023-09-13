export const delay = (millisec: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisec)
  })
}

export const secToMinuteStr = (sec: number) => {
  const seconds = sec % 60
  const minutes = Math.floor(sec / 60) % 60

  return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
}
