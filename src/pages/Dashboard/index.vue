<template>
  <div>
    <div class="row" v-if="userProfile === 1">
      <div class="col-lg-6 col-md-4 col-sm-4 center">
        <card>
          <div slot="header" class="card-text">
            <h4 class="card-title">Processo de Cadastro</h4>
          </div>
          <p v-for="step in registerProgress.steps" v-bind:key="step.key">
            <i
              class="fa text-info"
              v-bind:class="{'fa-check': step.concluded,  'fa-minus': !step.concluded}"
            ></i>
            {{ step.title }}
            <i
              class="category"
              v-if="step.concluded"
            >{{ step.concluded }}</i>
          </p>
          <div class="bottom clearfix">
            <hr />
            <i class="fa fa-calendar"></i>
            Tempo médio de Aprovação {{registerProgress.avgTime}} dia(s)
          </div>
        </card>
      </div>
    </div>

    <div class="row" v-if="userProfile === 2 || userProfile === 3">
      <div class="col-lg-3 col-md-6 col-sm-6" v-for="stats in statsCards" v-bind:key="stats.key">
        <stats-card
          :type="stats.type"
          :icon="stats.icon"
          :small-title="stats.title"
          :title="stats.value"
        >
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i>
            {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>
  </div>
</template>
<script>
import StatsCard from "src/components/UIComponents/Cards/StatsCard";
import { dashboardService } from "src/services/dashboard";
import { mapGetters } from "vuex";

export default {
  components: {
    StatsCard
  },
  data() {
    return {
      statsCards: [],
      registerProgress: []
    };
  },
  async mounted() {
    const info = await dashboardService.getInfo();

    if (this.userProfile === 1) {
      this.registerProgress = info.data;
    } else {
      this.statsCards = [
        {
          key: 1,
          type: "warning",
          icon: "nc-icon nc-circle-10",
          title: "Usuários",
          value: `${info.data.totalUser}`,
          footerText: `${info.data.awaitingApproval} aguardando aprovação`,
          footerIcon: "nc-icon nc-bell-55"
        },
        {
          key: 2,
          type: "success",
          icon: "nc-icon nc-watch-time",
          title: "Tempo Médio",
          value: `${info.data.avgTime} dias`,
          footerText: "Tempo Médio de Aprovação",
          footerIcon: "nc-icon nc-calendar-60"
        },
        {
          key: 3,
          type: "danger",
          icon: "nc-icon nc-button-pause",
          title: "Não Completos",
          value: `${info.data.notCompleted}`,
          footerText: "Cadastros não completados",
          footerIcon: "nc-icon nc-bell-55"
        },
        {
          key: 4,
          type: "info",
          icon: "nc-icon nc-hat-3",
          title: "Especialidades",
          value: `${info.data.totalSpeciality}`,
          footerText: "Total Cadastrado",
          footerIcon: "nc-icon nc-simple-add"
        }
      ];
    }
  },
  computed: {
    ...mapGetters(["userProfile"])
  }
};
</script>
<style>
p i {
  padding-right: 10px;
}
</style>
