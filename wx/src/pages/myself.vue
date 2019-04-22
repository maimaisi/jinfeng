<template>
  <section style="height: 100%;background-color: #dff1fa;">
    <div class="head_self">
      <div class="headImg">
        <img :src="wxUserInfo.headimgurl">
      </div>
      <div class="baseInfo">
        <div class="info_name">{{wxUserInfo.nickname}}</div>
        <!-- <div class="info_score">积分:---</div> -->
      </div>
    </div>
    <div class="middle_ad">
      <img src="../assets/images/myInfo_bg.png" style="width:6.5rem;margin-top: 0.8rem;">
    </div>
    <div class="bottom_area">
      <ul>
        <li v-on:click="goMyInfo()">
          <span class="icon"></span>我的资料
          <span
            v-if="showFirst"
            style="color:red;margin-left: 1.3rem;height: 1rem;display:inline-block;"
          >首次登录需完善个人资料</span>
        </li>
        <li v-on:click="goMyFeedBack()">
          <span class="icon"></span>我的反馈
          <span
            style="color:red;margin-left: 2.3rem;height: 1rem;display:inline-block;"
            v-on:click.stop="wantToFeedback()"
          >我要反馈</span>
        </li>
        <li v-on:click="goMyDemand()">
          <span class="icon"></span>我的需求
        </li>
        <li v-on:click="goMyService()">
          <span class="icon"></span>我的服务
        </li>
      </ul>
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
      showFirst: false,
      wxUserInfo: {},
      openid: "",
      index: "myself"
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.openid = sessionStorage.getItem("OID") || "";
      Promise.all([
        this.$axios.http({
          url: "/jfqwmsj/wx/getWxUserInfo",
          data: {
            openid: this.openid
          }
        }),
        this.$axios.http({
          url: "/jfqwmsj/api/user/select",
          data: {
            openid: this.openid
          }
        })
      ])
        .then(res => {
          this.wxUserInfo = JSON.parse(res[0].result);
          this.userInfo = res[1].result;
          if (this.userInfo.org_code == "") {
            this.showFirst = true;
          }
          console.log(this.wxUserInfo);
        })
        .catch(err => {
          this.$toast(err);
        });
    },
    goMyInfo() {
      if (this.showFirst) {
        this.$router.push({
          name: "modifyInfo"
        });
      } else {
        this.$router.push({
          name: "myInfo"
        });
      }
    },
    goMyFeedBack() {
      this.$router.push({
        name: "myFeedback"
      });
    },
    wantToFeedback() {
      this.$router.push({
        name: "feedback"
      });
    },
    goMyDemand() {
      this.$router.push({
        name: "myDemand"
      });
    },
    goMyService() {
      this.$router.push({
        name: "myService"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.head_self {
  width: 100%;
  height: 4rem;
  background-color: #339ff1;
  background-size: 100%;
  overflow: hidden;
}

.headImg {
  // background-color: pink;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  margin-top: 0.95rem;
  margin-left: -3.54rem;
  display: inline-block;
  overflow: hidden;
  img {
    width: 100%;
  }
}

.baseInfo {
  display: inline-block;
  color: white;
  text-align: left;
}

.baseInfo .info_name {
  font-size: 0.42rem;
  position: relative;
  top: -0.3rem;
  margin-left: 0.1rem;
}

.baseInfo .info_score {
  font-size: 0.28rem;
  position: relative;
  top: -0.2rem;
  margin-left: 0.1rem;
  margin-top: 0.18rem;
}

.middle_ad {
  width: 6.9rem;
  height: 2.22rem;
  background-color: white;
  position: absolute;
  top: 2.7rem;
  left: 0.3rem;
  border: 1px solid white;
  box-shadow: 1px 2px 3px #eee;
  border-radius: 0.3rem;
}

.bottom_area {
  padding-top: 1rem;
}

.bottom_area ul {
  margin-top: 0.5rem;
}

.bottom_area ul li {
  height: 1rem;
  line-height: 1rem;
  text-align: left;
  padding-left: 1.22rem;
  background-color: white;
  border-bottom: 1px solid #dff1fa;
  position: relative;
}

.bottom_area .icon {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  left: 0.5rem;
  top: 0.25rem;
}

.bottom_area li:nth-child(1) > .icon {
  background: url("../assets/images/my0.png") no-repeat;
  background-size: 100%;
}

.bottom_area li:nth-child(2) > .icon {
  background: url("../assets/images/my1.png") no-repeat;
  background-size: 100%;
}

.bottom_area li:nth-child(3) > .icon {
  background: url("../assets/images/my2.png") no-repeat;
  background-size: 100%;
}

.bottom_area li:nth-child(4) > .icon {
  background: url("../assets/images/my3.png") no-repeat;
  background-size: 100%;
}

.bottom_area li:after {
  content: ">";
  float: right;
  color: #999999;
  margin-right: 0.46rem;
}
</style>
