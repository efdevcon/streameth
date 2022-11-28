import { Stage } from 'types'
import fs from 'fs'
import matter from 'gray-matter'
import { EventController } from 'services/event'


const cmsContentPath = './content/stages'

export class StageController {
  static async getStagesFromConfig(): Promise<Stage[]> {
    const event = await EventController.getEvent()
    return event.stages
  }

  static async getStagesFromCms(): Promise<Stage[]> {
    const filesInProjects = fs.readdirSync(cmsContentPath)
    return filesInProjects.map((file) => {
      const filename = file.slice(0, file.indexOf('.'))
      const data = matter(fs.readFileSync(`${cmsContentPath}/${filename}.md`, 'utf8'))
      return {
        id: filename,
        name: data.data.name,
         //image: data.data?.image,
        stream: data.data?.stream,
      }
    })
  }

  static async getStages(): Promise<Stage[]> {
    const cmsStages = await this.getStagesFromCms()
    const configStages = await this.getStagesFromConfig()
    return [...cmsStages, ...configStages]
  }

  static async getStage(id: string): Promise<Stage | undefined > {
    const stages = await this.getStages()
    const stage = stages.find((stage) => stage.id === id)
    if (!stage || !this.validateStage(stage)) {
      return undefined
    }
    return stage
  }

  static validateStage(stage: Stage): boolean {
    // check if stage attributes are not undefined
    if (!stage.id || !stage.name || !stage.stream ) {
      return false
    }
    return true
  }
}
