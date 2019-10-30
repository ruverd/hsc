<template>
  <el-form :label-position="labelPosition" :inline="true" label-width="150px">
    <personal></personal>
    <el-divider></el-divider>
    <contact></contact>
    <el-divider></el-divider>
    <speciality></speciality>
    <el-divider></el-divider>
    <vehicle></vehicle>
    <el-divider></el-divider>
    <payment></payment>
    <el-divider></el-divider>
    <file></file>
    <el-divider v-if="userProfile === 2"></el-divider>
    <action v-on="$listeners"></action>
    <!-- <action @dialog-closed="dialogClosed"></action> -->
  </el-form>
</template>

<script>
import Personal from "./Personal";
import Contact from "./Contact";
import Speciality from "./Speciality";
import Vehicle from "./Vehicle";
import Payment from "./Payment";
import File from "./File";
import Action from "./Action";
import { mapGetters } from "vuex";

export default {
  components: {
    Personal,
    Contact,
    Speciality,
    Vehicle,
    Payment,
    File,
    Action
  },
  data() {
    return {
      labelPosition: "right"
    };
  },
  computed: {
    ...mapGetters(["userProfile"])
  }
};
</script>
<style>
</style>
