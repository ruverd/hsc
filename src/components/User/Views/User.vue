<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <h4 slot="header" class="card-title">
          Administração de Usuários
        </h4>
        <div class="card-body row">
          <div class="col-sm-6">
            <el-select
              class="select-default"
              v-model="pagination.perPage"
              placeholder="Per page">
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="col-sm-6">
            <div class="pull-right">
              <fg-input class="input-sm"
                        placeholder="Buscar..."
                        v-model="searchQuery"
                        addon-right-icon="nc-icon nc-zoom-split">
              </fg-input>
            </div>
          </div>
          <div class="col-sm-12 mt-2">
            <el-table class="table-striped"
                      :data="queriedData"
                      border
                      style="width: 100%">
              <el-table-column v-for="column in tableColumns"
                               :key="column.label"
                               :min-width="column.minWidth"
                               :prop="column.prop"
                               :label="column.label">
              </el-table-column>
              <el-table-column
                :min-width="30"
                fixed="right"
                class-name="td-actions"
                label="">
                <template slot-scope="props">
                  <p-button type="success" size="sm" icon @click="handleEdit(props.$index, props.row)" >
                    <i class="fa fa-edit"></i>
                  </p-button>
                  <!-- <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                    <i class="fa fa-times"></i>
                  </p-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="col-sm-6 pagination-info padding-top">
            <p>Exibindo {{from + 1}} até {{to}} de {{total}} registros</p>
          </div>
          <div class="col-sm-6 padding-top">
            <p-pagination class="pull-right"
                          v-model="pagination.currentPage"
                          :per-page="pagination.perPage"
                          :total="pagination.total">
            </p-pagination>
          </div>
        </div>
      </card>
    </div>

    <el-dialog title="Aprovação de Cadastro Médico" width="90%" top="7vh" :visible.sync="dialogVisible">

      <el-form ref="form" :label-position="labelPosition" :inline="true" label-width="150px" :model="form">

        <el-main>Dados Pessoais</el-main>

        <el-row>
          <el-form-item label="Nome:">
            <el-input
              v-model="form.name"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Nascimento:">
            <el-date-picker
              v-model="form.dob"
              type="date"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
              :disabled="true">
            </el-date-picker>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="Sexo:">
            <el-radio-group v-model="form.gender" >
              <el-radio :label="1" :disabled="true">Masculino</el-radio>
              <el-radio :label="2" :disabled="true">Feminino</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Estado Civil:">
            <el-radio-group v-model="form.married" >
              <el-radio :label="1" :disabled="true">Casado</el-radio>
              <el-radio :label="2" :disabled="true">Solteiro</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>

        <el-divider></el-divider>
        <el-main>Documentos Pessoais</el-main>

        <el-row>
          <el-form-item label="CPF:" >
            <el-input
              v-model="form.cpf"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="RG:" >
            <el-input
              v-model="form.rg"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Emissor RG:" >
            <el-input
              v-model="form.rg_emitter"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="CRM:">
            <el-input
              v-model="form.crm"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Emissor CRM:">
            <el-input
              v-model="form.crm_emitter"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Data CRM:">
            <el-date-picker
              v-model="form.date_crm"
              type="date"
              format="dd/MM/yyyy"
              v-mask="'##/##/####'"
              value-format="yyyy-MM-dd"
              :disabled="true">
            </el-date-picker>
          </el-form-item>
        </el-row>

        <el-divider></el-divider>
        <el-main>Endereço Pessoais</el-main>

        <el-row>
          <el-form-item label="CEP:" >
            <el-input
              v-model="form.zipcode_personal"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>

        <el-row>  
          <el-form-item label="Logradouro:" >
            <el-input
              v-model="form.street_personal"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Número:" >
            <el-input
              v-model="form.number_personal"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>

        <el-row>  
          <el-form-item label="Bairro:" >
            <el-input
              v-model="form.neighborhood_personal"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Cidade:">
            <el-input
              v-model="form.city_personal"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Estado:" >
            <el-select
              size="large"
              v-model="form.state_personal"
              :disabled="true">
              <el-option
                v-for="option in selects.states"
                :value="option.value"
                :label="option.label"
                :key="option.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>  
          <el-form-item label="Complemento:">
            <el-input
              v-model="form.additional_personal"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Telefone:" >
            <el-input
              v-model="form.phone_personal"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>
        
        <el-divider></el-divider>
        <el-main>Endereço Comercial</el-main>

        <el-row>
          <el-form-item label="CEP:">
            <el-input
              v-model="form.zipcode_business"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>

        <el-row>  
          <el-form-item label="Logradouro:" >
            <el-input
              v-model="form.street_business"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Número:">
            <el-input
              v-model="form.number_business"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>

        <el-row>  
          <el-form-item label="Bairro:" >
            <el-input
              v-model="form.neighborhood_business"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Cidade:" >
            <el-input
              v-model="form.city_business"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Estado:" >
            <el-select
              size="large"
              v-model="form.state_business"
              :disabled="true">
              <el-option
                v-for="option in selects.states"
                :value="option.value"
                :label="option.label"
                :key="option.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>  
          <el-form-item label="Complemento:">
            <el-input
              v-model="form.additional_business"
              :disabled="true">
            </el-input>
          </el-form-item>  
          <el-form-item label="Telefone:">
            <el-input
              v-model="form.phone_business"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>

        <el-divider></el-divider>
        <el-main>Especialidades</el-main>

        <el-row>
          <el-table :data="tableDataSpeciality" header-row-class-name="text-primary">
            <el-table-column prop="name" label="Nome"></el-table-column>
            <el-table-column prop="status" label="Status"></el-table-column>
            <el-table-column prop="comment" label="Comentário">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.comment">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
              class-name="action-buttons td-actions"
              align="center"
              label="Ações">
              <template slot-scope="props">
                <p-button type="info" size="sm" icon @click="handleView(props.$index, props.row)">
                  <i class="nc-icon nc-zoom-split"></i>
                </p-button>
                <p-button type="success" size="sm" icon @click="handleReject(props.$index, props.row)">
                  <i class="nc-icon nc-check-2"></i>
                </p-button>
                <p-button type="danger" size="sm" icon @click="handleReject(props.$index, props.row)">
                  <i class="fa fa-times"></i>
                </p-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <el-divider></el-divider>
        <el-main>Veículo para estacionamento</el-main>

        <el-row>
          <el-form-item label="Marca:" >
            <el-input
              v-model="form.brand"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Modelo:" >
            <el-input
              v-model="form.model"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Ano:">
            <el-input
              v-model="form.year"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="Cor:">
            <el-input
              v-model="form.color"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Renavam:">
            <el-input
              v-model="form.renavam"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Placa:">
            <el-input
              v-model="form.tag"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>

        <el-divider></el-divider>
        <el-main>Dados de pagamento</el-main>

        <el-row>
          <el-form-item label="Contrato:">
            <el-select
              size="large"
              v-model="form.contract"
              :disabled="true">
              <el-option
                v-for="option in selects.contracts"
                :value="option.value"
                :label="option.label"
                :key="option.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Pagamento:">
            <el-select
              size="large"
              v-model="form.payment"
              :disabled="true">
              <el-option
                v-for="option in selects.payments"
                :value="option.value"
                :label="option.label"
                :key="option.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="Banco:">
            <el-select
              size="large"
              v-model="form.bank"
              :disabled="true">
              <el-option
                  v-for="option in selects.banks"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Agencia:">
            <el-input
              v-model="form.agency"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Conta:">
            <el-input
              v-model="form.account"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>
      
        <el-row>
          <el-form-item label="Tem INSS?">
            <el-radio-group v-model="form.has_inss" :disabled="true">
              <el-radio :label="1">Sim</el-radio>
              <el-radio :label="2">Não</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="INSS:">
            <el-input
              v-model="form.inss"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="PIS:">
            <el-input
              v-model="form.pis"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-row>

        <el-divider></el-divider>
        <el-main>Documentos Anexados</el-main>

        <el-row>
          <el-table :data="tableDataDocument" header-row-class-name="text-primary">
            <el-table-column prop="name" label="Nome"></el-table-column>
            <el-table-column prop="status" label="Status"></el-table-column>
            <el-table-column prop="comment" label="Comentário">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.comment">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
              class-name="action-buttons td-actions"
              align="center"
              label="Ações">
              <template slot-scope="props">
                <p-button type="info" size="sm" icon @click="handleView(props.$index, props.row)">
                  <i class="nc-icon nc-zoom-split"></i>
                </p-button>
                <p-button type="success" size="sm" icon @click="handleReject(props.$index, props.row)">
                  <i class="nc-icon nc-check-2"></i>
                </p-button>
                <p-button type="danger" size="sm" icon @click="handleReject(props.$index, props.row)">
                  <i class="fa fa-times"></i>
                </p-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <el-divider v-if="userProfile === 2"></el-divider>
        <el-main v-if="userProfile === 2">Validação de Cadastro</el-main>

        <el-row v-if="userProfile === 2">
          <el-form-item label="Comentário:" prop="comment">
            <el-input
              type="textarea"
              size="large"
              class="textComment"
              :rows=10
              :columns=90
              placeholder="Insira seu comentário..."
              v-model="form.comment">
            </el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer" v-if="userProfile === 2">
        <el-button type="success" @click="dialogFormVisible = false">Validar</el-button>
        <el-button type="danger" @click="dialogFormVisible = false">Não Validar</el-button>
      </span>

      <span slot="footer" class="dialog-footer" v-if="userProfile === 3">
        <el-button type="success" @click="dialogFormVisible = false">Aprovar</el-button>
        <el-button type="danger" @click="dialogFormVisible = false">Rejeitar</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import Vue from 'vue'
  import { userService }  from 'src/services/user'
  import { registerService }  from 'src/services/register'
  import { Table, TableColumn, Select, Option, Dialog, Divider, DatePicker, Input, Radio } from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import swal from 'sweetalert2'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  export default{
    components: {
      PPagination,
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
    data () {
      return {
        dialogVisible: false,
        labelPosition: 'right',
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
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
          date_crm: '',
          street_personal: '',
          number_personal: '',
          neighborhood_personal: '',
          city_personal: '',
          state_personal: 'São Paulo',
          additional_personal: '',
          zipcode_personal: '',
          phone_personal: '',
          street_business: '',
          number_business: '',
          neighborhood_business: '',
          city_business: '',
          state_business: 'São Paulo',
          additional_business: '',
          zipcode_business: '',
          phone_business: '',
          brand: '',
          model: '',
          year: '',
          color: '',
          renavam: '',
          tag: '',
          contract: '',
          payment: '',
          bank: '',
          agency: '',
          account: '',
          has_inss: 0,
          inss: '',
          pis: '',
        },
        searchQuery: '',
        propsToSearch: ['name', 'email', 'status'],
        tableColumns: [
          {
            prop: 'name',
            label: 'Nome',
            minWidth: 200
          },
          {
            prop: 'email',
            label: 'Email',
            minWidth: 150
          },
          {
            prop: 'status.name',
            label: 'Status',
            minWidth: 150
          },
        ],
        tableData: [],
        tableDataSpeciality: [
          {
            name: 'Especilidade 1',
            comment: '',
            status: 'Processando'
          }, {
            name: 'Especialidade 2',
            comment: '',
            status: 'Aprovado'
          }, {
            name: 'Especialidade 3',
            comment: 'Documento vencido',
            status: 'Negado'
          }
        ],
        tableDataDocument: [
          {
            name: 'Diploma',
            comment: 'Documento vencido',
            status: 'Em Validação'
          }, 
          {
            name: 'Conclusão de Residencia',
            comment: 'Documento vencido',
            status: 'Aprovado'
          }, 
          {
            name: 'Anuidade CRM',
            comment: '',
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
          }
        ],
        selects: {
          states: [
            { value: 'SP', label: 'São Paulo' }
          ]
        }
      }
    },
    mounted () {
      userService.getAll()
        .then(resp => {
          this.tableData = resp.data
        })
    },
    computed: {
      ...mapState([
        'auth'
      ]),
      ...mapGetters([
        'statusUser','userProfile'
      ]),
      pagedData () {
        return this.tableData.slice(this.from, this.to)
      },
      /***
       * Searches through table data and returns a paginated array.
       * Note that this should not be used for table with a lot of data as it might be slow!
       * Do the search and the pagination on the server and display the data retrieved from server instead.
       * @returns {computed.pagedData}
       */
      queriedData () {
        if (!this.searchQuery) {
          this.pagination.total = this.tableData.length
          return this.pagedData
        }
        let result = this.tableData
          .filter((row) => {
            let isIncluded = false
            for (let key of this.propsToSearch) {
              let rowValue = row[key].toString()
              if (rowValue.includes && rowValue.includes(this.searchQuery)) {
                isIncluded = true
              }
            }
            return isIncluded
          })
        this.pagination.total = result.length
        return result.slice(this.from, this.to)
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        this.pagination.total = this.tableData.length
        return this.tableData.length
      }
    },
    methods: {
      handleEdit (index, row) {
        this.loadDialogForm(row.id)
        this.dialogVisible = true
      },
      async loadDialogForm (id) {
        try{
          const personal = await registerService.getPersonal(id)
          const document = await registerService.getDocument(id)
          const contact = await registerService.getContact(id)
          const vehicle = await registerService.getVehicle(id)
          const payment = await registerService.getPayment(id)

          this.form = {
            ...document,
            ...personal,
            ...contact,
            ...vehicle,
            ...payment,
            dob: new Date(`${personal.dob} 00:00:00`),
            date_crm: (typeof document !== 'undefined') ? new Date(`${document.date_crm} 00:00:00`) : ''
          }  
        } catch(ex){
          console.error(ex.message)
        }
      },
      changeName (){
        this.CHANGE_USER_NAME(this.newName);
        this.newName = ''
      },
      ...mapMutations([
        'CHANGE_USER_NAME'
      ]),
      ...mapActions([
        'resetUserName'
      ]),
    }
  }
</script>
<style lang="scss">
  .el-table .td-actions{
    button.btn {
      margin-right: 5px;
    }
  }
  .padding-top {
    padding-top: 20px;
  }
  .textComment {
    width: 300%
  }
</style>
