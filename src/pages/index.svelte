<script lang="ts">
  import { url } from '@roxi/routify'
  import { getProjectNames, setProject, getData } from './_scripts/projects'
  import type { TSavedProject, TSave } from './_scripts/types'

  function novo() {
    let name = ''
    do {
      const helpText = projects[name]
        ? 'Escolha um nome diferente para o projeto.'
        : 'Escolha um nome para o projeto.'
      name = prompt(helpText, name)
      if (!name) break // Cancelar adição
    } while (projects[name] || name.includes(','))
    if (name) {
      name = name.replaceAll(' ', '-')
      addProject(name, {
        ano: '',
        images: [],
        materia: name,
        nAlternativas: 4,
        nQuestoes: 5,
        text: '',
      })
    }
  }

  async function proccessFile(e: { currentTarget: HTMLInputElement }) {
    const file = e.currentTarget.files[0]
    if (!file) return
    try {
      const fileName = file.name.split('.')[0]
      const fileText = await file.text()
      const fileData: any = JSON.parse(fileText)
      if (Array.isArray(fileData)) {
        const fileProjects = fileData.map((v) => v as TSavedProject)
        if (fileProjects.some((v) => projects.includes(v.name))) {
          alert('Um ou mais projetos já estão presentes.')
          return
        }
        fileProjects.forEach((v) => addProject(v.name, v.data))
      } else {
        const fileProject = fileData as TSave
        addProject(fileName, fileProject)
      }
    } catch (error) {
      console.log(error)
      alert('Arquivo inválido.')
    }
  }

  let projects = getProjectNames()

  function addProject(name: string, data: TSave) {
    setProject(name, data)
    projects = [name, ...projects]
  }

  async function exportar() {
    const resultObject: TSavedProject[] = projects.map((v) => {
      return { name: v, data: getData(v) }
    })
    const resultText = JSON.stringify(resultObject)
    const resultBlob = new Blob([resultText], { type: 'application/json' })
    const url = URL.createObjectURL(resultBlob)
    var a = document.createElement('a')
    a.download = 'projetos.json'
    a.href = url
    a.click()
    URL.revokeObjectURL(url)
  }

  function limpar() {
    localStorage.clear()
    projects = []
  }
</script>

<div class="container content box">
  <h1 class="title">Projetos</h1>
  <div class="field is-grouped is-grouped-multiline">
    {#each projects as name}
      <div class="control">
        <a class="button" href={$url('./:name', { name })}> {name} </a>
      </div>
    {/each}
  </div>

  <h1 class="title">Ações</h1>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control">
      <div class="file">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            accept="application/json"
            on:change={proccessFile}
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload" />
            </span>
            <span class="file-label"> Importar projetos </span>
          </span>
        </label>
      </div>
    </div>
    <div class="control">
      <button
        class="button is-danger"
        on:click={limpar}
        class:is-static={!projects.length}
      >
        Limpar
      </button>
    </div>
    <div class="control">
      <button
        class="button"
        on:click={exportar}
        class:is-static={!projects.length}
      >
        Exportar
      </button>
    </div>
    <div class="control">
      <a
        class="button"
        href={$url('./impressao')}
        class:is-static={!projects.length}
      >
        Imprimir
      </a>
    </div>
    <div class="control">
      <button class="button is-primary" on:click={novo}> Novo projeto </button>
    </div>
  </div>
</div>
