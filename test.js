let date = new Date()
date = date.getTime()

const date1 = new Date("2023-04-01T15:20:16.000Z")
const date2 = date1.setHours(date1.getHours() + 2)
console.log(date2, date1, date)

console.log(date > date2)

const date3 = new Date("2023-04-01T15:20:16.000Z")
const date4 = date3.setDate(date3.getDate())
console.log("date4", date4)
