import { create, IPFS } from 'ipfs-core'

let client: IPFS

export const getIPFSClient = async () => {
    if (!client) {
        client = await create()
    }

    return client
}
