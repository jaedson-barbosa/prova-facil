import type { TSave } from './types'

export function getData(name: string) {
  const value = localStorage.getItem(name)
  const data = JSON.parse(value) as TSave
  return data
}

export function getProjectNames() {
  if (!localStorage.length) return []
  const names = [...Array(localStorage.length)].map((v, i) => localStorage.key(i))
  return names
}

export function setProject(name: string, data: TSave) {
  localStorage.setItem(name, JSON.stringify(data))
}
