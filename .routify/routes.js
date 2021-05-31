
/**
 * @roxi/routify 2.18.0
 * File generated Mon May 31 2021 11:16:45 GMT-0300 (Horário Padrão de Brasília)
 */

export const __version = "2.18.0"
export const __timestamp = "2021-05-31T14:16:45.105Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports
import __name__image from '../src/pages/[name]/[image].svelte'
import __name_impressao from '../src/pages/[name]/impressao.svelte'
import __name_index from '../src/pages/[name]/index.svelte'
import __name__layout from '../src/pages/[name]/_layout.svelte'
import _impressao from '../src/pages/impressao.svelte'
import _index from '../src/pages/index.svelte'

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
          "component": () => __name__image
        },
        {
          "isPage": true,
          "path": "/:name/impressao",
          "id": "__name_impressao",
          "component": () => __name_impressao
        },
        {
          "isIndex": true,
          "isPage": true,
          "path": "/:name/index",
          "id": "__name_index",
          "component": () => __name_index
        }
      ],
      "isLayout": true,
      "path": "/:name",
      "id": "__name__layout",
      "component": () => __name__layout
    },
    {
      "isPage": true,
      "path": "/impressao",
      "id": "_impressao",
      "component": () => _impressao
    },
    {
      "isIndex": true,
      "isPage": true,
      "path": "/index",
      "id": "_index",
      "component": () => _index
    }
  ],
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

