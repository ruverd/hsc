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
                :min-width="60"
                fixed="right"
                class-name="td-actions"
                label="Actions">
                <template slot-scope="props">
                  <p-button type="success" size="sm" icon @click="handleEdit(props.$index, props.row)">
                    <i class="fa fa-edit"></i>
                  </p-button>
                  <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
                    <i class="fa fa-times"></i>
                  </p-button>
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
  </div>
</template>
<script>
  import Vue from 'vue'
  import { userService }  from 'src/services/user'
  import { Table, TableColumn, Select, Option } from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import swal from 'sweetalert2'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  export default{
    components: {
      PPagination,
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
        'statusUser'
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
    data () {
      return {
        newName: '',
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
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
        tableData: []
      }
    },
    methods: {
      handleEdit (index, row) {
        alert(`Your want to edit ${row.name}`)
      },
      handleDelete (index, row) {
        const self = this
        swal({
            title: 'Deseja realmente apagar esse usuário?',
            text: `${row.name}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success btn-fill',
            cancelButtonClass: 'btn btn-danger btn-fill',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            buttonsStyling: false
          }).then(function () {
            let index = self.tableData.findIndex((tableRow) => tableRow.id === row.id)
            if (row.id >= 0) {
              userService.delete(row.id)
                .then(resp => {
                  self.$notify({
                    icon: 'nc-icon nc-check-2',
                    message: `Usuário apagado com sucesso!`,
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: 'success'
                  })
                if (index >= 0) self.tableData.splice(index, 1)
              })
            }
          })
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
</style>
