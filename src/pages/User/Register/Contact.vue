<template>
  <div>
    <el-main>Endereço Pessoais</el-main>
    <el-row>
      <el-form-item label="CEP:" prop="zipcode_personal">
        <el-input placeholder="Digite seu CEP" v-model="form.zipcode_personal" :disabled="disabled"></el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Logradouro:" prop="street_personal">
        <el-input placeholder="Rua ou Avenida" v-model="form.street_personal" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Número:" prop="number_personal">
        <el-input placeholder="Número" v-model="form.number_personal" :disabled="disabled"></el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Bairro:" prop="neighborhood_personal">
        <el-input placeholder="Bairro" v-model="form.neighborhood_personal" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Cidade:" prop="city_personal">
        <el-input placeholder="Cidade" v-model="form.city_personal" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Estado:" prop="state_personal">
        <el-select
          size="large"
          placeholder="Selecione um estado"
          v-model="form.state_personal"
          :disabled="disabled"
        >
          <el-option
            v-for="option in selects.states"
            :value="option.value"
            :label="option.label"
            :key="option.label"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Complemento:" prop="additional_personal">
        <el-input
          placeholder="Insira algum complemento"
          v-model="form.additional_personal"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="Telefone:" prop="phone_personal">
        <el-input
          placeholder="Insira um celular"
          v-model="form.phone_personal"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
    </el-row>

    <el-divider></el-divider>
    <el-main>Endereço Comercial</el-main>

    <el-row>
      <el-form-item label="CEP:" prop="zipcode_business">
        <el-input placeholder="Digite seu CEP" v-model="form.zipcode_business" :disabled="disabled"></el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Logradouro:" prop="street_business">
        <el-input placeholder="Rua ou Avenida" v-model="form.street_business" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Número:" prop="number_business">
        <el-input placeholder="Número" v-model="form.number_business" :disabled="disabled"></el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Bairro:" prop="neighborhood_business">
        <el-input placeholder="Bairro" v-model="form.neighborhood_business" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Cidade:" prop="city_business">
        <el-input placeholder="Cidade" v-model="form.city_business" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Estado:" prop="state_business">
        <el-select
          size="large"
          placeholder="Selecione um estado"
          v-model="form.state_business"
          :disabled="disabled"
        >
          <el-option
            v-for="option in selects.states"
            :value="option.value"
            :label="option.label"
            :key="option.label"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Complemento:" prop="additional_business">
        <el-input
          placeholder="Insira algum complemento"
          v-model="form.additional_business"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="Telefone:" prop="phone_business">
        <el-input
          placeholder="Telefone comercial"
          v-model="form.phone_business"
          :disabled="disabled"
        ></el-input>
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
        street_personal: "",
        number_personal: "",
        neighborhood_personal: "",
        city_personal: "",
        state_personal: "SP",
        additional_personal: "",
        zipcode_personal: "",
        phone_personal: "",
        street_business: "",
        number_business: "",
        neighborhood_business: "",
        city_business: "",
        state_business: "SP",
        additional_business: "",
        zipcode_business: "",
        phone_business: ""
      },
      selects: {}
    };
  },
  computed: {
    ...mapGetters(["idRegister"])
  },
  async mounted() {
    try {
      const contact = await registerService.getContact(this.idRegister);

      this.form = { ...contact };
    } catch (ex) {
      console.error(ex.message);
    }
  }
};
</script>
<style>
</style>
