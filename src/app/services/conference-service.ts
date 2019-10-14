import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateConf } from '../entities/dateConf';
import { Session } from 'protractor';
import { Speakers } from '../entities/speakers';

@Injectable({
    providedIn: 'root'
})
export class ConferenceService {

    constructor(private _http: HttpClient) { }

    recupererConf(): Observable<DateConf[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true
        };
        return this._http.get<DateConf[]>(`https://devfest-nantes-2018-api.cleverapps.io/schedule`, httpOptions);
    }

    recupererSession(): Observable<Session> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true
        };
        return this._http.get<Session>(`https://devfest-nantes-2018-api.cleverapps.io/sessions`, httpOptions);
    }

    recupererSpeakers(): Observable<Speakers> {
        const httpOptions = {
            header: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true
        };
        return this._http.get<Speakers>(`https://devfest-nantes-2018-api.cleverapps.io/speakers`, httpOptions);
    }
}
