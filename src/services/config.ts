// ConfigController.ts

import { Config, DataConfigTypes } from 'types/config'
import { getEnvVar } from 'utils/envLoader'

export class ConfigController {
  static async getConfig(): Promise<Config> {
    const config: Config = {
      name: getEnvVar('NEXT_PUBLIC_NAME'),
      description: getEnvVar('NEXT_PUBLIC_DESCRIPTION'),
      start: getEnvVar('NEXT_PUBLIC_START'),
      end: getEnvVar('NEXT_PUBLIC_END'),
      website: getEnvVar('NEXT_PUBLIC_WEBSITE'),
      poster: getEnvVar('NEXT_PUBLIC_POSTER'),
      data: {
        type: ConfigController.validateDataConfigType(getEnvVar('NEXT_PUBLIC_DATA_CONFIG_TYPE')),
        config: {
          sheetId: getEnvVar('NEXT_PUBLIC_DATA_CONFIG_SHEETID'),
          apiToken: getEnvVar('GOOGLE_API_KEY'),
        },
      },
      plugins: [],
    }

    return config
  }

  private static validateDataConfigType(type: string): DataConfigTypes {
    if (type === 'fs') {
      return 'fs'
    }

    if (type === 'pretalx') {
      return 'pretalx'
    }

    if (type === 'gsheet') {
      return 'gsheet'
    }

    throw new Error('Invalid data config type')
  }
}
