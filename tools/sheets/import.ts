import * as dotenv from 'dotenv'
import moment from 'moment'
import slugify from 'slugify'
const fs = require('fs')
const { google } = require('googleapis')

dotenv.config()

const apiKey = process.env.GOOGLE_API_KEY
const sheetId = '14rVPRq8epW77wh2ZPrn9zKUaLF4JJ8GlAlPXZ20Reug'
const importDir = 'imports'
const generateIndividualFiles = true

Import()

async function Import() {
    console.log('Importing event data from Google Sheets..')

    if (!fs.existsSync(importDir)) {
        fs.mkdirSync(importDir)
    }

    const sheets = google.sheets({
        version: 'v4',
        auth: apiKey
    })
    const sheetsResponse = await sheets.spreadsheets.get({
        spreadsheetId: sheetId,
    })
    const sheetNames = sheetsResponse.data.sheets.map((i: any) => i.properties.title)
        .splice(1, sheetsResponse.data.sheets.length)
    console.log('ALL SHEETS', sheetNames)

    for (let i = 0; i < sheetNames.length; i++) {
        const sheet = sheetNames[i]
        console.log('PROCESSING SHEET', sheet)
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${sheet}!A1:1000`,
        })

        const data = response.data.values.splice(2, response.data.values.length)
        if (data.length === 0) continue

        const sessions = data.map((i: any, index: number) => {
            let session: any = {
                "id": (i[0] || defaultSlugify(i[1])).trim(),
                "name": i[1].trim(),
                "start": moment.utc(i[7].trim()).toDate(),
                "end": moment.utc(i[8].trim()).toDate(),
            }

            if (i[2]) session.abstract = i[2].trim()
            if (i[3]) session.description = i[3].trim()
            if (i[4]) session.track = i[4].trim()
            if (i[5]) session.type = i[5].trim()
            if (i[6]) session.stage = i[6].trim()

            session.speakers = []
            // Speaker 1
            if (i[10] || i[11] || i[12]) {
                session.speakers.push({
                    "id": defaultSlugify(i[10]).trim(),
                    "name": i[10]?.trim(),
                    "role": i[11]?.trim(),
                    "description": i[12]?.trim()
                })
            }
            // Speaker 2
            if (i[13] || i[14] || i[15]) {
                session.speakers.push({
                    "id": defaultSlugify(i[13]).trim(),
                    "name": i[13]?.trim(),
                    "role": i[14]?.trim(),
                    "description": i[15]?.trim()
                })
            }
            // Speaker 3
            if (i[16] || i[17] || i[18]) {
                session.speakers.push({
                    "id": defaultSlugify(i[16]).trim(),
                    "name": i[16]?.trim(),
                    "role": i[17]?.trim(),
                    "description": i[18]?.trim()
                })
            }
            // Speaker 4
            if (i[19] || i[20] || i[21]) {
                session.speakers.push({
                    "id": defaultSlugify(i[19]).trim(),
                    "name": i[19]?.trim(),
                    "role": i[20]?.trim(),
                    "description": i[21]?.trim()
                })
            }

            if (session.speakers.length === 0 && i[9]) {
                session.speakers = i[9].split(',').map((speaker: string) => {
                    return {
                        "id": defaultSlugify(speaker).trim(),
                        "name": speaker.trim(),
                    }
                })
            }

            if (generateIndividualFiles) {
                const eventDir = `${importDir}/${defaultSlugify(sheet)}`
                if (!fs.existsSync(eventDir)) {
                    fs.mkdirSync(eventDir)
                }

                fs.writeFileSync(`${eventDir}/${index + 1}.json`, JSON.stringify(session, null, 2))
            }

            return session
        })

        fs.writeFileSync(`${importDir}/${defaultSlugify(sheet)}.json`, JSON.stringify(sessions, null, 2))
    }
}

function defaultSlugify(text: string): string {
    return slugify(text, { lower: true, strict: true, trim: true })
}