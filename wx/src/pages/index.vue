<template>
  <section>
    <div class="head">
      <div class="head_bottom box-row">
        <span class="font_color_huangse">活动简报：</span>
        <span class="head_bottom_content">金凤区丰登镇</span>
      </div>
    </div>
    <div class="content">
      <div class="box-row justify-space-between align-center cell border_red">
        <div class="box-column justify-center align-center cell_img bg_red">
          <img :src="require('../assets/images/jiang_img.png')">
          <img :src="require('../assets/images/index_11.png')">
        </div>
        <!--<div class="box-column align-start cell_content">
            <span>理论宣讲等服务</span>
            <span>此内容为演示</span>
        </div>-->
        <button class="bg_red" @click="goReservation(0)">立即预约</button>
      </div>
      <div class="box-row justify-space-between align-center cell border_blue">
        <div class="box-column justify-center align-center cell_img bg_blue">
          <img :src="require('../assets/images/bang_img.png')">
          <img :src="require('../assets/images/index_22.png')">
        </div>
        <!--<div class="box-column align-start cell_content">
            <span>理论宣讲等服务</span>
            <span>此内容为演示</span>
        </div>-->
        <button class="bg_blue" @click="goReservation(1)">立即预约</button>
      </div>
      <div class="box-row justify-space-between align-center cell border_green">
        <div class="box-column justify-center align-center cell_img bg_green">
          <img :src="require('../assets/images/le_img.png')">
          <img :src="require('../assets/images/index_33.png')">
        </div>
        <!--<div class="box-column align-start cell_content">
            <span>理论宣讲等服务</span>
            <span>此内容为演示</span>
        </div>-->
        <button class="bg_green" @click="goReservation(2)">立即预约</button>
      </div>
      <div class="box-row justify-space-between align-center cell border_orange">
        <div class="box-column justify-center align-center cell_img bg_orange">
          <img :src="require('../assets/images/shu_img.png')">
          <img :src="require('../assets/images/index_44.png')">
        </div>
        <!--<div class="box-column align-start cell_content">
            <span>理论宣讲等服务</span>
            <span>此内容为演示</span>
        </div>-->
        <button class="bg_orange" @click="goReservation(3)">立即预约</button>
      </div>
      <div class="box-row justify-space-between align-center cell border_yellow">
        <div class="box-column justify-center align-center cell_img bg_yellow">
          <img :src="require('../assets/images/xing_img.png')">
          <img :src="require('../assets/images/index_55.png')">
        </div>
        <!--<div class="box-column align-start cell_content">
            <span>理论宣讲等服务</span>
            <span>此内容为演示</span>
        </div>-->
        <button class="bg_yellow" @click="goReservation(4)">立即查看</button>
      </div>
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
      openid: "",
      index: "index",
      url: encodeURIComponent("http://wmb.jfdzkb.gov.cn/jfqwmsj/wx/wxLogin")
    };
  },
  created() {
    this.init();
  },
  actived() {
    alert("activedindex");
  },
  methods: {
    init() {
      this.openid =
        this.getUrlkey(window.location.href).openid ||
        sessionStorage.getItem("OID");

      if (!this.openid) {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd2c89c40e8875739&redirect_uri=${
          this.url
        }&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      } else {
        sessionStorage.setItem("OID", this.openid);
        this.$axios
          .http({
            url: "/jfqwmsj/wx/getWxUserInfo",
            data: {
              openid: this.openid
            }
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            this.$toast(err);
          });
      }
    },
    goReservation(type) {
      if (type == 4) {
        this.$router.push({
          name: "newsList"
        });
      } else {
        this.$router.push({
          name: "reservationList",
          params: { type: type, index: this.index }
        });
        sessionStorage.setItem(
          "INDEX_TYPE",
          JSON.stringify({ type: type, index: this.index })
        );
      }
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
  padding: 0.23rem;
}

.cell {
  height: 1.3rem;
  width: 7rem;
  border-radius: 0.1rem;
  margin-bottom: 0.15rem;
}

.cell_content {
  width: 2.5rem;
}

.cell_content span {
  font-size: 15px;
  font-weight: 400;
  line-height: 0.4rem;
}

.cell_content span:nth-child(1) {
  color: #084da0;
}

.cell_img {
  // width: 1.74rem;
  width: 4rem;
  height: 100%;
  flex-direction: row;
}

.cell_img img {
  width: 2rem;
}

.cell_img img:first-child {
  width: 0.6rem;
  margin-right: 0.2rem;
}

.cell button {
  height: 0.64rem;
  width: 1.8rem;
  font-size: 16px;
  color: #ffffff;
  border-style: none;
  border-radius: 0.1rem;
  box-shadow: 1px 1px 3px #3a3a3a; // margin-right: 0.3rem;
  margin-right: 0.5rem;
  font-weight: bold;
}

.bg_red {
  background-color: #ff2323;
}

.border_red {
  border: solid 1.5px #ff2323;
}

.bg_blue {
  background-color: #48bcff;
}

.border_blue {
  border: solid 1.5px #48bcff;
}

.bg_green {
  background-color: #70d235;
}

.border_green {
  border: solid 1.5px #70d235;
}

.bg_orange {
  background-color: #ff8b3d;
}

.border_orange {
  border: solid 1.5px #ff8b3d;
}

.bg_yellow {
  background-color: #ffc835;
}

.border_yellow {
  border: solid 1.5px #ffc835;
}
</style>
