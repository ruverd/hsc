<template>
  <el-dialog
    title="Aprovação de Cadastro Médico"
    width="90%"
    top="7vh"
    :visible.sync="dialogVisible"
  >
    <el-form
      ref="form"
      :label-position="labelPosition"
      :inline="true"
      label-width="150px"
      :model="form"
    >
      <el-main>Dados Pessoais</el-main>

      <el-row>
        <el-form-item label="Nome:">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Nascimento:">
          <el-date-picker
            v-model="form.dob"
            type="date"
            format="dd/MM/yyyy"
            v-mask="'##/##/####'"
            value-format="yyyy-MM-dd"
            placeholder="Selecione a data"
          ></el-date-picker>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="Sexo:">
          <el-radio-group v-model="form.gender" prop="gender">
            <el-radio :label="1">Masculino</el-radio>
            <el-radio :label="2">Feminino</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Estado Civil:">
          <el-radio-group v-model="form.married" prop="married">
            <el-radio :label="1">Casado</el-radio>
            <el-radio :label="2">Solteiro</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>

      <el-divider></el-divider>
      <el-main>Documentos Pessoais</el-main>

      <el-row>
        <el-form-item label="CPF:" prop="cpf">
          <el-input
            placeholder="Insira o CPF"
            v-model="form.cpf"
            autocomplete="off"
            v-mask="'###.###.###-##'"
          ></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="RG:" prop="rg">
          <el-input
            placeholder="Insira o RG"
            v-model="form.rg"
            autocomplete="off"
            v-mask="'##########'"
          ></el-input>
        </el-form-item>
        <el-form-item label="Emissor RG:" prop="rg_emitter">
          <el-input placeholder="Insira o emissor" v-model="form.rg_emitter"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="CRM:" prop="crm">
          <el-input placeholder="Insira o CRM" v-model="form.crm" v-mask="'##########'"></el-input>
        </el-form-item>
        <el-form-item label="Emissor CRM:" prop="crm_emitter">
          <el-input placeholder="Insira o emissor" v-model="form.crm_emitter"></el-input>
        </el-form-item>
        <el-form-item label="Data CRM:" prop="date_crm">
          <el-date-picker
            v-model="form.date_crm"
            type="date"
            format="dd/MM/yyyy"
            v-mask="'##/##/####'"
            placeholder="Selecione a data"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-row>

      <el-divider></el-divider>
      <el-main>Endereço Pessoais</el-main>

      <el-row>
        <el-form-item label="CEP:" prop="zipcode_personal">
          <el-input
            placeholder="Digite seu CEP"
            v-model="form.zipcode_personal"
            v-mask="'#####-###'"
          ></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="Logradouro:" prop="street_personal">
          <el-input placeholder="Rua ou Avenida" v-model="form.street_personal"></el-input>
        </el-form-item>
        <el-form-item label="Número:" prop="number_personal">
          <el-input placeholder="Número" v-model="form.number_personal"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="Bairro:" prop="neighborhood_personal">
          <el-input placeholder="Bairro" v-model="form.neighborhood_personal"></el-input>
        </el-form-item>
        <el-form-item label="Cidade:" prop="city_personal">
          <el-input placeholder="Cidade" v-model="form.city_personal"></el-input>
        </el-form-item>
        <el-form-item label="Estado:" prop="state_personal">
          <el-select size="large" placeholder="Selecione um estado" v-model="form.state_personal">
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
          <el-input placeholder="Insira algum complemento" v-model="form.additional_personal"></el-input>
        </el-form-item>
        <el-form-item label="Telefone:" prop="phone_personal">
          <el-input
            placeholder="Insira um celular"
            v-mask="['(##) ####-####', '(##) #####-####']"
            v-model="form.phone_personal"
          ></el-input>
        </el-form-item>
      </el-row>

      <el-divider></el-divider>
      <el-main>Endereço Comercial</el-main>

      <el-row>
        <el-form-item label="CEP:" prop="zipcode_business">
          <el-input
            placeholder="Digite seu CEP"
            v-model="form.zipcode_business"
            v-mask="'#####-###'"
          ></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="Logradouro:" prop="street_business">
          <el-input placeholder="Rua ou Avenida" v-model="form.street_business"></el-input>
        </el-form-item>
        <el-form-item label="Número:" prop="number_business">
          <el-input placeholder="Número" v-model="form.number_business"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="Bairro:" prop="neighborhood_business">
          <el-input placeholder="Bairro" v-model="form.neighborhood_business"></el-input>
        </el-form-item>
        <el-form-item label="Cidade:" prop="city_business">
          <el-input placeholder="Cidade" v-model="form.city_business"></el-input>
        </el-form-item>
        <el-form-item label="Estado:" prop="state_business">
          <el-select size="large" placeholder="Selecione um estado" v-model="form.state_business">
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
          <el-input placeholder="Insira algum complemento" v-model="form.additional_business"></el-input>
        </el-form-item>
        <el-form-item label="Telefone:" prop="phone_business">
          <el-input
            placeholder="Telefone comercial"
            v-mask="['(##) ####-####', '(##) #####-####']"
            v-model="form.phone_business"
          ></el-input>
        </el-form-item>
      </el-row>

      <el-divider></el-divider>
      <el-main>Especialidades</el-main>

      <el-row>
        <el-table :data="tableDataSpeciality" header-row-class-name="text-primary">
          <el-table-column prop="name" label="Nome"></el-table-column>
          <el-table-column prop="status" label="Status"></el-table-column>
          <el-table-column prop="comment" label="Comentário"></el-table-column>
          <el-table-column class-name="action-buttons td-actions" align="right" label="Ações">
            <template slot-scope="props">
              <p-button type="info" size="sm" icon @click="handleView(props.$index, props.row)">
                <i class="nc-icon nc-zoom-split"></i>
              </p-button>
              <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                <i class="fa fa-times"></i>
              </p-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <el-divider></el-divider>
      <el-main>Veículo para estacionamento</el-main>

      <el-row>
        <el-form-item label="Marca:" prop="brand">
          <el-input placeholder="Digite a marca" v-model="form.brand"></el-input>
        </el-form-item>
        <el-form-item label="Modelo:" prop="model">
          <el-input placeholder="Digite o modelo" v-model="form.model"></el-input>
        </el-form-item>
        <el-form-item label="Ano:" prop="year">
          <el-input placeholder="Digite o ano" v-model="form.year" v-mask="'####'"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="Cor:" prop="color">
          <el-input placeholder="Digite a cor" v-model="form.color"></el-input>
        </el-form-item>
        <el-form-item label="Renavam:" prop="renavam">
          <el-input placeholder="Digite o renavam" v-model="form.renavam" v-mask="'##########-#'"></el-input>
        </el-form-item>
        <el-form-item label="Placa:" prop="tag">
          <el-input placeholder="Digite a placa" v-model="form.tag" v-mask="'AAA-####'"></el-input>
        </el-form-item>
      </el-row>

      <el-divider></el-divider>
      <el-main>Dados de pagamento</el-main>

      <el-row>
        <el-form-item label="Contrato:" prop="contract">
          <el-select size="large" placeholder="Tipo de contrato" v-model="form.contract">
            <el-option
              v-for="option in selects.contracts"
              :value="option.value"
              :label="option.label"
              :key="option.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Pagamento:" prop="payment">
          <el-select size="large" placeholder="Selecione a forma" v-model="form.payment">
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
          <el-select size="large" placeholder="Selecione o banco" v-model="form.bank">
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
          ></el-input>
        </el-form-item>
        <el-form-item label="Conta:" prop="account">
          <el-input
            placeholder="Código da agencia"
            v-model="form.account"
            v-mask="['#####-#', '######-#', '#######-#', '########-#', '#########-#', '###########-#']"
          ></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="Tem INSS?" prop="has_inss">
          <el-radio-group v-model="form.has_inss">
            <el-radio :label="1">Sim</el-radio>
            <el-radio :label="2">Não</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="INSS:" prop="inss">
          <el-input placeholder="Código do INSS" v-model="form.inss" v-mask="'###.###.###-#'"></el-input>
        </el-form-item>
        <el-form-item label="PIS:" prop="pis">
          <el-input placeholder="Código do PIS" v-model="form.pis" v-mask="'##############'"></el-input>
        </el-form-item>
      </el-row>

      <el-divider></el-divider>
      <el-main>Documentos Anexados</el-main>

      <el-row>
        <el-table :data="tableDataDocument" header-row-class-name="text-primary">
          <el-table-column prop="name" label="Nome"></el-table-column>
          <el-table-column prop="status" label="Status"></el-table-column>
          <el-table-column class-name="action-buttons td-actions" align="right" label="Ações">
            <template slot-scope="props">
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
                <el-button size="small" type="plain">Upload</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <el-divider></el-divider>
      <el-main>Aprovação de Cadastro</el-main>

      <el-row>
        <el-form-item label="Comentário:" prop="comment">
          <el-input
            type="textarea"
            size="large"
            class="textComment"
            :rows="10"
            :columns="90"
            placeholder="Insira seu comentário..."
            v-model="form.comment"
          ></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="dialogVisible = false">Aprovar</el-button>
      <el-button type="danger" @click="dialogVisible = false">Reprovar</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { userService } from "src/services/user";
