import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("Apagando registros antigos para limpar o seed...")
  await prisma.beat.deleteMany({})
  
  console.log("Criando produtor AWPLACE DOG...")
  const producer = await prisma.user.upsert({
    where: { email: 'producer@awplace.dog' },
    update: {},
    create: {
      email: 'producer@awplace.dog',
      name: 'AWPLACE DOG',
      role: 'PRODUCER',
      walletAddress: '0x0000000000000000000000000000000000000000'
    },
  })

  console.log("Injetando Beats de alta conversão...")
  await prisma.beat.createMany({
    data: [
      {
        title: "Neon Skies",
        producerId: producer.id,
        genre: "Trap",
        bpm: 140,
        priceUsd: 49.99,
        priceEth: 0.02,
        demoAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      {
        title: "Midnight Ride",
        producerId: producer.id,
        genre: "Drill",
        bpm: 144,
        priceUsd: 59.99,
        priceEth: 0.025,
        demoAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
      {
        title: "Tokyo Drift",
        producerId: producer.id,
        genre: "Cyberpunk",
        bpm: 120,
        priceUsd: 89.99,
        priceEth: 0.035,
        demoAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      }
    ]
  })
  
  console.log("✅ Banco de Dados populado com sucesso (Seeded)!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
