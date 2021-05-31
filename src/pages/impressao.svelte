<script lang="ts">
  import { onDestroy } from 'svelte'
  import { goto } from '@roxi/routify'
  import Impressao from './_components/impressao.svelte'
  import { getData, getProjectNames } from './_scripts/projects'
  import Project from './_scripts/project'

  let projects: Project[] = []

  const projs = getProjectNames().map((v) => Project.create(v, getData(v)))
  Promise.all(projs).then((v) => (projects = v))

  onDestroy(() => projects.forEach((v) => v.dispose()))
</script>

{#each projects as scoped}
  <Impressao {scoped} on:click={$goto('./')} />
{/each}
