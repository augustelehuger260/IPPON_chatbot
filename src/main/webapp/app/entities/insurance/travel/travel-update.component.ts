import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITravel } from 'app/shared/model/insurance/travel.model';
import { TravelService } from './travel.service';

@Component({
    selector: 'jhi-travel-update',
    templateUrl: './travel-update.component.html'
})
export class TravelUpdateComponent implements OnInit {
    private _travel: ITravel;
    isSaving: boolean;
    departureDateDp: any;
    returnDateDp: any;

    constructor(private travelService: TravelService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ travel }) => {
            this.travel = travel;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.travel.id !== undefined) {
            this.subscribeToSaveResponse(this.travelService.update(this.travel));
        } else {
            this.subscribeToSaveResponse(this.travelService.create(this.travel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITravel>>) {
        result.subscribe((res: HttpResponse<ITravel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get travel() {
        return this._travel;
    }

    set travel(travel: ITravel) {
        this._travel = travel;
    }
}
