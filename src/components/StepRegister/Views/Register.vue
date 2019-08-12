<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 mr-auto ml-auto">
          <wizard @complete="wizardComplete">
            <template slot="header">
              <h3 class="card-title">Build your profile</h3>
              <h3 class="description">This information will let us know more about you.</h3>
            </template>

            <wizard-tab :before-change="() => validateStep('personal')">
              <template slot="label">
                <i class="nc-icon nc-circle-10"></i>
                Pessoal
              </template>
              <personal-step ref="personal" @on-validated="onStepValidated"></personal-step>
            </wizard-tab>

            <wizard-tab :before-change="() => validateStep('contact')">
              <template slot="label" >
                <i class="nc-icon nc-badge"></i>
                Contato
              </template>
              <contact-step ref="contact" @on-validated="onStepValidated"></contact-step>
            </wizard-tab>

            <wizard-tab :before-change="() => validateStep('document')">
              <template slot="label">
                <i class="nc-icon nc-single-copy-04"></i>
                Documentos
              </template>
              <document-step ref="document"></document-step>
            </wizard-tab>

            <wizard-tab :before-change="() => validateStep('speciality')">
              <template slot="label">
                <i class="nc-icon nc-trophy"></i>
                Especilidades
              </template>
              <speciality-step ref="speciality"></speciality-step>
            </wizard-tab>

            <wizard-tab :before-change="() => validateStep('vehicle')">
              <template slot="label">
                <i class="nc-icon nc-bus-front-12"></i>
                Veículos
              </template>
              <vehicle-step ref="vehicle"></vehicle-step>
            </wizard-tab>

            <wizard-tab :before-change="() => validateStep('payment')">
              <template slot="label">
                <i class="nc-icon nc-credit-card"></i>
                Pagamento
              </template>
              <payment-step ref="payment"></payment-step>
            </wizard-tab>
          </wizard>
      </div>
    </div>
  </div>
</template>
<script>
  import PersonalStep from './Step/Personal.vue'
  import ContactStep from './Step/Contact.vue'
  import DocumentStep from './Step/Document.vue'
  import SpecialityStep from './Step/Speciality.vue'
  import VehicleStep from './Step/Vehicle.vue'
  import PaymentStep from './Step/Payment.vue'
  import swal from 'sweetalert2'
  import {Wizard, WizardTab} from 'src/components/UIComponents'

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
    methods: {
      validateStep(ref) {
        return this.$refs[ref].validate()
      },
      onStepValidated(validated, model) {
        this.wizardModel = {...this.wizardModel, ...model}
        console.log('---',this.wizardModel,model,'---');
      },
      wizardComplete() {
        swal('Good job!', 'You clicked the finish button!', 'success')
      }
    }
  }
</script>
