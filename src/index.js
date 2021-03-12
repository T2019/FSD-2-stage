// JS

import './blocks/dropdown-list-value/dropdown-list-value.js'

// SCSS
import './assets/scss/main.scss'

// CSS (example)
// import './assets/css/main.css'

// Vue.js
window.Vue = require('vue')

// Vue components (for use in html)
Vue.component('example-component', require('./components/Example.vue').default)

// Vue init
const app = new Vue({
  el: '#app'
})

require.context('./blocks/', true, /\.(png|svg|jpg)$/); // ищет все картинки в src/blocks/ и импортирует в js, тем самым отпадает необходимость каждый раз делать запрос require для каждой картинки. НО при таком способе ошибки, якобы идет изменения одно и того же файла