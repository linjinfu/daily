<template>
  <div class="centerContainer">
    <div v-for="(listItem,index) in listData" :key="index">
    <div class="headnToday">{{formDate(listItem.date)}}</div>
    <dl v-for="(item,index) in listItem.stories" :key="index" @click="handleClick(item.id)">
      <dt v-if="item.images">
        <img :src="item.images" />
      </dt>
      <dd :class="{isImage:item.images}">
        {{ item.title }}
      </dd>
    </dl>
    </div>
  </div>
</template>
<script>  
export default {
  name:'centerComponent',
  props: {
    listData: {
      type: Array,
      default: [{
        stories:[],
        date:''
      }
      ],
    },
  },
  methods:{
    formDate(time){
      if(time){
      let month = time.substr(4,2);
      let day = time.substr(6,2);
      return `${month}月${day}日`
      }
    },
    handleClick(id){
      this.$emit('setArtticleId',id)
    }
  }
};
</script>
<style scoped>
.centerContainer{
    width:273px;
    height: 100%;
    overflow: auto;
    border-right: 1px solid #d7dde4;
    /* height: 697px; */
}
dl{
  display: flex;
  font-size: 16px;
  padding: 16px;
  cursor: pointer;
}
dl:hover{
  background: #e3e8ee;
}
dt{
  width: 80px;
  height: 80px;
} 
img{  
  width: 100%;
  height: 100%;
  border-radius: 3px;
}
dd{
  flex: 1;
  padding: 0px 0px 0px 7px;
}
.isImage{
  padding: 5;
}
.headnToday{
  text-align: center;
  margin: 10px 0;
}
</style>