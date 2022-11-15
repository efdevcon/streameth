import { Stage, Event } from 'types'
import fs from 'fs'
import matter from 'gray-matter'

const configPath = './config/streameth.json'

export class EventController {
  static async getEvent(): Promise<Event> {
    if (!fs.existsSync(configPath)) {
      new Error('No config file found')
    }
    const config = fs.readFileSync(configPath, 'utf8')
    return JSON.parse(config)
  }
}

const cmsContentPath = './content/stages'

export class StageController {
  static async getStagesFromConfig(): Promise<Stage[]> {
    const event = await EventController.getEvent()
    return event.stream.stages
  }

  static async getStagesFromCms(): Promise<Stage[]> {
    const filesInProjects = fs.readdirSync(cmsContentPath)
    return filesInProjects.map((file) => {
      const filename = file.slice(0, file.indexOf('.'))
      const data = matter(fs.readFileSync(`${cmsContentPath}/${filename}.md`, 'utf8'))
      console.log(data)
      return {
        id: filename,
        name: data.data.name,
        image: data.data?.image,
        stream: data.data?.stream,
      }
    })
  }

  static async getStages(): Promise<Stage[]> {
    const cmsStages = await this.getStagesFromCms()
    const configStages = await this.getStagesFromConfig()
    return [...cmsStages, ...configStages]
  }

  static async getStage(id: string): Promise<Stage | null > {
    const stages = await this.getStages()
    const stage = stages.find((stage) => stage.id === id)
    if (!stage || !this.validateStage(stage)) {
      return null
    }
    return stage
  }

  static validateStage(stage: Stage): boolean {
    // check if stage attributes are not undefined
    if (!stage.id || !stage.name || !stage.stream || !stage.image) {
      return false
    }
    return true
  }
}
