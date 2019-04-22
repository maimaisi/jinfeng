<template>
  <section>
    <div class="head">
      <div class="head_bottom box-row">
        <span class="font_color_huangse">活动简报：</span>
        <span class="head_bottom_content">金凤区丰登镇</span>
      </div>
    </div>
    <div class="content">
      <div class="cell box-row align-center justify-space-around">
        <span class="cell-left">您的姓名：</span>
        <input class="cell-right" type="text">
      </div>
      <div class="cell box-row align-center justify-space-around">
        <span class="cell-left">联系电话：</span>
        <input class="cell-right" type="tel">
      </div>
      <div class="cell box-row align-center justify-space-around">
        <span class="cell-left">所属街道（镇）：</span>
        <div class="cell-right" @click="showTownsPicker">{{town}}</div>
      </div>
      <div class="cell box-row align-center justify-space-around">
        <span class="cell-left">所属社区（村）：</span>
        <div class="cell-right" @click="showTownsPicker">{{country}}</div>
      </div>
      <div class="cell box-row align-start justify-space-around">
        <span class="cell-left">您的意见：</span>
        <textarea class="cell-right cell-textarea" maxlength="500"/>
      </div>
    </div>
    <div class="content-foot">立即提交</div>
  </section>
</template>
<script>
import Picker from "better-picker";
export default {
  data() {
    return {
      town: "",
      townsPicker: {},
      townsPickerLastIndex: 0,
      country: "",
      countryPickerLastIndex: 0,
      countryDataList: [],
      townsDataList: [
        {
          text: "良田镇",
          value: "liangtian",
          childList: [
            {
              text: "园子村",
              value: "yuanzi"
            },
            {
              text: "光明村",
              value: "guangming"
            },
            {
              text: "金星村",
              value: "jinxing"
            },
            {
              text: "兴源村",
              value: "xingyuan"
            },
            {
              text: "泾龙村",
              value: "jinglong"
            }
          ]
        },
        {
          text: "丰登镇",
          value: "liangtian",
          childList: [
            {
              text: "西新村",
              value: "xixin"
            },
            {
              text: "西湖村",
              value: "xihu"
            },
            {
              text: "新联村",
              value: "xinlian"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.countryDataList = [...this.townsDataList[0].childList];
    //初始化城镇picker
    this.townsPicker = new Picker({
      data: [this.townsDataList, this.countryDataList],
      selectedIndex: [this.townsPickerLastIndex, this.countryPickerLastIndex]
    });
    this.townsPicker.on("picker.select", (selectedVal, selectedIndex) => {
      this.townsPickerLastIndex = selectedIndex;
      this.town = this.townsDataList[selectedIndex[0]].text;
      this.countryDataList = [
        ...this.townsDataList[selectedIndex[0]].childList
      ];
      this.country = this.countryDataList[selectedIndex[1]].text;
    });
    this.townsPicker.on("picker.change", (index, selectedIndex) => {
      console.log(index, selectedIndex);
      if (index == 1) {
        return;
      }
      //联动处理，重新填装picker数据
      this.townsPicker.refillColumn(
        1,
        this.townsDataList[selectedIndex].childList
      );
    });
  },
  methods: {
    goNews() {
      this.$router.push({
        name: "reservationList",
        params: {
          ID: "123"
        }
      });
    },
    showTownsPicker() {
      this.townsPicker.show(() => {});
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
  margin: 0.2rem auto;
  padding-top: 0.2rem;
  height: 8rem;
  width: 6.5rem;
  background-color: #c0e2f6; // #108eef;
  border-radius: 0.5rem;
}

.cell {
  min-height: 0.58rem;
  margin-top: 0.2rem;
}

.cell-left {
  width: 3rem;
  font-size: 0.3rem;
  font-weight: bold;
  text-align: right;
}

.cell-right {
  width: 4rem;
  height: 0.58rem;
  font-size: 0.3rem;
  border: solid 1px #108eef;
  margin-right: 0.2rem;
  background-color: #ffffff;
}

.cell-textarea {
  height: 4rem;
}

.content-foot {
  height: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #108eef;
  color: #ffffff;
  font-size: 0.42rem;
  line-height: 1rem;
}
</style>