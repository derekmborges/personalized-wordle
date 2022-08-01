import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const wordleData: Prisma.PersonalizedWordleCreateInput[] = [
    {
        id: "SAMPLE-ID",
        word: "WORDS",
        message: "Can you guess this random wordle?",
        creatorName: "Site Creator"
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const w of wordleData) {
        const wordle = await prisma.personalizedWordle.create({
            data: w,
        })
        console.log(`Created wordle with id: ${wordle.id}`)
    }
    console.log(`Seeding finished.`)
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
