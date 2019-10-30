<template>
  <div>
    <el-main>Dados Pessoais</el-main>
    <el-row>
      <el-form-item label="Nome:">
        <el-input v-model="form.name" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Nascimento:">
        <el-date-picker
          v-model="form.dob"
          type="date"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          :disabled="disabled"
        ></el-date-picker>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Sexo:">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1" :disabled="disabled">Masculino</el-radio>
          <el-radio :label="2" :disabled="disabled">Feminino</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Estado Civil:">
        <el-radio-group v-model="form.married">
          <el-radio :label="1" :disabled="disabled">Casado</el-radio>
          <el-radio :label="2" :disabled="disabled">Solteiro</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>

    <el-divider></el-divider>
    <el-main>Documentos Pessoais</el-main>

    <el-row>
      <el-form-item label="CPF:">
        <el-input v-model="form.cpf" :disabled="disabled"></el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="RG:">
        <el-input v-model="form.rg" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Emissor RG:">
        <el-input v-model="form.rg_emitter" :disabled="disabled"></el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="CRM:">
        <el-input v-model="form.crm" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Emissor CRM:">
        <el-input v-model="form.crm_emitter" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Data CRM:">
        <el-date-picker
          v-model="form.date_crm"
          type="date"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          :disabled="disabled"
        ></el-date-picker>
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
      labelPosition: "right",
      disabled: true,
      form: {
        name: "",
        gender: 1,
        married: 1,
        dob: "",
        cpf: "",
        rg: "",
        rg_emitter: "",
        crm: "",
        crm_emitter: "",
        date_crm: ""
      }
    };
  },
  computed: {
    ...mapGetters(["idRegister"])
  },
  async mounted() {
    try {
      const personal = await registerService.getPersonal(this.idRegister);
      const document = await registerService.getDocument(this.idRegister);

      this.form = {
        ...document,
        ...personal,
        dob: new Date(`${personal.dob} 00:00:00`),
        date_crm:
          typeof document !== "undefined"
            ? new Date(`${document.date_crm} 00:00:00`)
            : ""
      };
    } catch (ex) {
      console.error(ex.message);
    }
  }
};
</script>
<style>
</style>
