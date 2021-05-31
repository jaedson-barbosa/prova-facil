<script lang="ts">
  import { url } from '@roxi/routify'
  import { createId } from '../_scripts/createId'
  import { project } from './_store'

  async function pasted(e: ClipboardEvent) {
    const items = e.clipboardData.items
    const item = [...Array(items.length)]
      .map((v, i) => items[i])
      .find((v) => v.type.indexOf('image') === 0)
    if (item) {
      const file = item.getAsFile()
      if (await $project.setImage(file)) {
        $project = $project
      }
    }
  }

  $: data = $project.data

  const idAno = createId()
  const idMateria = createId()
  const idQuestoes = createId()
  const idAlternativas = createId()
</script>

<svelte:window on:paste={pasted} />

<div class="container content box">
  <div class="buttons has-addons is-centered">
    <a class="button" href={$url('../')}>
      <span class="icon is-small">
        <i class="fas fa-home" />
      </span>
      <span>Início</span>
    </a>
    <button class="button" on:click={$project.save}>
      <span class="icon is-small">
        <i class="fas fa-save" />
      </span>
      <span>Salvar</span>
    </button>
    <a class="button" href={$url('./impressao')}>
      <span class="icon is-small">
        <i class="fas fa-print" />
      </span>
      <span>Imprimir</span>
    </a>
  </div>
  <div class="field">
    <div class="control">
      <!-- svelte-ignore a11y-autofocus -->
      <textarea
        class="textarea"
        bind:value={data.text}
        rows="16"
        placeholder="Texto"
        autofocus
      />
    </div>
  </div>
  <div class="columns is-multiline is-centered">
    {#each $project.imagesUrls as img}
      <div class="is-one-quarter">
        <figure>
          <img src={img.url} alt={img.id} />
          <figcaption>
            <a href={$url('./:image', { image: img.id })}> {img.id} </a>
          </figcaption>
        </figure>
      </div>
    {/each}
  </div>
  <div class="field">
    <label for={idAno} class="label">Ano</label>
    <div class="control">
      <input
        id={idAno}
        class="input"
        type="text"
        minlength="1"
        bind:value={data.ano}
      />
    </div>
    <p class="help">Deixar em branco caso não queira cabeçalho.</p>
  </div>
  <div class="field">
    <label for={idMateria} class="label">Matéria</label>
    <div class="control">
      <input
        id={idMateria}
        class="input"
        type="text"
        minlength="4"
        bind:value={data.materia}
      />
    </div>
  </div>
  <div class="field">
    <label for={idQuestoes} class="label">Número de questões</label>
    <div class="control">
      <input
        id={idQuestoes}
        class="input"
        type="number"
        min="1"
        max="20"
        bind:value={data.nQuestoes}
      />
    </div>
  </div>
  <div class="field">
    <label for={idAlternativas} class="label">Número de alternativas</label>
    <div class="control">
      <input
        id={idAlternativas}
        class="input"
        type="number"
        min="1"
        max="6"
        bind:value={data.nAlternativas}
      />
    </div>
  </div>
</div>

<style>
  img {
    height: 10rem;
  }
</style>
