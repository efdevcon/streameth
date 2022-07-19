import { Stage } from "types"

export interface Config {
    [key: string]: string | boolean | number | Array<Config>
}

export interface Stream {
    version: number
    type: 'livepeer' | 'youtube'
    stages: Stage[]
    config: Config
}

export interface Schedule {
    version: number
    type: 'fs' | 'pretalx'
    config: Config
}

export interface Archive {
    version: number
    type: 'ipfs' | 'livepeer' | 'youtube',
    config: Config
}
