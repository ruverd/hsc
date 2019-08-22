<template>
  <el-form :inline="true" label-width="150px">

    <el-main>Todos os documentos são obrigatórios!</el-main>

    <el-row>
      <el-table :data="tableData" header-row-class-name="text-primary">
        <el-table-column prop="name" label="Nome"></el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
        <el-table-column prop="comment" label="Comentário"></el-table-column>

        <el-table-column
          class-name="action-buttons td-actions"
          max-width="40px"
          align="right"
          label="">
          <template slot-scope="props">
            <el-upload
              class="upload-demo"
              :show-file-list="false"
              :limit="1"
              :auto-upload="true"
              action="https://jsonplaceholder.typicode.com/posts/">
                <el-button size="mini" type="plain" >Selecione o Arquivo</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column
          class-name="action-buttons td-actions"
          align="center"
          label="Ações">
          <template slot-scope="props">
            <el-button type="primary" size="mini" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

  </el-form>
</template>
<script>
  import {DatePicker, Input, Radio, Select} from 'element-ui'

  export default {
    components: {
      [DatePicker.name]: DatePicker,
      [Input.name]: Input,
      [Radio.name]: Radio,
      [Select.name]: Select
    },
    data () {
      return {
        tableData: [{
          name: 'Diploma',
          comment: '',
          status: 'Em Validação'
        }, 
        {
          name: 'Conclusão de Residencia',
          comment: '',
          status: 'Aprovado'
        }, 
        {
          name: 'Anuidade CRM',
          comment: 'Anuidade do ano anterior',
          status: 'Negado'
        },
        {
          name: 'Carteira do CRM',
          comment: '',
          status: 'Pendente'
        },
        {
          name: 'RG',
          comment: '',
          status: 'Pendente'
        },
        {
          name: 'CPF',
          comment: '',
          status: 'Pendente'
        },
        {
          name: 'Currículo',
          comment: '',
          status: 'Pendente'
        },
        {
          name: 'Carta de Apresentação',
          comment: '',
          status: 'Pendente'
        },
        {
          name: 'Formulário de Estacionamento',
          comment: '',
          status: 'Pendente'
        },
        {
          name: 'Foto 3x4',
          comment: '',
          status: 'Pendente'
        }],
      }
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      },
      getError(fieldName) {
        return this.errors.first(fieldName)
      },
      validate() {
        return this.$validator.validateAll().then(res => {
          this.$emit('on-validated', res, this.model)
          return res
        })
      }
    }
  }
</script>
<style>

</style>
