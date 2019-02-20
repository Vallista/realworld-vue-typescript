import Vue from 'vue'
import RealWorld from './components/RealWorld.vue'

new Vue({
    el: "#app",
    template: `
    <div>
        <real-world/>  
    </div>
    `,
    data: {
      name: 'World'
    },
    components: {
        RealWorld
    }
})
