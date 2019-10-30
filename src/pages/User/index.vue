<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <h4 slot="header" class="card-title">Administração de Usuários</h4>
        <div class="card-body row">
          <div class="col-sm-6">
            <el-select class="select-default" v-model="pagination.perPage" placeholder="Per page">
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div class="col-sm-6">
            <div class="pull-right">
              <fg-input
                class="input-sm"
                placeholder="Buscar..."
                v-model="searchQuery"
                addon-right-icon="nc-icon nc-zoom-split"
              ></fg-input>
            </div>
          </div>
          <div class="col-sm-12 mt-2">
            <el-table class="table-striped" :data="queriedData" border style="width: 100%">
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
              ></el-table-column>
              <el-table-column :min-width="30" fixed="right" class-name="td-actions" label>
                <template slot-scope="props">
                  <p-button
                    type="success"
                    size="sm"
                    icon
                    @click="handleEdit(props.$index, props.row)"
                  >
                    <i class="fa fa-edit"></i>
                  </p-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="col-sm-6 pagination-info padding-top">
            <p>Exibindo {{from + 1}} até {{to}} de {{total}} registros</p>
          </div>
          <div class="col-sm-6 padding-top">
            <p-pagination
              class="pull-right"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="pagination.total"
            ></p-pagination>
          </div>
        </div>
      </card>
    </div>
    <el-dialog
      title="Aprovação de Cadastro Médico"
      width="90%"
      top="7vh"
      :visible.sync="dialogVisible"
    >
      <modal @dialog-closed="dialogClosed"></modal>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { userService } from "src/services/user";
import { Table, TableColumn } from "element-ui";
import PPagination from "src/components/UIComponents/Pagination";
import Modal from "./Register";
import { mapActions } from "vuex";

export default {
  components: {
    Modal,
    PPagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      dialogVisible: false,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["name", "email", "status"],
      tableColumns: [
        {
          prop: "name",
          label: "Nome",
          minWidth: 200
        },
        {
          prop: "email",
          label: "Email",
          minWidth: 150
        },
        {
          prop: "status.name",
          label: "Status",
          minWidth: 150
        }
      ],
      tableData: []
    };
  },
  async mounted() {
    await this.loadTableUsers();
  },
  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    queriedData() {
      if (!this.searchQuery) {
        this.pagination.total = this.tableData.length;

        return this.pagedData;
      }
      let result = this.tableData.filter(row => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }

        return isIncluded;
      });
      this.pagination.total = result.length;

      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }

      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      this.pagination.total = this.tableData.length;

      return this.tableData.length;
    }
  },
  methods: {
    ...mapActions("register", ["setIdRegister"]),
    async loadTableUsers() {
      try {
        const resp = await userService.getAll();

        this.tableData = resp.data;
      } catch (err) {
        console.error(err);
      }
    },
    async handleEdit(index, row) {
      await this.setIdRegister(row.id);

      this.dialogVisible = true;
    },
    async dialogClosed() {
      this.dialogVisible = false;
      await this.loadTableUsers();
    }
  }
};
</script>
<style lang="scss">
.el-table .td-actions {
  button.btn {
    margin-right: 5px;
  }
}
.padding-top {
  padding-top: 20px;
}
.textComment {
  width: 300%;
}
</style>
