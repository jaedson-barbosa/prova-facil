<script lang="ts">
  import { goto } from '@roxi/routify'
  import Croppie from 'croppie'
  import { onDestroy, onMount } from 'svelte'
  import { project } from './_store'

  export let image: string

  let resizer: HTMLDivElement
  let croppie: Croppie

  async function cortar() {
    const blob = await croppie.result({ type: 'blob' })
    if (await $project.setImage(blob, image)) goToEditor()
  }

  async function copia() {
    const newId = await $project.copyImage(image)
    if (newId) {
      $goto('./:image', { image: newId })
    }
  }

  function apenasRenomear() {
    if ($project.renameImage(image)) goToEditor()
  }

  function remover() {
    $project.removeImage(image)
    goToEditor()
  }

  function goToEditor() {
    $goto('./')
  }

  onMount(() => {
    croppie = new Croppie(resizer, {
      enableResize: true,
      showZoomer: false,
      viewport: { width: 400, height: 400, type: 'square' },
    })
    const url = $project.imagesUrls.find((v) => v.id == image).url
    croppie.bind({ url })
  })

  onDestroy(() => croppie.destroy())
</script>

<div class="container content box">
  <div class="buttons has-addons is-centered">
    <button class="button" on:click={apenasRenomear}>
      <span class="icon is-small">
        <i class="fas fa-font" />
      </span>
      <span> Renomear </span>
    </button>
    <button class="button" on:click={cortar}>
      <span class="icon is-small">
        <i class="fas fa-cut" />
      </span>
      <span> Cortar </span>
    </button>
    <button class="button" on:click={copia}>
      <span class="icon is-small">
        <i class="fas fa-copy" />
      </span>
      <span> Cópia </span>
    </button>
    <button class="button" on:click={goToEditor}>
      <span class="icon is-small">
        <i class="fas fa-home" />
      </span>
      <span> Voltar </span>
    </button>
    <button class="button" on:click={remover}>
      <span class="icon is-small">
        <i class="fas fa-trash" />
      </span>
      <span> Remover </span>
    </button>
  </div>
  <div class="field">
    <div class="control is-expanded">
      <div bind:this={resizer} style="height: 400px;" />
    </div>
  </div>
</div>
