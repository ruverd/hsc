<template>

  <el-form ref="form" :label-position="labelPosition" :inline="true" label-width="150px" :model="form" :rules="rules">

    <el-main>Informações do veículo para estacionamento! <b>(Opcional)</b> </el-main>

    <el-row>
      <el-form-item label="Marca:" prop="brand">
        <el-input
          placeholder="Digite a marca"
          v-model="form.brand">
        </el-input>
      </el-form-item>
      <el-form-item label="Modelo:" prop="model">
        <el-input
          placeholder="Digite o modelo"
          v-model="form.model">
        </el-input>
      </el-form-item>
      <el-form-item label="Ano:" prop="year">
        <el-input
          placeholder="Digite o ano"
          v-model="form.year"
          v-mask="'####'">
        </el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Cor:" prop="color">
        <el-input
          placeholder="Digite a cor"
          v-model="form.color">
        </el-input>
      </el-form-item>
      <el-form-item label="Renavam:" prop="renavam">
        <el-input
          placeholder="Digite o renavam"
          v-model="form.renavam"
          v-mask="'##########-#'">
        </el-input>
      </el-form-item>
      <el-form-item label="Placa:" prop="tag">
        <el-input
          placeholder="Digite a placa"
          v-model="form.tag"
          v-mask="'AAA-####'">
        </el-input>
      </el-form-item>
    </el-row>

  </el-form>
</template>
<script>
  import { DatePicker, Input, Radio, Select, Option } from 'element-ui'
  import { registerService }  from 'src/services/register'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      [DatePicker.name]: DatePicker,
      [Input.name]: Input,
      [Radio.name]: Radio,
      [Select.name]: Select,
      [Option.name]: Option
    },
    data () {
      return {
        labelPosition: 'right',
        form: {
          brand: '',
          model: '',
          year: '',
          color: '',
          renavam: '',
          tag: ''
        },
        rules: {},
      }
    },
    computed: {
      ...mapGetters([
        'userLogged'
      ])
    },
    methods: {
      save () {
        registerService.saveVehicle({ ...this.form }, this.userLogged.id)
          .catch(e => {
            console.error(e.message)
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
      try {
        const vehicle = await registerService.getVehicle(this.userLogged.id)

        this.form = { ...vehicle }  
      } catch(ex){
        console.error(ex.message)
      }
    }
  }
</script>
<style>

</style>
