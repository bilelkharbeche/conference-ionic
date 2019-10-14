import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { async } from '@angular/core/testing';

const { Device } = Plugins;
const { Network } = Plugins;

@Component({
    selector: 'app-tab4',
    templateUrl: 'tab4.page.html',
})
export class Tab4Page implements OnInit {

    info:any = {};
    statut:any = {};

    constructor() { }

    ngOnInit(): void {
        this.getInfoDevice().then(infos => this.info = infos);
        this.getStatutInfo().then(status => this.statut = status);
    }

    async getInfoDevice() {
        return await Device.getInfo();
    }

    async getStatutInfo() {
        return await Network.getStatus();
    }
}
