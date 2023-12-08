import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Test01RoutingModule } from './test01-routing.module';

import { Test01Component } from './test01.component';

@NgModule({
    imports: [CommonModule, Test01RoutingModule],
    declarations: [Test01Component],
})
export class Test01Module {}
