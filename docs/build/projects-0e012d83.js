function t(t){const a=localStorage.getItem(t);return JSON.parse(a)}function a(){if(!localStorage.length)return[];return[...Array(localStorage.length)].map(((t,a)=>localStorage.key(a)))}function e(t,a){localStorage.setItem(t,JSON.stringify(a))}export{a,t as g,e as s};