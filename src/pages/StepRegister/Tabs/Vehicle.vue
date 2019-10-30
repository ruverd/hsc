<template>
  <el-form
    ref="form"
    :label-position="labelPosition"
    :inline="true"
    label-width="150px"
    :model="form"
    :rules="rules"
  >
    <el-main>
      Informações do veículo para estacionamento!
      <b>(Opcional)</b>
    </el-main>

    <el-row>
      <el-form-item label="Marca:" prop="brand">
        <el-input placeholder="Digite a marca" v-model="form.brand" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Modelo:" prop="model">
        <el-input placeholder="Digite o modelo" v-model="form.model" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Ano:" prop="year">
        <el-input
          placeholder="Digite o ano"
          v-model="form.year"
          v-mask="'####'"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Cor:" prop="color">
        <el-input placeholder="Digite a cor" v-model="form.color" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Renavam:" prop="renavam">
        <el-input
          placeholder="Digite o renavam"
          v-model="form.renavam"
          v-mask="'##########-#'"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="Placa:" prop="tag">
        <el-input
          placeholder="Digite a placa"
          v-model="form.tag"
          v-mask="'AAA-####'"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script>
import { registerService } from "src/services/register";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      labelPosition: "right",
      disabled: false,
      form: {
        brand: "",
        model: "",
        year: "",
        color: "",
        renavam: "",
        tag: ""
      },
      rules: {}
    };
  },
  computed: {
    ...mapGetters(["userLogged"])
  },
  methods: {
    async handleSave() {
      try {
        return await registerService.saveVehicle(
          { ...this.form },
          this.userLogged.id
        );
      } catch (ex) {
        console.error(ex.message);
      }
    },
    validate() {
      const validation = new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          this.$emit("on-validate", valid, this.form);
          resolve(valid);
        });
      });
      validation.then(valid => valid && this.handleSave());

      return validation;
    }
  },
  async mounted() {
    try {
      const vehicle = await registerService.getVehicle(this.userLogged.id);

      this.form = { ...vehicle };
      this.disabled =
        this.userLogged.user_status_id === 1 ||
        this.userLogged.user_status_id === 4
          ? false
          : true;
    } catch (ex) {
      console.error(ex.message);
    }
  }
};
</script>
<style>
</style>
