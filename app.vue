<template>
    <div class="container">
        <menu-component @setCenterList="setCenterList"></menu-component>
        <center-component :listData="centerList" @setArtticleId="setArtticleId"></center-component>
        <right-component :articleId="articleId"></right-component>
    </div>
</template>
<script>
import menuComponent from './commitponents/menuComponent.vue'
import centerComponent from './commitponents/centerComponent.vue'
import rightComponent from './commitponents/rightComponent.vue'
export default {
    components:{
        menuComponent,
        centerComponent,
        rightComponent
    },
    data(){
        return{
            centerList:[],
            articleId:0
        }
    },
    methods:{
        setCenterList(data){
            this.centerList = []
            this.centerList.push(data);
        },
        setArtticleId(id){
            this.articleId = id;
        }
    }
}
</script>
<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
}
</style>    