<template>
  <el-form ref="form" :label-position="labelPosition" :inline="true" label-width="150px" :model="form" :rules="rules">

    <el-main>Dados Pessoais</el-main>

    <el-row>
      <el-form-item label="Nome:">
        <el-input
          v-model="form.name"
          :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="Data de Nascimento:" prop="dob">
        <el-date-picker
          v-model="form.dob"
          type="date"
          format="dd/MM/yyyy"
          v-mask="'##/##/####'"
          value-format="yyyy-MM-dd"
          placeholder="Selecione a data">
        </el-date-picker>
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
          v-mask="'###.###.###-##'">
        </el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="RG:" prop="rg">
        <el-input
          placeholder="Insira o RG"
          v-model="form.rg"
          autocomplete="off"
          v-mask="'##########'">
        </el-input>
      </el-form-item>
      <el-form-item label="Emissor RG:" prop="rg_emitter">
        <el-input
          placeholder="Insira o emissor"
          v-model="form.rg_emitter">
        </el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="CRM:" prop="crm">
        <el-input
          placeholder="Insira o CRM"
          v-model="form.crm"
          v-mask="'##########'">
        </el-input>
      </el-form-item>
      <el-form-item label="Emissor CRM:" prop="crm_emitter">
        <el-input
          placeholder="Insira o emissor"
          v-model="form.crm_emitter">
        </el-input>
      </el-form-item>
      <el-form-item label="Data CRM:" prop="date_crm">
        <el-date-picker
          v-model="form.date_crm"
          type="date"
          format="dd/MM/yyyy"
          v-mask="'##/##/####'"
          placeholder="Selecione a data"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
    </el-row>

  </el-form>
</template>
<script>
  import {DatePicker, Input, Radio, Divider} from 'element-ui'
  import { registerService }  from 'src/services/register'
  import { mapGetters } from 'vuex'
  import moment from 'moment'

  export default {
    components: {
      [DatePicker.name]: DatePicker,
      [Input.name]: Input,
      [Radio.name]: Radio,
      [Divider.name]: Divider
    },
    data () {
      return {
        labelPosition: 'right',
        form: {
          name: '',
          gender: 1,
          married: 1,
          dob: '',
          cpf: '',
          rg: '',
          rg_emitter: '',
          crm: '',
          crm_emitter: '',
          date_crm: ''
        },
        rules: {
          dob: [
            { required: true, message: 'O campo Data de Nascimento é obrigatório', trigger: 'blur' }
          ],
          cpf: [
            { required: true, message: 'O campo CPF é obrigatório', trigger: 'blur' }
          ],
          rg: [
            { required: true, message: 'O campo RG é obrigatório', trigger: 'blur' }
          ],
          rg_emitter: [
            { required: true, message: 'O campo RG - Emissor é obrigatório', trigger: 'blur' }
          ],
          crm: [
            { required: true, message: 'O campo CRM é obrigatório', trigger: 'blur' }
          ],
          crm_emitter: [
            { required: true, message: 'O campo CRM - Emissor é obrigatório', trigger: 'blur' }
          ],
          date_crm: [
            { required: true, message: 'O campo CRM - Data é obrigatório', trigger: 'blur' }
          ]
        },
      }
    },
    computed: {
      ...mapGetters([
        'userLogged'
      ])
    },
    methods: {
      save () {
        const {dob: dobToConvert, date_crm: date_crmToConvert, ...form } = this.form
        const dob = moment(new Date(dobToConvert)).format("YYYY-MM-DD");
        const date_crm = moment(new Date(date_crmToConvert)).format("YYYY-MM-DD");
        
        registerService.savePersonal({ ...form, dob, date_crm }, this.userLogged.id)
          .catch(e => {
            console.error(e.message); 
          })
      },
      validate() {
        const validation = new Promise((resolve, reject) => {
          this.$refs.form.validate(valid => {
            this.$emit("on-validate", valid, this.form)
            resolve(valid)
          })
        })
        validation.then(valid => valid && this.save())

        return validation
      }
    },
    async mounted () {
      try{
        const personal = await registerService.getPersonal(this.userLogged.id)
        const document = await registerService.getDocument(this.userLogged.id)

        this.form = {
          ...document,
          ...personal,
          dob: new Date(`${personal.dob} 00:00:00`),
          date_crm: (typeof document !== 'undefined') ? new Date(`${document.date_crm} 00:00:00`) : ''
        }  
      } catch(ex){
        console.error(ex.message)
      }
    }
  }
</script>
<style>

</style>
