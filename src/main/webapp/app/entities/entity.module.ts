import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayTravelModule as InsuranceTravelModule } from './insurance/travel/travel.module';
import { GatewayInsurancePlanModule as InsuranceInsurancePlanModule } from './insurance/insurance-plan/insurance-plan.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        InsuranceTravelModule,
        InsuranceInsurancePlanModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
