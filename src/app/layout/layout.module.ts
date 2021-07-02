import { NgModule } from '@angular/core';

import { VerticalLayout1Module } from 'app/layout/vertical/layout-1/layout-1.module';
import { VerticalLayout2Module } from 'app/layout/vertical/layout-2/layout-2.module';
import { VerticalLayout3Module } from 'app/layout/vertical/layout-3/layout-3.module';

import { HorizontalLayout1Module } from 'app/layout/horizontal/layout-1/layout-1.module';
import { RecommendFamilyComponent } from './components/recommend-family/recommend-family.component';
import { AvataAreaComponent } from './components/avata-area/avata-area.component';
import {MatTabsModule} from "@angular/material/tabs";
import { ItemComponent } from './components/item/item.component';
import { GongjiComponent } from './components/gongji/gongji.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LevelBonusComponent } from './components/level-bonus/level-bonus.component';
import { AvatarComponent } from './components/avatar/avatar.component';
@NgModule({
    imports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,

        HorizontalLayout1Module,
        MatTabsModule,
        MatCheckboxModule
    ],
    exports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,

        HorizontalLayout1Module,
        RecommendFamilyComponent,
        AvataAreaComponent,
        GongjiComponent,
        LevelBonusComponent,
        AvatarComponent
    ],
    declarations: [RecommendFamilyComponent, AvataAreaComponent, ItemComponent, GongjiComponent, LevelBonusComponent, AvatarComponent]
})
export class LayoutModule
{
}
