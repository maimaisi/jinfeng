<template>
  <section style="height:100%;background-color:#f5f5f5;">
    <div class="main_area">
      <div class="status" @click="showCreatedList = !showCreatedList">
        受理预约中
        <span class="arrow_right" v-bind:class="{'arrow_down': showCreatedList}"></span>
      </div>
      <div class="item" v-show="showCreatedList">
        <div v-for="(item,index) in createdList" :key="index">
          <div class="question">
            <div>{{index+1}}.{{item.name}}</div>
          </div>
          <div class="answer">
            <div>回复受理:{{item.msg}}</div>
          </div>
        </div>
      </div>
      <div class="status" @click="showAcceptedList = !showAcceptedList">
        已受理
        <span class="arrow_down" v-bind:class="{'arrow_down': showAcceptedList}"></span>
      </div>
      <div class="item" v-show="showAcceptedList">
        <div v-for="(item,index) in acceptedList" :key="index">
          <div class="question">
            <div>{{index+1}}.{{item.name}}</div>
          </div>
          <div class="answer">
            <div>回复受理:{{item.msg}}</div>
          </div>
        </div>
      </div>
      <div class="status" @click="showDistoryList = !showDistoryList">
        已废除
        <span class="arrow_right" v-bind:class="{'arrow_down': showDistoryList}"></span>
      </div>
      <div class="item" v-show="showDistoryList">
        <div v-for="(item,index) in distoryList" :key="index">
          <div class="question">
            <div>{{index+1}}.{{item.name}}</div>
          </div>
          <div class="answer">
            <div>回复受理:{{item.msg}}</div>
          </div>
        </div>
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
      showCreatedList: true,
      createdList: [],
      showAcceptedList: true,
      acceptedList: [],
      showDistoryList: true,
      distoryList: [],
      index: "myDemand",
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {
    this.openid = sessionStorage.getItem("OID") || "";
    this.$axios
      .http({
        url: "/jfqwmsj/api/xq/select",
        data: { openid: this.openid }
      })
      .then(res => {
        console.log(res);
        res.result.forEach(element => {
          if (element.status == 0) {
            this.createdList.push({ ...element });
          } else if (element.status == 1) {
            this.acceptedList.push({ ...element });
          } else if (element.status == 2) {
            this.distoryList.push({ ...element });
          }
        });
      })
      .catch(err => {
        this.$toast(err);
      });
  }
};
</script>
<style lang="scss" scoped>
.main_area {
  padding-bottom: 1.5rem;
}

.item {
  // height: 1rem;
  width: 100%;
  font-size: 0.34rem;
}

.status {
  font-size: 0.34rem;
  text-align: left;
  line-height: 1rem;
  padding-left: 0.6rem;
  background-color: white;
  border: 0.01rem solid #f5f5f5;
}

.question {
  // height: 0.8rem;
  min-height: 0.8rem;
  width: 6.8rem;
  margin: auto;
  background-color: white;
  border: 0.01rem solid #f5f5f5;
}

.question div {
  text-align: left;
  margin-left: 0.5rem;
  line-height: 0.8rem;
}

.answer {
  // height: 0.86rem;
  min-height: 0.86rem;
  width: 6.8rem;
  margin: auto;
  background-color: white;
  border: 0.01rem solid #f5f5f5;
}

.answer div {
  text-align: left;
  margin-left: 0.5rem;
  line-height: 0.8rem;
  color: red;
}

.arrow_right {
  background: url("../assets/images/arrow_right.png") no-repeat;
  width: 0.25rem;
  height: 0.35rem;
  background-size: 100%;
  margin-right: 0.1rem;
  float: right;
  margin-right: 0.65rem;
  margin-top: 0.3rem;
}

.arrow_down {
  background: url("../assets/images/arrow_down.png") no-repeat;
  width: 0.35rem;
  height: 0.25rem;
  background-size: 100%;
  margin-right: 0.1rem;
  float: right;
  margin-right: 0.6rem;
  margin-top: 0.3rem;
}
</style>
