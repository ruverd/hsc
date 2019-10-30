<template>
  <div>
    <el-main v-if="userProfile === 2">Validação de Cadastro</el-main>

    <el-row v-if="userProfile === 2">
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
    <div style="display: flex; justify-content: flex-end">
      <span slot="footer" class="dialog-footer" v-if="userProfile === 2">
        <el-button type="success" @click="handleValidate(true)">Validar</el-button>
        <el-button type="danger" @click="handleValidate(false)">Não Validar</el-button>
      </span>

      <span slot="footer" class="dialog-footer" v-if="userProfile === 3">
        <el-button type="success" @click="handleApprove(true)">Aprovar</el-button>
        <el-button type="danger" @click="handleApprove(false)">Rejeitar</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { Input, Radio, Divider } from "element-ui";
import { registerService } from "src/services/register";
import { mapGetters } from "vuex";

export default {
  components: {
    [Input.name]: Input,
    [Radio.name]: Radio,
    [Divider.name]: Divider
  },
  data() {
    return {
      labelPosition: "right",
      disabled: true,
      form: {
        comment: ""
      }
    };
  },
  computed: {
    ...mapGetters(["userLogged", "userProfile", "idRegister"])
  },
  methods: {
    async handleValidate(approved) {
      try {
        const { comment, id } = this.form;
        const message = approved ? "validado" : "não validado";

        await registerService.validateUser({ approved, comment }, id);

        this.$notify({
          icon: "nc-icon nc-check-2",
          message: `Usuário ${message} com sucesso!`,
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });

        this.$emit("dialog-closed");
      } catch (err) {
        console.error(err);
      }
    },
    async handleApprove(approved) {
      try {
        const { comment, id } = this.form;
        const message = approved ? "aprovado" : "rejeitado";

        await registerService.approveUser({ approved, comment }, id);

        this.$notify({
          icon: "nc-icon nc-check-2",
          message: `Usuário ${message} com sucesso!`,
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });

        this.$emit("dialog-closed");
      } catch (err) {
        console.error(err);
      }
    }
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
