<template>
  <section>
    <div class="head">
      <div class="head_bottom box-row">
        <span class="font_color_huangse">活动简报：</span>
        <span class="head_bottom_content">金凤区丰登镇</span>
      </div>
    </div>
    <div class="content">
      <!-- <div class="cell box-row align-center justify-space-around">
        <span class="cell-left">擅长领域：</span>
        <div class="cell-right box-row align-center justify-space-between" @click="showSkillPicker">
          <span class="ellipsis">{{skill.name}}</span>
          <i class="arrow_down"></i>
        </div>
      </div>-->
      <div class="cell box-row align-center justify-space-around">
        <span class="cell-left">您的姓名：</span>
        <input class="cell-right" type="text" v-model="name">
      </div>
      <div class="cell box-row align-center justify-space-around">
        <span class="cell-left">联系电话：</span>
        <input class="cell-right" type="tel" v-model="phone">
      </div>
      <div class="cell box-row align-center justify-space-around">
        <span class="cell-left">所属街道（镇）：</span>
        <div class="cell-right box-row align-center justify-space-between" @click="showTownsPicker">
          <span class="ellipsis">{{town.name}}</span>
          <i class="arrow_down"></i>
        </div>
      </div>
      <div class="cell box-row align-center justify-space-around">
        <span class="cell-left">所属社区（村）：</span>
        <div class="cell-right box-row align-center justify-space-between" @click="showTownsPicker">
          <span class="ellipsis">{{country.name}}</span>
          <i class="arrow_down"></i>
        </div>
      </div>
      <div class="cell box-row align-start justify-space-around">
        <span class="cell-left">反馈意见：</span>
        <textarea class="cell-right cell-textarea" maxlength="500" v-model="msg"/>
      </div>
      <!-- <span class="foot-text">审核通过后，将进入金凤人才储蓄数据库</span> -->
    </div>
    <div class="content-foot" @click="submit()">立即提交</div>
  </section>
</template>
<script>
import Picker from "better-picker";
export default {
  data() {
    return {
      openid: "",
      skill: {},
      skillPicker: "",
      skillList: [],
      name: "",
      phone: "",
      msg: "",
      town: {},
      townsPicker: {},
      townsPickerLastIndex: 0,
      country: {},
      countryPickerLastIndex: 0,
      countryDataList: [],
      townsDataList: []
    };
  },
  created() {
    this.openid = sessionStorage.getItem("OID") || "";
    Promise.all([
      this.getTownsData(),
      this.getSkillData(),
      this.$axios.http({
        url: "/jfqwmsj/api/user/select",
        data: {
          openid: this.openid
        }
      })
    ])
      .then(res => {
        console.log(res);
        this.skillList = this.formatData(res[1].result);
        this.townsDataList = this.formatData(res[0].result);
        let userInfo = res[2].result;
        if (userInfo.org_code) {
          this.name = userInfo.name;
          this.phone = userInfo.phone;
          this.name = userInfo.name;
          this.town = {
            name: userInfo.org_name_parent,
            code: userInfo.org_code_parent
          };
          this.country = {
            name: userInfo.org_name,
            code: userInfo.org_code
          };
        }
        this.initPicker();
      })
      .catch(err => {
        this.$toast(err);
      });
  },
  methods: {
    initPicker() {
      //初始化领域picker
      this.skillPicker = new Picker({
        data: [this.skillList],
        selectedIndex: [0]
      });
      this.skillPicker.on("picker.select", (selectedVal, selectedIndex) => {
        this.skill = {
          name: this.skillList[selectedIndex].text,
          code: this.skillList[selectedIndex].value
        };
      });
      this.countryDataList = [...this.townsDataList[0].childList];
      //初始化城镇picker
      this.townsPicker = new Picker({
        data: [this.townsDataList, this.countryDataList],
        selectedIndex: [this.townsPickerLastIndex, this.countryPickerLastIndex]
      });
      this.townsPicker.on("picker.select", (selectedVal, selectedIndex) => {
        this.townsPickerLastIndex = selectedIndex;
        this.town = {
          name: this.townsDataList[selectedIndex[0]].text,
          code: this.townsDataList[selectedIndex[0]].value
        };
        this.countryDataList = [
          ...this.townsDataList[selectedIndex[0]].childList
        ];
        this.country = {
          name: this.countryDataList[selectedIndex[1]].text,
          code: this.countryDataList[selectedIndex[1]].value
        };
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
    goNews() {
      this.$router.push({
        name: "reservationList",
        params: {
          ID: "123"
        }
      });
    },
    getTownsData() {
      return this.$axios.http({ url: "/jfqwmsj/api/org/select", data: {} });
    },
    getSkillData() {
      return this.$axios.http({ url: "/jfqwmsj/api/skill/select", data: {} });
    },
    showTownsPicker() {
      this.townsPicker.show(() => {});
    },
    showSkillPicker() {
      this.skillPicker.show(() => {});
    },
    formatData(data) {
      return JSON.parse(
        JSON.stringify(data)
          .replace(/name/g, "text")
          .replace(/id/g, "value")
          .replace(/org_code/g, "value")
      );
    },
    submit() {
      // if (!this.skill.code) {
      //   this.$toast("请选择擅长领域");
      //   return;
      // }
      if (!this.name) {
        this.$toast("请输入您的姓名");
        return;
      }
      if (!this.phone) {
        this.$toast("请输入您的联系电话");
        return;
      }
      if (!this.country.code) {
        this.$toast("请选择街道社区");
        return;
      }
      this.$loading();
      this.$axios
        .http({
          url: "/jfqwmsj/api/fk/insert",
          data: {
            openid: this.openid,
            // skill_id: this.skill.code,
            skill_id: 1, // 默认传1
            name: this.name,
            phone: this.phone,
            org_code: this.country.code,
            msg: this.msg.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>")
          }
        })
        .then(res => {
          this.$loading("close");
          this.$toast("提交成功！");
          this.$router.go(-1);
        })
        .catch(err => {
          this.$loading("close");
          this.$toast(err);
        });
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
  line-height: 0.58rem;
  font-size: 0.3rem;
  border: solid 1px #108eef;
  margin-right: 0.2rem;
  background-color: #ffffff;
  padding-left: 5px;
}
.arrow_down {
  background: url("../assets/images/arrow_down.png") no-repeat;
  width: 0.35rem;
  height: 0.25rem;
  background-size: 100%;
  margin-right: 0.1rem;
}
.cell-textarea {
  height: 3rem;
}
.foot-text {
  display: block;
  font-size: 0.3rem;
  color: #108eef;
  margin-top: 0.1rem;
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