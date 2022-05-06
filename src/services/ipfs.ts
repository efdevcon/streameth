import { create } from 'ipfs-core'
import all from 'it-all'
import toBuffer from 'it-to-buffer'
import { Video } from 'types'

async function init() {
    if (!global.IPFS) {
        global.IPFS = await create()
    }

    return global.IPFS
}

export async function GetVideos(hash: string): Promise<Video[]> {
    const node = await init()

    const files: any[] = await all(node.ls(hash))
    const videos = Promise.all(files.filter((i: any) => i.name.endsWith('.mp4')).map(async (i: any) => {
        const slug = i.name.replace('.mp4', '')
        const metadataFile = files.find((i: any) => i.name.endsWith(`${slug}.json`))
        let video: Video = {
            id: i.cid.toString(),
            slug: slug,
            url: `https://ipfs.io/ipfs/${i.cid.toString()}`,
        }

        if (metadataFile) {
            const buffer = await toBuffer(node.cat(metadataFile.path))
            const metadata = new TextDecoder("utf-8").decode(buffer)
            if (metadata) video.session = JSON.parse(metadata)
        }

        return video
    }))

    return videos
}
