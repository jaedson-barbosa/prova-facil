export type TSavedProject = { name: string; data: TSave }

export type TSave = {
  text: string
  ano: string
  materia: string
  nQuestoes: number
  nAlternativas: number
  images: { id: string; data: string }[]
}
