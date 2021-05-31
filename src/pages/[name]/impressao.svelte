<script lang="ts">
  import { goto } from '@roxi/routify'
  import Impressao from '../_components/impressao.svelte'
  import { project } from './_store'
</script>

<Impressao scoped={$project} on:click={$goto('./')} />
