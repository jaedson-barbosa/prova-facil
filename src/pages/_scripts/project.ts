import { setProject } from './projects'
import type { TSave } from './types'

export const defaultData: TSave = {
  ano: '',
  images: [],
  materia: '',
  nAlternativas: 4,
  nQuestoes: 5,
  text: '',
}

export default class Project {
  private constructor(
    public name: string,
    public data: TSave,
    public imagesUrls: { id: string; url: string }[]
  ) {}

  public static async create(name: string, data?: TSave) {
    if(!data) data = defaultData
    const imagesUrls: { id: string; url: string }[] = await Promise.all(
      data.images.map(async ({ id, data }) => {
        const res = await fetch(data)
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        return { id, url }
      })
    )
    return new Project(name, data, imagesUrls)
  }

  public dispose() {
    this.imagesUrls.forEach((v) => URL.revokeObjectURL(v.url))
  }

  public async setImage(blob: Blob, id = '') {
    const oldId = id // Imagem original
    if (!id) id = this.getName(id) // Nova imagem
    if (!id) return false // Cancelado
    if (oldId) this.removeImage(oldId) // Remover original
    const data = await this.toDataURL(blob)
    this.data.images.push({ id, data })
    this.imagesUrls.push({ id, url: URL.createObjectURL(blob) })
    return true
  }

  public renameImage(id: string) {
    const find = (v: { id: string }) => v.id == id
    const newId = this.getName(id)
    if (!newId) return false // Cancelado
    this.data.images.find(find).id = newId
    this.imagesUrls.find(find).id = newId
    return true
  }

  private getName(id: string) {
    do {
      const helpText = this.imagesUrls.some((v) => v.id == id)
        ? 'Escolha uma identificação diferente para a imagem.'
        : 'Escolha a identificação da imagem.'
      id = prompt(helpText, id)
      if (!id) break // Cancelar adição
    } while (this.imagesUrls.some((v) => v.id == id))
    if (id) id = id.replaceAll(' ', '-')
    return id
  }

  public save() {
    setProject(this.name, this.data)
  }

  public async copyImage(id: string) {
    id = this.getName(id)
    if (!id) return ''
    const find = (v: { id: string }) => v.id == id
    const url = this.imagesUrls.find(find)
    this.imagesUrls.push({ ...url, id })
    const data = this.data.images.find(find)
    this.data.images.push({ ...data, id })
    return id
  }

  public removeImage(id: string) {
    const find = (v: { id: string }) => v.id == id
    const indexUrl = this.imagesUrls.findIndex(find)
    URL.revokeObjectURL(this.imagesUrls[indexUrl].url)
    this.imagesUrls.splice(indexUrl, 1)
    const indexData = this.data.images.findIndex(find)
    this.data.images.splice(indexData, 1)
  }

  private async toDataURL(blob: Blob): Promise<string> {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
}
