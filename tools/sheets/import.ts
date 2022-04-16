import * as dotenv from 'dotenv'
import moment from 'moment'
import slugify from 'slugify'
const fs = require('fs')
const { google } = require('googleapis')

dotenv.config()

const apiKey = process.env.GOOGLE_API_KEY
const sheetId = '14rVPRq8epW77wh2ZPrn9zKUaLF4JJ8GlAlPXZ20Reug'
const importDir = 'imports'

Import()

async function Import() {
    console.log('Importing event data from Google Sheets..')

    const sheets = google.sheets({
        version: 'v4',
        auth: apiKey
    })
    const sheetsResponse = await sheets.spreadsheets.get({
        spreadsheetId: sheetId,
    })
    const sheetNames = sheetsResponse.data.sheets.map((i: any) => i.properties.title)
        .splice(2, sheetsResponse.data.sheets.length)
    console.log('PROCESSING SHEETS', sheetNames)

    for (let i = 0; i < sheetNames.length; i++) {
        const sheet = sheetNames[i]
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${sheet}!A1:1000`,
        })

        const data = response.data.values.splice(2, response.data.values.length)
        if (data.length === 0) continue

        const sessions = data.map((i: any) => {
            let session: any = {
                "id": i[0] || defaultSlugify(i[1]),
                "name": i[1],
                "start": moment.utc(i[7]).toDate(),
                "end": moment.utc(i[8]).toDate(),
            }

            if (i[2]) session.abstract = i[2]
            if (i[3]) session.description = i[3]
            if (i[4]) session.track = i[4]
            if (i[5]) session.type = i[5]
            if (i[6]) session.room = i[6]

            session.speakers = []
            // Speaker 1
            if (i[10] || i[11] || i[12]) {
                session.speakers.push({
                    "id": defaultSlugify(i[10]),
                    "name": i[10],
                    "role": i[11],
                    "description": i[12]
                })
            }
            // Speaker 2
            if (i[13] || i[14] || i[15]) {
                session.speakers.push({
                    "id": defaultSlugify(i[13]),
                    "name": i[13],
                    "role": i[14],
                    "description": i[15]
                })
            }
            // Speaker 3
            if (i[16] || i[17] || i[18]) {
                session.speakers.push({
                    "id": defaultSlugify(i[16]),
                    "name": i[16],
                    "role": i[17],
                    "description": i[18]
                })
            }
            // Speaker 4
            if (i[19] || i[20] || i[21]) {
                session.speakers.push({
                    "id": defaultSlugify(i[19]),
                    "name": i[19],
                    "role": i[20],
                    "description": i[21]
                })
            }

            if (session.speakers.length === 0 && i[9]) {
                session.speakers = i[9].split(',').map((speaker: string) => {
                    return {
                        "id": defaultSlugify(speaker),
                        "name": speaker,
                    }
                })
            }

            return session
        })

        if (!fs.existsSync('imports')) {
            fs.mkdirSync(importDir)
        }
        fs.writeFileSync(`${importDir}/${defaultSlugify(sheet)}.json`, JSON.stringify(sessions, null, 2))
    }
}

function defaultSlugify(text: string): string {
    return slugify(text, { lower: true, strict: true, trim: true })
}