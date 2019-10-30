<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <h4 slot="header" class="card-title">Administração de Especialidades</h4>
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

            <p-button
              type="default"
              outline
              round
              class="list-add"
              @click.native="togglemodal('save')"
            >
              <i class="fa fa-plus"></i> Adicionar
            </p-button>
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
              <el-table-column
                :min-width="60"
                fixed="right"
                class-name="td-actions"
                label="Actions"
              >
                <template slot-scope="props">
                  <p-button type="success" size="sm" icon @click="togglemodal('edit',...props)">
                    <i class="fa fa-edit"></i>
                  </p-button>
                  <p-button
                    type="danger"
                    size="sm"
                    icon
                    @click="handleDelete(props.$index, props.row)"
                  >
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

    <el-dialog title="Outer Dialog" width="90%" :visible.sync="outerVisible">
      <el-dialog title="Inner Dialog" :visible.sync="innerVisible" append-to-body center></el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="innerVisible = true">open the inner Dialog</el-button>
      </div>
    </el-dialog>

    <modal :show.sync="modals.open" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">{{modals.title}}</h4>
      <div class="form-group">
        <fg-input
          type="text"
          label="Nome"
          autocomplete="off"
          required
          name="name"
          ref="name"
          v-validate="modelValidations.name"
          :error="getError('nome')"
          data-vv-name="nome"
          autofocus
          v-model="form.name"
        ></fg-input>
      </div>
      <template slot="footer">
        <div class="left-side">
          <p-button type="default" link @click.prevent="validate">Salvar</p-button>
        </div>
        <div class="divider"></div>
        <div class="right-side">
          <p-button type="danger" link @click="togglemodal()">Cancelar</p-button>
        </div>
      </template>
    </modal>

    <notifications></notifications>
  </div>
</template>
<script>
import Vue from "vue";
import { specialityService } from "src/services/speciality";
import { Table, TableColumn, Select, Option, Dialog } from "element-ui";
import { Modal } from "src/components/UIComponents";
import swal from "sweetalert2";
import Notification from "src/components/UIComponents/Notifications";
import PPagination from "src/components/UIComponents/Pagination.vue";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Select.name]: Select,
    [Option.name]: Option,
    [Dialog.name]: Dialog,
    PPagination,
    Notification,
    Modal
  },
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      form: {
        id: null,
        name: ""
      },
      submitted: false,
      modelValidations: {
        name: {
          required: true,
          min: 3
        }
      },
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["name"],
      tableIndex: null,
      tableColumns: [
        {
          key: "id",
          prop: "name",
          label: "Nome",
          minWidth: 400
        }
      ],
      tableData: [],
      modals: {
        title: "",
        open: false
      }
    };
  },
  mounted() {
    specialityService.getAll().then(resp => {
      this.tableData = resp.data;
    });
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
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    handleSave() {
      specialityService.create(this.form).then(resp => {
        this.tableData.push(resp.data);
        this.$notify({
          icon: "nc-icon nc-check-2",
          message: `Especialidade criada com sucesso!`,
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
        this.togglemodal();
      });
    },
    handleEdit() {
      let { id, ...form } = this.form;
      specialityService.update(form, id).then(resp => {
        this.tableData.splice(this.tableIndex, 1, resp.data);
        this.$notify({
          icon: "nc-icon nc-check-2",
          message: `Especialidade alterada com sucesso!`,
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
        this.togglemodal();
      });
    },
    handleDelete(index, row) {
      const self = this;
      swal({
        title: "Deseja realmente apagar essa especialidade?",
        text: `${row.name}`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        buttonsStyling: false
      }).then(function() {
        let index = self.tableData.findIndex(
          tableRow => tableRow.id === row.id
        );
        if (row.id >= 0) {
          specialityService.delete(row.id).then(resp => {
            self.$notify({
              icon: "nc-icon nc-check-2",
              message: `Especialidade apagada com sucesso!`,
              horizontalAlign: "right",
              verticalAlign: "top",
              type: "success"
            });
            if (index >= 0) self.tableData.splice(index, 1);
          });
        }
      });
    },
    setFocus() {
      // Note, you need to add a ref="search" attribute to your input.
      this.$refs.name.focus();
    },
    togglemodal(modal, props = null) {
      let id = null;
      if (null !== props) {
        var { $index, row } = props;
        id = row.id;
      }

      if (null === id) {
        this.modals.title = "Cadastrar Especialidade";
        this.modals.open = !this.modals.open;
        this.cleanForm();
      } else {
        this.modals.title = "Editar Especialidade";
        this.cleanForm();
        specialityService.getById(id).then(resp => {
          this.tableIndex = $index;
          this.form.id = resp.data.id;
          this.form.name = resp.data.name;
          this.modals.open = !this.modals.open;
        });
      }
    },
    cleanForm() {
      this.form.id = null;
      this.form.name = "";
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid)
          return this.form.id === null ? this.handleSave() : this.handleEdit();
      });
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
.list-add {
  margin-left: 20px !important;
}
</style>
