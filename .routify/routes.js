
/**
 * @roxi/routify 2.18.0
 * File generated Mon May 31 2021 13:14:53 GMT-0300 (Horário Padrão de Brasília)
 */

export const __version = "2.18.0"
export const __timestamp = "2021-05-31T16:14:53.078Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "root": true,
  "children": [
    {
      "isDir": true,
      "children": [
        {
          "isPage": true,
          "path": "/:name/:image",
          "id": "__name__image",
          "component": () => import('../src/pages/[name]/[image].svelte').then(m => m.default)
        },
        {
          "isPage": true,
          "path": "/:name/impressao",
          "id": "__name_impressao",
          "component": () => import('../src/pages/[name]/impressao.svelte').then(m => m.default)
        },
        {
          "isIndex": true,
          "isPage": true,
          "path": "/:name/index",
          "id": "__name_index",
          "component": () => import('../src/pages/[name]/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": true,
      "path": "/:name",
      "id": "__name__layout",
      "component": () => import('../src/pages/[name]/_layout.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/impressao",
      "id": "_impressao",
      "component": () => import('../src/pages/impressao.svelte').then(m => m.default)
    },
    {
      "isIndex": true,
      "isPage": true,
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/prova-facil",
      "id": "_provaFacil",
      "component": () => import('../src/pages/prova-facil.svelte').then(m => m.default)
    }
  ],
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

