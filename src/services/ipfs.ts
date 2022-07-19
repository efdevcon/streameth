import { create as httpClient } from 'ipfs-http-client'
import all from 'it-all'
import toBuffer from 'it-to-buffer'
import { Video } from 'types'
import { tryUntilSucceed } from 'utils/retry'

const ipfsBaseUri = 'https://ipfs.io'

export async function GetVideos(hash: string): Promise<Video[]> {
  const node = httpClient({
    url: `${ipfsBaseUri}/api/v0/`,
  })

  console.log('Fetching files for', hash)
  const files: any[] | undefined = await tryUntilSucceed<any[]>(() => all(node.ls(hash)), 10)
  if (!files) return []
  console.log('Files to process...', files.length)

  const videos = Promise.all(
    files
      .filter((i: any) => i.name.endsWith('.mp4'))
      .map(async (i: any) => {
        const slug = i.name.replace('.mp4', '')
        const metadataFile = files.find((i: any) => i.name.endsWith(`${slug}.json`))
        let video: Video = {
          id: i.cid.toString(),
          slug: slug,
          url: `${ipfsBaseUri}/ipfs/${i.cid.toString()}`,
        }

        if (metadataFile) {
          const buffer = await toBuffer(node.cat(metadataFile.path))
          const metadata = new TextDecoder('utf-8').decode(buffer)
          if (metadata) video.session = JSON.parse(metadata)

          // ADDING DIFFERENT DATA FOR TESTING PURPOSES - CAN DELETE LATER
          if (hash === 'QmTmeSDcFz1rhMvS9zHfpnFc1WL7boTtMVJ4iHcUT7n1jo') {
            if (video.session && slug === '02') video.session.track = 'Security'
            if (video.session && slug === '03') video.session.room = 'Room'
          }
        }

        return video
      })
  )

  return videos
}
