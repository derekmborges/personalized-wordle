import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const makeFiveRandChars = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = ''
    for (let i=0; i<5; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)]
        result += char
    }
    return result
}

const makeId = (): string => {
    return `${makeFiveRandChars()}-${makeFiveRandChars()}`
}

// POST /api/wordle
// Required fields in body: word, message
// Optional fields in body: fromName
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { word, message, fromName } = req.body

  const result = await prisma.personalizedWordle.create({
    data: {
        id: makeId(),
        word,
        message,
        creatorName: fromName
    }
  })
  res.json(result)
}
