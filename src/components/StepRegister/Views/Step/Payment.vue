<template>
  <el-form
    ref="form"
    :label-position="labelPosition"
    :inline="true"
    label-width="150px"
    :model="form"
    :rules="rules"
  >
    <el-row>
      <el-form-item label="Contrato:" prop="contract">
        <el-select
          size="large"
          placeholder="Tipo de contrato"
          v-model="form.contract"
          :disabled="disabled"
        >
          <el-option
            v-for="option in selects.contracts"
            :value="option.value"
            :label="option.label"
            :key="option.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Pagamento:" prop="payment">
        <el-select
          size="large"
          placeholder="Selecione a forma"
          v-model="form.payment"
          :disabled="disabled"
        >
          <el-option
            v-for="option in selects.payments"
            :value="option.value"
            :label="option.label"
            :key="option.label"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Banco:" prop="bank">
        <el-select
          size="large"
          placeholder="Selecione o banco"
          v-model="form.bank"
          :disabled="disabled"
        >
          <el-option
            v-for="option in selects.banks"
            :value="option.value"
            :label="option.label"
            :key="option.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Agencia:" prop="agency">
        <el-input
          placeholder="Código da agencia"
          v-model="form.agency"
          v-mask="['####', '####-#', '####-##']"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="Conta:" prop="account">
        <el-input
          placeholder="Código da agencia"
          v-model="form.account"
          v-mask="['#####-#', '######-#', '#######-#', '########-#', '#########-#', '###########-#']"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Tem INSS?" prop="has_inss">
        <el-radio-group v-model="form.has_inss">
          <el-radio :label="1" :disabled="disabled">Sim</el-radio>
          <el-radio :label="2" :disabled="disabled">Não</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="INSS:" prop="inss">
        <el-input
          placeholder="Código do INSS"
          v-model="form.inss"
          v-mask="'###.###.###-#'"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="PIS:" prop="pis">
        <el-input
          placeholder="Código do PIS"
          v-model="form.pis"
          v-mask="'##############'"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script>
import { Input, Radio, Select, Option } from "element-ui";
import { registerService } from "src/services/register";
import { mapGetters } from "vuex";

export default {
  components: {
    [Input.name]: Input,
    [Radio.name]: Radio,
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      labelPosition: "right",
      disabled: false,
      form: {
        contract: "",
        payment: "",
        bank: "",
        agency: "",
        account: "",
        has_inss: 0,
        inss: "",
        pis: ""
      },
      rules: {
        contract: [
          {
            required: true,
            message: "O campo contrato é obrigatório",
            trigger: "blur"
          }
        ],
        payment: [
          {
            required: true,
            message: "O campo tipo de pagamento é obrigatório",
            trigger: "blur"
          }
        ]
      },
      selects: {
        states: [{ value: "SP", label: "São Paulo" }],
        contracts: [
          { value: "Autônomo", label: "Autônomo" },
          { value: "Jurídico", label: "Jurídico" }
        ],
        payments: [
          { value: "Cheque nominal", label: "Cheque nominal" },
          { value: "Deposito em conta", label: "Deposito em conta" }
        ],
        banks: [
          { value: "Banco Bradesco (237)", label: "Banco Bradesco (237)" },
          { value: "Banco do Brasil (001)", label: "Banco do Brasil (001)" },
          { value: "Banco Santander (033)", label: "Banco Santander (033)" },
          {
            value: "Caixa Econômica Federal (104)",
            label: "Caixa Econômica Federal (104)"
          },
          { value: "Itaú Unibanco (341)", label: "Itaú Unibanco (341)" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userLogged"])
  },
  methods: {
    handleSave() {
      try {
        return registerService.savePayment(
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
      const payment = await registerService.getPayment(this.userLogged.id);

      this.form = { ...payment };
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
