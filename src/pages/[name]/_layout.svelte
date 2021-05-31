<script lang="ts">
  import { onDestroy } from 'svelte'
  import { getData } from "../_scripts/projects";
  import Project from "../_scripts/project";
  import { project } from './_store'

  export let name: string

  const data = getData(name)
  Project.create(name, data).then(v => $project = v)

  onDestroy(() => {
    $project.save()
    $project.dispose()
  })
</script>

{#if $project}
  <slot />
{/if}
