const nextYear = new Date().getFullYear() + 1
const newYearTime = new Date(`January 01 ${nextYear} 00:00:00`)

$('#year').html(nextYear)

const getTimeUnit = unit => unit < 10 ? `0${unit}` : unit

const insertCountdownValues = ({days, hours, minutes, seconds}) => {
  $('#seconds').html(getTimeUnit(seconds))
  $('#minutes').html(getTimeUnit(minutes))
  $('#hours').html(getTimeUnit(hours))
  $('#days').html(getTimeUnit(days))
}

const updateCountdown = () => {
  const currentTime = new Date()
  const difference = newYearTime - currentTime

  const days = Math.floor(difference / 1000 / 60 / 60 / 24)
  const hours = Math.floor(difference / 1000 / 60 / 60) % 24
  const minutes = Math.floor(difference / 1000 / 60) % 60
  const seconds = Math.floor(difference / 1000) % 60
  
  insertCountdownValues({days, hours, minutes, seconds})
}

setInterval(updateCountdown, 1000);

setTimeout(() => {
  $('.loading').fadeOut()
}, 1000)



