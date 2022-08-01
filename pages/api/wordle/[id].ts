import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const wordleId = req.query.id

    if (req.method === 'GET') {
        handleGET(wordleId, res)
    // } else if (req.method === 'DELETE') {
    //     handleDELETE(wordleId, res)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

// GET /api/wordle/:id
async function handleGET(wordleId: string | string[] | undefined, res: NextApiResponse) {
    if (typeof wordleId !== 'string') {
        res.json(null)
        return
    }

    const post = await prisma.personalizedWordle.findUnique({
        where: { id: wordleId }
    })
    res.json(post)
}
