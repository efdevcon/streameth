import { GetSchedule } from "services/schedule/pretalx"
import config from '../../config/streameth.json'
import fs from 'fs'

require('dotenv').config()

Run()

async function Run() {
    console.log('Run Pretalx importer..')

    const schedule = await GetSchedule({
        apiBaseUri: config.schedule.config['apiBaseUri']
    })

    fs.writeFile("./config/schedule.json", JSON.stringify(schedule, null, 2), function (err) {
        if (err) {
            console.log(err)
        }
    })

    console.log('Ok! All done.')
}