import {
  Table,
  TableColumn,
  Select,
  Option,
  Dialog,
  Divider,
  DatePicker,
  Input,
  Radio
} from "element-ui";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Select.name]: Select,
    [Option.name]: Option,
    [Dialog.name]: Dialog,
    [Divider.name]: Divider,
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Radio.name]: Radio
  },
  props: ["show"],
  data() {
    return {
      dialogVisible: this.show,
      labelPosition: "right",
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
        date_crm: "",
        street_personal: "",
        number_personal: "",
        neighborhood_personal: "",
        city_personal: "",
        state_personal: "São Paulo",
        additional_personal: "",
        zipcode_personal: "",
        phone_personal: "",
        street_business: "",
        number_business: "",
        neighborhood_business: "",
        city_business: "",
        state_business: "São Paulo",
        additional_business: "",
        zipcode_business: "",
        phone_business: "",
        brand: "",
        model: "",
        year: "",
        color: "",
        renavam: "",
        tag: "",
        contract: "",
        payment: "",
        bank: "",
        agency: "",
        account: "",
        has_inss: 0,
        inss: "",
        pis: ""
      },
      tableDataSpeciality: [],
      tableDataDocument: [],
      selects: {
        states: [{ value: "SP", label: "São Paulo" }]
      }
    };
  },
  mounted() {},
  computed: {
    ...mapState(["auth"]),
    ...mapGetters(["statusUser"])
  },
  methods: {
    updateShowDialog(isVisible) {
      if (isVisible) return false;
      this.$emit("update:show", false);
    }
  }
};
</script>
<style lang="scss">
.textComment {
  width: 300%;
}
</style>
