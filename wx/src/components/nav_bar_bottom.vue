<template>
  <section class="nav_bar box-row justify-space-around align-center">
    <div class="item" :class="{'active':index=='index'}" @click="jumpTo('index')">
      <span class="item_img item_img_index_gary"></span>
      <span>首页</span>
    </div>
    <div class="item" :class="{'active':index=='demandIndex'}" @click="jumpTo('demandIndex')">
      <span class="item_img item_img_demand_gary"></span>
      <span>我有需求</span>
    </div>
    <div class="item" :class="{'active':index=='service'}" @click="jumpTo('service')">
      <span class="item_img item_img_server_gary"></span>
      <span>我想服务</span>
    </div>
    <div class="item" :class="{'active':index=='myself'}" @click="jumpTo('myself')">
      <span class="item_img item_img_my_gary"></span>
      <span>我的</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "nav_bar_bottom",
  props: {
    index: {
      type: String,
      default() {
        return "index";
      }
    }
  },
  data() {
    return {
      indexPatch: "index",
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    jumpTo(name) {
      this.$router.push({
        name: name
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/style/mixins/flex.scss";

.nav_bar {
  position: fixed;
  bottom: 0;
  border-top: solid 1.5px #36c2ef;
  width: 100%;
  height: 1.07rem;
  background-color: #ffffff;
}

.item {
  color: #b0bace;
  @include display-flex();
  @include flex-direction(column);
  @include justify-content(center);
  @include align-items(center);
}

.active {
  color: #3173f5;
}

.item_img {
  width: 0.5rem;
  height: 0.5rem;
  margin-bottom: 0.1rem;
}

.item_img_index_gary {
  background: url("../assets/images/nav_bar_index_gary.png") no-repeat;
  background-size: 100%;
}

.active .item_img_index_gary {
  background: url("../assets/images/nav_bar_inedx.png") no-repeat;
  background-size: 100%;
}

.item_img_demand_gary {
  background: url("../assets/images/nav_bar_demand_gary.png") no-repeat;
  background-size: 100%;
}

.active .item_img_demand_gary {
  background: url("../assets/images/nav_bar_demand.png") no-repeat;
  background-size: 100%;
}

.item_img_server_gary {
  background: url("../assets/images/nav_bar_server_gary.png") no-repeat;
  background-size: 100%;
}

.active .item_img_server_gary {
  background: url("../assets/images/nav_bar_server.png") no-repeat;
  background-size: 100%;
}

.item_img_my_gary {
  background: url("../assets/images/nav_bar_my_gary.png") no-repeat;
  background-size: 100%;
}

.active .item_img_my_gary {
  background: url("../assets/images/nav_bar_my.png") no-repeat;
  background-size: 100%;
}
</style>