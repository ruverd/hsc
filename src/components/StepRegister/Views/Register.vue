<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-12 mr-auto ml-auto">

        <div class="alert alert-warning alert-with-icon alert-dismissible fade show" data-notify="container" v-if="registerComment">
          <span data-notify="icon" class="nc-icon nc-bell-55"></span>
          <span data-notify="message">{{registerComment}}</span>
        </div>

        <wizard @complete="wizardComplete">
          <template slot="header">
            <h3 class="card-title"></h3>
            <h3 class="description"></h3>
          </template>

          <wizard-tab :before-change="() => validate('personal')">
            <template slot="label">
              <i class="nc-icon nc-circle-10"></i>
              Pessoal
            </template>
            <personal-step ref="personal" @on-validated="onStepValidated"></personal-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validate('contact')">
            <template slot="label" >
              <i class="nc-icon nc-badge"></i>
              Contato
            </template>
            <contact-step ref="contact" @on-validated="onStepValidated"></contact-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validate('speciality')">
            <template slot="label">
              <i class="nc-icon nc-trophy"></i>
              Especilidades
            </template>
            <speciality-step ref="speciality"></speciality-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validate('vehicle')">
            <template slot="label">
              <i class="nc-icon nc-bus-front-12"></i>
              Veículos
            </template>
            <vehicle-step ref="vehicle"></vehicle-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validate('payment')">
            <template slot="label">
              <i class="nc-icon nc-credit-card"></i>
              Pagamento
            </template>
            <payment-step ref="payment"></payment-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validate('document')">
            <template slot="label">
              <i class="nc-icon nc-single-copy-04"></i>
              Documentos
            </template>
            <document-step ref="document"></document-step>
          </wizard-tab>
        </wizard>
      </div>
    </div>
  </div>
</template>
<script>
  import PersonalStep from './Step/Personal.vue'
  import ContactStep from './Step/Contact.vue'
  import SpecialityStep from './Step/Speciality.vue'
  import VehicleStep from './Step/Vehicle.vue'
  import PaymentStep from './Step/Payment.vue'
  import DocumentStep from './Step/Document.vue'
  import swal from 'sweetalert2'
  import {Wizard, WizardTab} from 'src/components/UIComponents'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        wizardModel: {}
      }
    },
    components: {
      PersonalStep,
      ContactStep,
      DocumentStep,
      SpecialityStep,
      VehicleStep,
      PaymentStep,
      Wizard,
      WizardTab
    },
    computed: {
      ...mapGetters([
        'registerComment'
      ])
    },
    methods: {
      validate(ref) {
        return this.$refs[ref].validate();
      },
      onStepValidated(validated, model) {
        if (validated) {
          this.wizardModel = { ...this.wizardModel, ...model };
        }
      },
      wizardComplete() {
        swal('Cadastro finalizado!', 'Aguarde a validação e aprovação dos dados!', 'success')
      }
    }
  }
</script>
