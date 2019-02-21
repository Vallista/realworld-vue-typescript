<template>
    <div>
        <gnb-header/>
        <router-view></router-view>
        <gnb-footer/>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop} from 'vue-property-decorator'
import GnbHeader from './components/header/GnbHeadeer.vue'
import GnbFooter from './components/footer/GnbFooter.vue'

@Component({
    components: {
        GnbHeader,
        GnbFooter,
    }
})
export default class RealWorld extends Vue {

}
</script>

<style>
@import url("//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css");
@import url("//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic");
@import url("//demo.productionready.io/main.css");

</style>
