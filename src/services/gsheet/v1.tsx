import { Session } from "types"
// import { Config } from "types/config"
// import { google } from 'googleapis'
// import { GetSlug, GetYouTubeVideoIdFromUrl } from "utils/format"

// export async function GetSchedule(config: Config): Promise<Session[]> {
//     if (!config['sheetId']) throw new Error('No valid sheetId set for gsheet module')
//     if (!process.env.GOOGLE_API_KEY) throw new Error("gsheet module requires a valid 'GOOGLE_API_KEY' env variable")
//     const sheetId = config['sheetId'] as string

//     const sheets = google.sheets({
//         version: 'v4',
//         auth: process.env.GOOGLE_API_KEY
//     })

//     const sheetsResponse = await sheets.spreadsheets.get({
//         spreadsheetId: sheetId
//     })
//     const sheetName = sheetsResponse?.data?.sheets?.map((i: any) => i.properties.title)[0]
//     if (!sheetName) return []

//     const response = await sheets.spreadsheets.values.get({
//         spreadsheetId: sheetId,
//         range: `${sheetName}!A1:1000`,
//     })
//     const data = response?.data?.values?.splice(2, response.data.values.length)
//     if (!data || data.length === 0) return []

//     const sessions = data.map((i: any, index: number) => {
//         let session: Session = {
//             id: GetSlug(i[0].trim()),
//             name: i[0].trim(),
//             description: i[1].trim(),
//             stage: i[5].trim(),
//             start: new Date(i[6].trim()).getTime(),
//             end: new Date(i[7].trim()).getTime(),
//             speakers: []
//         }

//         //if (i[1]) session.abstract = i[1].trim()
//         //if (i[3]) session.track = i[3].trim()
//         //if (i[4]) session.type = i[4].trim()

//         // // Speaker 1
//         // if (i[9]) {
//         //     session.speakers.push({
//         //         id: GetSlug(i[9]).trim(),
//         //         name: i[9]?.trim(),
//         //         description: i[10]?.trim() ?? '',
//         //     })
//         // }
//         // // Speaker 2
//         // if (i[11]) {
//         //     session.speakers.push({
//         //         id: GetSlug(i[11]).trim(),
//         //         name: i[11]?.trim(),
//         //         description: i[12]?.trim() ?? '',
//         //     })
//         // }
//         // // Speaker 3
//         // if (i[13]) {
//         //     session.speakers.push({
//         //         id: GetSlug(i[13]).trim(),
//         //         name: i[13]?.trim(),
//         //         description: i[14]?.trim() ?? '',
//         //     })
//         // }
//         // // Speaker 4
//         // if (i[15]) {
//         //     session.speakers.push({
//         //         id: GetSlug(i[15]).trim(),
//         //         name: i[15]?.trim(),
//         //         description: i[16]?.trim() ?? '',
//         //     })
//         // }

//         // Video/YouTube Url
//         if (i[17]) {
//             session.video = {
//                 id: GetYouTubeVideoIdFromUrl(i[17].trim()) ?? '',
//                 //slug: GetYouTubeVideoIdFromUrl(i[17].trim()) ?? '',
//                 type: 'youtube',
//                 src: i[17].trim()
//             }
//         }

//         if (session.speakers.length === 0 && i[8]) {
//             session.speakers = i[8].split(',').map((speaker: string) => {
//                 return {
//                     id: GetSlug(speaker).trim(),
//                     name: speaker.trim(),
//                 }
//             })
//         }

//         return session
//     })

//     return sessions
// }