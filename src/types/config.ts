export interface Config {
  name: string
  description: string
  start: string
  end: string
  website: string
  poster: string
  data: Data
  plugins: any[]
}

export interface DataConfig {
  [key: string]: string | boolean | number | Array<Config>
}

export type DataConfigTypes = 'fs' | 'pretalx' | 'gsheet'
export interface Data {
  type: DataConfigTypes
  config: DataConfig
}
