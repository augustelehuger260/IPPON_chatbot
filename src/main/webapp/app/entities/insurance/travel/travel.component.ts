import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITravel } from 'app/shared/model/insurance/travel.model';
import { Principal } from 'app/core';
import { TravelService } from './travel.service';
import { IInsurancePlan } from 'app/shared/model/insurance/insurance-plan.model';
import { InsurancePlanService } from 'app/entities/insurance/insurance-plan';

@Component({
    selector: 'jhi-travel',
    templateUrl: './travel.component.html',
    styles: [`
        :host >>> .popover {
          color: #000;
          text-align: center;
          max-width: 100%;
        }
    `]
})
export class TravelComponent implements OnInit, OnDestroy {
    travels: ITravel[];
    travel: ITravel;
    insurances: IInsurancePlan[];
    currentAccount: any;
    eventSubscriber: Subscription;
    name: string[];

    constructor(
        private travelService: TravelService,
        private insuranceService: InsurancePlanService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.name=["None","Low","Medium","High"];
        this.insuranceService.query().subscribe(
            (res: HttpResponse<IInsurancePlan[]>) => {
                this.insurances = res.body;
                console.log('insurances loaded');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.travelService.query().subscribe(
            (res: HttpResponse<ITravel[]>) => {
                this.travels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTravels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITravel) {
        return item.id;
    }

    registerChangeInTravels() {
        this.eventSubscriber = this.eventManager.subscribe('travelListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    hasTravel(): boolean{
        return this.travels.length>0;
    }
    updateInsurance(level: number, selectTravel: ITravel): void {
        this.travel = selectTravel;
        this.travel.insuranceId = level;
        this.subscribeToSaveResponse(this.travelService.update(this.travel));
    }
    private subscribeToSaveResponse(result: Observable<HttpResponse<ITravel>>) {
        // console.log('about to update');
        result.subscribe(
            (res: HttpResponse<ITravel>) => {},
            (res: HttpErrorResponse) => {
                console.log('error to save response:', res);
            }
        );
    }
}
