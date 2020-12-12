<template>
  <div class="menuContainer">
    <ul>
      <li :class="{ active: type == 'recommend' }" @click="handleToRecommend">
        每日主题
      </li>
      <li @click="isShowThems" :class="{ active: type == 'daily' }">
        主题日报
      </li>
      <ul v-show="showThemes">
        <li
          v-for="(item, index) in themes"
          :key="index"
          :class="{ active: type == 'daily' && item.id == themeId }"
          @click="handleToTheme(item.id)"
        >
          <a>{{ item.name }}</a>
        </li>
      </ul>
    </ul>
  </div>
</template>
<script>
import Http from "../libs/http-client";
import timeHand from "../libs/timeHanding";
export default {
  name: "menuComponent",
  data() {
    return {
      showThemes: false,
      themes: [],
      type: "recommend",
      themeId: 13,
      list: [],
      recommendTime: "",
      isLoading: false,
    };
  },
  methods: {
    isShowThems() {
      this.showThemes = !this.showThemes;
    },
    getThemes() {
      Http.default.get("themes").then((res) => {
        this.themes = [
          {
            name: "日常心理学",
            id: 13,
            thumbnail: "http://pic3.zhimg.coml/xxx.jpg",
            color: 15007,
            description: "了解自己和别人。",
          },
        ];
      });
    },
    handleToTheme(id) {
      this.type = "daily";
      this.themeId = id;
      this.list = [];
      Http.default.get("theme" + id).then((res) => {
        this.list = [
          {
            type: 0,
            id: "7097426",
            title:
              "人们在虚拟生活中投入的精力是否对现实生活的人际关系有积极意义",
          },
          {
            type: 0,
            id: "7101963",
            title: "写给想成为心理咨询师的学生同仁",
            images: ["http://pic3.zhimg.coml/xxx.jpg"],
          },
        ];
      });
    },
    handleToRecommend() {
      this.type = "recommend";
      this.recommendTime = timeHand.getTime();
      this.getRecommendList(this.recommendTime);
    },
    getRecommendList(time) {
      this.isLoading = true;
      const preday = time + 86400000;
      Http.default
        .get("news/before/" + timeHand.getDate(preday))
        .then((res) => {
          this.$emit("setCenterList", res);
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.getThemes();
    this.handleToRecommend();
    let centerContainer = document.getElementsByClassName("centerContainer")[0];
    let timeNumber = null;
    centerContainer.addEventListener("scroll", () => {
      if (this.type == "daily" || this.isLoading) return;
      if (
        centerContainer.scrollTop + document.body.clientHeight >=
        centerContainer.scrollHeight
      ) {
          if(timeNumber){
            clearTimeout(timeNumber)
          }
          timeNumber = setTimeout(() => {
            this.recommendTime -= 86400000;
            this.getRecommendList(this.recommendTime);
          }, 500);
        }
    });
  },
};
</script>
<style scoped>
.menuContainer {
  width: 90px;
  height: 100%;
  background-color: #f5f7f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  color: #657180;
}
ul {
  width: 100%;
}
.menuContainer li {
  width: 100%;
  padding: 20px 0px;
  text-align: center;
}
.menuContainer li:hover {
  background-color: #e3e8ee;
}
.active {
  border-right: 3px solid skyblue;
}
</style>