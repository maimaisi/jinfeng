<template>
  <section>
    <div class="head">
      <div class="head_bottom box-row">
        <span class="font_color_huangse">活动简报：</span>
        <span class="head_bottom_content">金凤区丰登镇</span>
      </div>
    </div>
    <div class="content">
      <h1 class="content_title">{{name}}</h1>
      <div class="content_title_intro box-row justify-space-between align-center">
        <span>{{time}}</span>
        <span>{{count}} 阅读量</span>
      </div>
      <div class="content_body">
        <!-- <img class="content_img" :src="require('../assets/images/news_detail_default.png')"> -->
        <div class="content_text" v-html="content">
          <!-- <p>
            具名slot，通过组件传入模板，每个模板指定是slot名字，这个名字和定制模板匹配到，会替换定制的模板。
            slot是vue中提供的一个标签，用来做模板定制的。属性，事件，定制模板组成了组件的API。
            **使用slot分发内容**
          </p>
          <p>
            具名slot，通过组件传入模板，每个模板指定是slot名字，这个名字和定制模板匹配到，会替换定制的模板。
            slot是vue中提供的一个标签，用来做模板定制的。属性，事件，定制模板组成了组件的API。
            **使用slot分发内容**
          </p>
          <p>
            具名slot，通过组件传入模板，每个模板指定是slot名字，这个名字和定制模板匹配到，会替换定制的模板。
            slot是vue中提供的一个标签，用来做模板定制的。属性，事件，定制模板组成了组件的API。
            **使用slot分发内容**
          </p>-->
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      time: "",
      count: "",
      content: "",
      index: "index"
    };
  },
  created() {
    console.log(this.$route.params.ID);
    this.$axios
      .http({
        url: "/jfqwmsj/api/news/selectById",
        data: { id: this.$route.params.ID }
      })
      .then(res => {
        this.name = res.result.name;
        this.count = res.result.count;
        this.time = this.dateFtt("yyyy-MM-dd", new Date(res.result.createTime));
        this.content = res.result.content;
      })
      .catch(err => {
        this.$toast(err);
      });
  },
  methods: {
    goReservation() {
      this.$router.push({
        name: "reservationList"
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
<style lang="scss">
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
  padding: 0.16rem 0.5rem;
}

.content_title {
  font-size: 0.42rem;
}

.content_title_intro {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  font-size: 0.28rem;
  color: #a0a0a0;
}

.content_body {
  height: 9rem;
  overflow: scroll;
}

.content_body::-webkit-scrollbar {
  display: none;
}

.content_img {
  width: 6.4rem;
  height: 3.7rem;
  margin: 0.33rem auto;
}

.content_text {
  p {
    text-align: left;
    font-size: 0.34rem;
    margin-bottom: 0.34rem;
    line-height: 0.5rem;
  }
}
</style>