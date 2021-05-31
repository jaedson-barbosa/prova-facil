<script lang="ts">
  import marked from 'marked'
  import type Project from '../_scripts/project'

  export let scoped: Project

  function processPage(v: string) {
    let index = v.indexOf('/espaco')
    while (index >= 0) {
      try {
        const end = v.indexOf('\n', index)
        const frag = v.substring(index, end)
        const n = Number(frag.split(' ')[1])
        const brs = [...Array(n)].map(() => '<br>').join('')
        v = v.replace(frag, brs)
        index = v.indexOf('/espaco')
      } catch (error) {
        console.error(error)
        alert('Um dos elementos /espaco tem algum problema.')
        break
      }
    }

    const images = scoped.imagesUrls
    const imagesRefs = images
      .map((v) => `[${v.id}]: ${v.url} "${v.id}"`)
      .join('\n')
    return v + '\n\n' + imagesRefs
  }

  const pages = scoped.data.text.split('/pagina').map(processPage)
  const markedPages = pages.map((v) => marked(v))
  const questoes = [...Array(scoped.data.nQuestoes)].map((v, i) => i + 1)
  const alternativas = [...Array(scoped.data.nAlternativas)].map((v, i) =>
    String.fromCharCode(65 + i)
  )
</script>

<!-- Adicionar cabeçalho e gabarito -->
<div class="content" on:click>
  {#each markedPages as page, i}
    <div class="page">
      {#if i == 0}
        <!-- Cabeçalho -->
        <div class="cabecalho">
          {#if scoped.data.ano}
            <b class="titulo">Escola Geraldo Leite de Morais</b><br />
            Aluno (a): _________________________________________________________________
            &emsp; Ano: {scoped.data.ano}
            <br /><br />
          {/if}
          <center><b class="titulo">Simulado de {scoped.data.materia}</b></center>
        </div>
      {/if}
      <div class="page-content">
        {@html page}
      </div>
      {#if i == markedPages.length - 1 && scoped.data.nQuestoes}
        <!-- Gabarito -->
        <div class="gabarito">
          <center><b class="titulo">Gabarito</b></center>
          <div class="gabarito-content">
            {#each questoes as q}
              <div>
                {q}.
                {#each alternativas as a}
                  <span class="alternativa">{a}</span>
                {/each}
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .page {
    display: block;
    background-color: white;
    margin: auto;
    width: 21cm;
    height: 29.7cm;
    padding: 2cm 1cm 1cm 1cm;
    font-family: 'Arial';
    font-size: 14px;
  }

  @media screen {
    .page {
      border: 1px solid #ccc;
      border-radius: 1rem;
    }
  }

  .page-content {
    /* column-fill: auto; */
    /* column-width: 8cm; */
    column-count: 2;
    column-gap: 1cm;
    column-rule: 1px solid #aaa;
    text-align: justify;
  }

  .gabarito {
    border: #aaa solid;
    border-width: 1px 0 0 0;
  }

  .gabarito-content {
    column-count: 2;
    column-gap: 1cm;
    /* column-rule: 1px solid #ccc; */
  }

  .alternativa {
    border: 1px solid #444;
    border-radius: 1em;
    display: inline-block;
    width: 3em;
    height: 2em;
    text-align: center;
    line-height: 2em;
    margin: 0.25em 0.5em;
  }

  .cabecalho {
    border: #aaa solid;
    border-width: 0 0 1px 0;
  }

  .titulo {
    font-size: 16px;
    /* line-height:2em; */
  }
</style>
