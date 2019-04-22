<template>
  <section>
    <div class="head">
      <div class="head_bottom box-row">
        <span class="font_color_huangse">活动简报：</span>
        <span class="head_bottom_content">金凤区丰登镇</span>
      </div>
    </div>
    <div class="content">
      <div v-for="(item,index) in dataList" :key="index" class="cell box-column align-start">
        <span class="cell-title">{{item.name}}</span>
        <span class="cell-content">
          <span
            style="display: inline-block;
    width: 15vw;
    text-align: center;
    margin-right: 2vw;
    font-size: 0.25rem;
    color: white;
    background-color: #fc6621;"
          >责任单位</span>
          {{item.org_names}}
        </span>
        <div class="cell-foot">
          <button class="cell-foot-button" @click="jumpTo(item.id)">预约</button>
        </div>
      </div>
      <div style="height:1.8rem;"></div>
    </div>
    <navBarBottom :index="index"></navBarBottom>
  </section>
</template>
<script>
import navBarBottom from "../components/nav_bar_bottom.vue";
export default {
  name: "reservationList",
  components: {
    navBarBottom
  },
  data() {
    return {
      dataList: [],
      index: "",
      INDEX_TYPE: ""
    };
  },
  created() {
    this.INDEX_TYPE = JSON.parse(sessionStorage.getItem("INDEX_TYPE"));
    console.log(this.INDEX_TYPE);

    this.index = this.INDEX_TYPE.index || this.$route.params.index;
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .http({
          url: "/jfqwmsj/api/xj/select",
          data: { type: this.INDEX_TYPE.type }
        })
        .then(res => {
          this.dataList = res.result;
          console.log(res);
        })
        .catch(err => {
          this.$toast(err);
        });
    },
    jumpTo(id) {
      this.$router.push({
        name: "demand",
        params: {
          ID: id
        }
      });
      sessionStorage.setItem("XJ_ID", id);
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
  height: 9.5rem;
  overflow: scroll;
}

.content::-webkit-scrollbar {
  display: none;
}

.cell {
  background-color: #cae8f7;
  min-height: 2.1rem;
  border: solid 2.5px #ffffff;
  box-shadow: 0 0 5px #cae8f7;
  padding: 0.2rem 0.24rem;
  margin-bottom: 0.15rem;
  border-radius: 0.2rem;
}

.cell-title {
  // font-size: 0.42rem;
  font-size: 0.35rem;
  color: #084da0;
  font-weight: 400;
  text-align: left;
}

.cell-content {
  min-height: 1.1rem;
  // font-size: 0.38rem;
  font-size: 0.25rem;
  text-align: left;
  line-height: 0.5rem;
  margin-top: 0.14rem;
  font-weight: 400;
}

.cell-foot {
  width: 100%;
  text-align: right;
}

.cell-foot-button {
  width: 1.24rem;
  height: 0.5rem;
  font-size: 0.34rem;
  background-color: #1476eb;
  color: #ffffff;
  border-style: none;
  border-radius: 0.1rem;
  box-shadow: 1px 1px 3px #3a3a3a;
}
</style>