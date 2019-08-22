<template>
  <div>
    <div class="row" v-if="userProfile === 1">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <circle-chart-card :percentage="50"
                           chart-id="email-statistics-chart"
                           title="Cadastro Médio"
                           description="Percentual Concluído"
                           color="#4acccd">
          <template slot="footer">
            <div class="legend">
              <i class="fa fa-circle text-info"></i> Aguardando Validação
            </div>
            <hr>
            <div class="stats">
              <i class="fa fa-calendar"></i> Tempo médio de Aprovação 5 dias
            </div>
          </template>
        </circle-chart-card>
      </div>

      <div class="col-lg-4 col-md-6 col-sm-6">
        <card>
          <div slot="header" class="card-text">
            <h4 class="card-title">Processo de Cadastro</h4>
          </div>
          <p v-for="step in registerProgress.steps" v-bind:key="step.key">
            <i class="fa text-info" v-bind:class="{'fa-check': step.concluded,  'fa-minus': !step.concluded}"></i> 
            {{ step.title }} 
            <i class="category" v-if="step.concluded">{{ step.concluded }}</i>
          </p>
          <!-- <p><i class="fa fa-check text-info"></i> Dados Pessoal <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Contato Pessoal <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Contato Escritório <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Cadastro Veículo <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Forma Pagamento <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Envio de Documentação <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-minus text-info"></i> Validação de Dados</p>
          <p><i class="fa fa-minus text-info"></i> Aprovação de Dados</p> -->
        </card>
      </div>
    </div>

    <div class="row" v-if="userProfile === 2 || userProfile === 3">
      <div class="col-lg-3 col-md-6 col-sm-6" v-for="stats in statsCards" v-bind:key="stats.key">
        <stats-card :type="stats.type"
                    :icon="stats.icon"
                    :small-title="stats.title"
                    :title="stats.value">
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
  import CircleChartCard from 'src/components/UIComponents/Cards/CircleChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard'
  import { dashboardService }  from 'src/services/dashboard'
  import Loading from 'src/components/Layout/Default/LoadingMainPanel.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      StatsCard,
      CircleChartCard
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        statsCards: [],
        registerProgress: []
      }
    },
    mounted () {
      dashboardService.getInfo()
        .then(resp => {
          if(this.userProfile === 1){
            this.registerProgress = resp.data
          } else {
            this.statsCards = [
              {
                key: 1,
                type: 'warning',
                icon: 'nc-icon nc-circle-10',
                title: 'Usuários',
                value: `${resp.data.totalUser}`,
                footerText: `${resp.data.awaitingApproval} aguardando aprovação`,
                footerIcon: 'nc-icon nc-bell-55'
              },
              {
                key: 2,
                type: 'success',
                icon: 'nc-icon nc-watch-time',
                title: 'Tempo Médio',
                value: `${resp.data.avgTime} dias`,
                footerText: 'Tempo Médio de Aprovação',
                footerIcon: 'nc-icon nc-calendar-60'
              },
              {
                key: 3,
                type: 'danger',
                icon: 'nc-icon nc-button-pause',
                title: 'Não Completos',
                value: `${resp.data.notCompleted}`,
                footerText: 'Cadastros não completados',
                footerIcon: 'nc-icon nc-bell-55'
              },
              {
                key: 4,
                type: 'info',
                icon: 'nc-icon nc-hat-3',
                title: 'Especialidades',
                value: `${resp.data.totalSpeciality}`,
                footerText: 'Total Cadastrado',
                footerIcon: 'nc-icon nc-simple-add'
              }
            ]
          }
        })
    },
    computed: {
      ...mapGetters([
        'userProfile'
      ])
    },
  }

</script>
<style>
  p i {
    padding-right: 10px;
  }
</style>
