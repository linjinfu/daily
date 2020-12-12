<template>
  <div class="rightContainer">
    <div class="title">{{ data.title }}</div>
    <div v-html="data.body"></div>
    <div v-show="comments.length > 0">
      <span class="commentsHead">评论({{ comments.length }})</span>
      <dl v-for="(item, index) in comments" class="commentContent" :key="index">
          <dt><img :src="item.avatar" alt="" /></dt>
          <dd>
            <span>{{item.author}}</span>
            <span v-time="item.time" class="commenTime"></span>
            <div>{{item.content}}</div>
          </dd>
      </dl>
    </div>
  </div>
</template>
<script>
import Http from "../libs/http-client";
export default {
  name: "leftComponent",
  props: {
    articleId: {
      tyep: String | Number,
      default: 0,
    },
  },
  watch: {
    articleId: {
      handler(val) {
        Http.default.get("news/" + val).then((res) => {
          this.data = res;
          this.getcomment();
        });
      },
      deep: true,
    },
  },
  data() {
    return {
      data: {},
      comments: [],
    };
  },
  methods: {
    getcomment() {
      Http.default
        .get("story/" + this.articleId + "/short-comments")
        .then((res) => {
          this.comments = res.comments;
        });
    },
  },
};
</script>
<style scoped>
.rightContainer {
  flex: 1;
  height: 100%;
  overflow: auto;
  padding: 20px;
}
.title {
  font-size: 28px;
  font-weight: bold;
  color: #222;
  padding: l0px 0;
}
.commentsHead{
  font-size: 20px;
  margin: 10px 0px;
  display: block;
}
.rightContainer>>>.view-more a{
    text-align: center;
    margin: auto;
    display: block;
    background: #f5f7f9;
    text-decoration: none;
    color: #657180;
    padding: 7px 0px;
    margin: 15px 0;
}
dl{
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
}
dt{
  width: 60px;
  text-align: center;
}
dt img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
dd{
  flex: 1;
}
dd span{
  line-height: 40px;
  font-weight: 550;
}
dd span:nth-child(2){
  font-weight: 500;
  font-size: 12px;
}
.commenTime{
  color: #9ea7b4;
}
.commentContent{
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #e3e8ee;
}
</style>
<style >
/* 修改知乎接口获取到的html样式 */
.avatar{
  width: 38px;
  height: 38px;
}
.meta{
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: 20px 0px;
}
.meta img{
  margin: 0 10px 0 0;
}
.bio{
  color: #9ea7b4;
}
.content{
  font-size: 15px;
}
</style>