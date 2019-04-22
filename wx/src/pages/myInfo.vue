<template>
  <section>
    <div class="head">
      <div class="head_bottom box-row">
        <span class="font_color_huangse">活动简报：</span>
        <span class="head_bottom_content">金凤区丰登镇</span>
      </div>
    </div>
    <div class="content">
      <div class="headImg">
        <img :src="wxUserInfo.headimgurl">
      </div>
      <div>
        <div class="cell box-row align-center justify-space-around">
          <span class="left">您的姓名:</span>
          <span class="right">{{userInfo.name}}</span>
        </div>
        <div class="cell box-row align-center justify-space-around">
          <span class="left">联系电话:</span>
          <span class="right">{{userInfo.phone}}</span>
        </div>
        <div class="cell box-row align-center justify-space-around">
          <span class="left">所属街道(镇):</span>
          <span class="right">{{userInfo.org_name_parent}}</span>
        </div>
        <div class="cell box-row align-center justify-space-around">
          <span class="left">所属社区(村):</span>
          <span class="right">{{userInfo.org_name}}</span>
        </div>
      </div>
    </div>
    <div class="submit" @click="jumpTo">修改资料</div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      wxUserInfo: {},
      userInfo: {}
    };
  },
  created() {
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
  methods: {
    jumpTo() {
      this.$router.push({ name: "modifyInfo" });
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
  width: 6.9rem;
  height: 8.22rem;
  background-color: #cae8f7;
  margin: 0.1rem auto 0;
  border-radius: 0.3rem;
  box-shadow: 1px 2px 3px #108eef;
  overflow: hidden;
  font-size: 0.3rem;
  position: relative;
}
.headImg {
  background-color: pink;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  margin: auto;
  margin-top: 0.48rem;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.cell {
  margin-top: 20px;
  font-size: 20px;
}
.left {
  width: 50%;
  text-align: right;
  padding-right: 10px;
}
.right {
  width: 50%;
  text-align: left;
  padding-left: 10px;
}
.submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.08rem;
  line-height: 1.08rem;
  background-color: #108eef;
  font-size: 0.42rem;
  color: white;
}
</style>