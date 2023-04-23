// let date = new Date()
// date = date.getTime()

// const date1 = new Date("2023-04-01T15:20:16.000Z")
// const date2 = date1.setHours(date1.getHours() + 2)
// console.log(date2, date1, date)

// console.log(date > date2)

// const date3 = new Date("2023-04-01T15:20:16.000Z")
// const date4 = date3.setDate(date3.getDate())
// console.log("date4", date4)

const date = new Date()
console.log(date)

const date1 = date.setDate(date.getDate() + 7)
const date2 = new Date(date1)

console.log(date)
console.log(date2)

const date3 = new Date().getTime()
console.log(date3 < date2)
