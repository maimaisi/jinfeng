<template>
  <section>
    <div class="head">
      <!-- <div class="head_bottom box-row">
        <span class="font_color_huangse">活动简报：</span>
        <span class="head_bottom_content">金凤区丰登镇</span>
      </div>-->
    </div>
    <div class="content">
      <div
        class="cell box-row align-center justify-space-between"
        v-for="(item,index) in dataList"
        :key="index"
        @click="goNews(item.id)"
      >
        <div class="cell-left box-column align-center" style="margin-right: 0.2rem;">
          <img class="cell-img" :src="item.url">
        </div>
        <div class="cell-right box-column align-start">
          <span class="cell-left-title">{{item.name}}</span>
          <span
            class="cell-left-foot"
            v-if="item.count>0"
          >{{item.count}}阅读&nbsp;&nbsp;{{dateFtt("yyyy-MM-dd", new Date(item.create_time))}}</span>
        </div>
      </div>
      <!-- <div class="cell box-row align-center justify-space-between">
        <div class="cell-left box-column align-start">
          <span class="cell-left-title">责任单位：金凤区金凤区金凤区金凤区金凤区金凤区</span>
          <span class="cell-left-foot">999评论</span>
        </div>
        <div class="cell-right box-column align-center">
          <img class="cell-img" :src="require('../assets/images/news_list_default.png')">
        </div>
      </div>
      <div class="cell box-row align-center justify-space-between">
        <div class="cell-left box-column align-start">
          <span class="cell-left-title">责任单位：金凤区金凤区金凤区金凤区金凤区金凤区</span>
          <span class="cell-left-foot">999评论</span>
        </div>
        <div class="cell-right box-column align-center">
          <img class="cell-img" :src="require('../assets/images/news_list_default.png')">
        </div>
      </div>
      <div class="cell box-row align-center justify-space-between">
        <div class="cell-left box-column align-start">
          <span class="cell-left-title">责任单位：金凤区金凤区金凤区金凤区金凤区金凤区</span>
          <span class="cell-left-foot">999评论</span>
        </div>
        <div class="cell-right box-column align-center">
          <img class="cell-img" :src="require('../assets/images/news_list_default.png')">
        </div>
      </div>-->
    </div>
    <navBarBottom :index="index"></navBarBottom>
  </section>
</template>
<script>
import navBarBottom from "../components/nav_bar_bottom.vue";
export default {
  components: {
    navBarBottom
  },
  data() {
    return {
      dataList: [],
      index: "index"
    };
  },
  created() {
    this.$axios
      .http({
        url: "/jfqwmsj/api/news/select",
        data: {
          pageSize: 100,
          pageNum: 1
        }
      })
      .then(res => {
        this.dataList = res.result.list;
        console.log(res);
      })
      .catch(err => {
        this.$toast(err);
      });
  },

  methods: {
    goNews(id) {
      this.$router.push({
        name: "newsDetail",
        params: {
          ID: id
        }
      });
    },
    dateFtt(fmt, date) {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    }
  }
};
</script>
<style lang="scss" scoped>
.head_bottom_content {
  width: 5rem;
  margin-left: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  color: #ffffff;
  font-weight: 500;
}

.content {
  height: 9.8rem;
  overflow: scroll;
  background-color: #daeff9;
}

.content::-webkit-scrollbar {
  display: none;
}

.cell {
  background-color: #ffffff;
  height: 1.82rem;
  padding: 0 0.5rem;
  margin: 0.04rem auto;
}

.cell-left {
  // width: 4rem;
}

.cell-left-title {
  font-size: 0.3rem;
  text-align: left;
  line-height: 0.4rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.cell-left-foot {
  font-size: 0.22rem;
  color: #888888;
  margin-top: 0.1rem;
}

.cell-img {
  width: 1.64rem;
  height: 1.64rem;
}
</style>