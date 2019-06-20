<template>
  <div>
    <!--Stats cards-->
    <div class="row"  v-if="profile !== 3">
      <div class="col-lg-3 col-md-6 col-sm-6" v-for="stats in statsCards">
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

    <div class="row" v-if="profile === 3">
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
          <p><i class="fa fa-check text-info"></i> Registro <i class="category">01/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Dados Pessoal <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Contato Pessoal <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Contato Escritório <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Cadastro Veículo <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Forma Pagamento <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-check text-info"></i> Envio de Documentação <i class="category">02/06/2019</i></p>
          <p><i class="fa fa-minus text-info"></i> Validação de Dados</p>
          <p><i class="fa fa-minus text-info"></i> Aprovação de Dados</p>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  import CircleChartCard from 'src/components/UIComponents/Cards/CircleChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard';
  import Loading from 'src/components/Layout/Default/LoadingMainPanel.vue'

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
        profile: 3,
        statsCards: [
          {
            type: 'warning',
            icon: 'nc-icon nc-circle-10',
            title: 'Usuários',
            value: '100',
            footerText: '8 aguardando aprovação ',
            footerIcon: 'nc-icon nc-bell-55'
          },
          {
            type: 'success',
            icon: 'nc-icon nc-watch-time',
            title: 'Tempo Médio',
            value: '5 dias',
            footerText: 'Tempo Médio de Aprovação',
            footerIcon: 'nc-icon nc-calendar-60'
          },
          {
            type: 'danger',
            icon: 'nc-icon nc-button-pause',
            title: 'Não Completos',
            value: '23',
            footerText: 'Cadastros não completados',
            footerIcon: 'nc-icon nc-bell-55'
          },
          {
            type: 'info',
            icon: 'nc-icon nc-trophy',
            title: 'Especialidades',
            value: '2',
            footerText: 'Total Cadastrado',
            footerIcon: 'nc-icon nc-simple-add'
          }
        ]
      }
    }
  }

</script>
<style>
  p i {
    padding-right: 10px;
  }
</style>
