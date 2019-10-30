<template>
  <div>
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
        <el-input placeholder="Digite o ano" v-model="form.year" :disabled="disabled"></el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Cor:" prop="color">
        <el-input placeholder="Digite a cor" v-model="form.color" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Renavam:" prop="renavam">
        <el-input placeholder="Digite o renavam" v-model="form.renavam" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Placa:" prop="tag">
        <el-input placeholder="Digite a placa" v-model="form.tag" :disabled="disabled"></el-input>
      </el-form-item>
    </el-row>
  </div>
</template>
<script>
import { registerService } from "src/services/register";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      disabled: true,
      form: {
        brand: "",
        model: "",
        year: "",
        color: "",
        renavam: "",
        tag: ""
      }
    };
  },
  computed: {
    ...mapGetters(["idRegister"])
  },
  async mounted() {
    try {
      const vehicle = await registerService.getVehicle(this.idRegister);

      this.form = { ...vehicle };
    } catch (ex) {
      console.error(ex.message);
    }
  }
};
</script>
<style>
</style>
