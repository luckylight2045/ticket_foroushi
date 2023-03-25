const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const categoryDate = [
  {
    title: "bus",
    tickets: {
      create: [
        {
          location: "Ahvaz",
          destination: "Tehran",
          quantity: 25,
          price: 255000,
          distant: 800,
          departure: new Date("April 4 2023 12:30"),
        },
        {
          location: "Shiraz",
          destination: "Gorgan",
          quantity: 25,
          price: 180000,
          departure: new Date("April 4 2023 13:00"),
        },
        {
          location: "Sanandaj",
          destination: "Kerman",
          quantity: 25,
          price: 150000,
          departure: new Date("April 4 2023 13:00"),
        },
        {
          location: "Mashhad",
          destination: "Esfahan",
          quantity: 25,
          price: 300000,
          distant: 1124,
          departure: new Date("April 4 2023 14:00"),
        },
      ],
    },
  },
  {
    title: "airplane",
    tickets: {
      create: [
        {
          location: "Tehran",
          destination: "Ahvaz",
          quantity: 180,
          price: 1250000,
          departure: new Date("April 4 2023 14:30"),
        },
        {
          location: "Sari",
          destination: "Zanjan",
          quantity: 180,
          price: 1000000,
          departure: new Date("April 4 2023 14:30"),
        },
        {
          location: "Esfahan",
          destination: "Ahvaz",
          quantity: 140,
          price: 650000,
          departure: new Date("April 6 2023 19:00"),
        },
        {
          location: "Boushehr",
          destination: "Mashhad",
          quantity: 190,
          price: 1450000,
          departure: new Date("April 7 2023 20:00"),
        },
        {
          location: "Ahvaz",
          destination: "Tehran",
          quantity: 190,
          price: 1300000,
          departure: new Date("April 10 2023 7:00"),
        },
      ],
    },
  },
  {
    title: "train",
    tickets: {
      create: [
        {
          location: "Ahvaz",
          destination: "Tehran",
          quantity: 200,
          price: 255000,
          departure: new Date("April 4 2023 12:00"),
        },
        {
          location: "Ahvaz",
          destination: "Mashhad",
          quantity: 200,
          price: 300000,
          departure: new Date("April 4 2023 13:00"),
        },
        {
          location: "Zahedan",
          destination: "Tehran",
          quantity: 200,
          price: 430000,
          departure: new Date("April 8 2023 15:00"),
        },
        {
          location: "Kermanshah",
          destination: "Tehran",
          quantity: 200,
          price: 325000,
          departure: new Date("April 8 2023 17:45"),
        },
      ],
    },
  },
]

async function main() {
  for (let cat of categoryDate) {
    await prisma.category.create({
      data: cat,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.log(err)
    await prisma.$disconnect()
    process.exit(1)
  })
