import * as dotenv from 'dotenv'
const fs = require('fs')

dotenv.config()

const baseDir = 'imports/trustx'
const baseFileName = 'TrustX_22-04_Ijzaal_'
const nrOfFiles = 10
const date = '2022-04-22'
const track = 'Layer-2'
const stage = 'Ijzaal'

// TrustX_21-04_GroteZaal_ // 15
// TrustX_22-04_GroteZaal_ // 17

// TrustX_21-04_Ijzaal_ // 11
// TrustX_22-04_Ijzaal_ // 10

Generate()

async function Generate() {
    console.log('Create file dir', baseDir)
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir)
    }

    console.log('Generating metadata files..')
    for (let i = 0; i < nrOfFiles; i++) {
        const id = i + 1
        let session: any = {
            "id": `${id}`,
            "start": date,
            "end": date,
        }
        if (track) session.track = track
        if (stage) session.stage = stage

        fs.writeFileSync(`${baseDir}/${baseFileName}${id}.json`, JSON.stringify(session, null, 2))
    }
}
