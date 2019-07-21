import { NgModule } from '@angular/core';
import {PostListComponent} from './PostListComponent';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '../../../common/material/CommonMaterialModule';

@NgModule({
    imports: [
        CommonModule,
        CommonMaterialModule

    ],
    exports: [
        PostListComponent
    ],
    declarations: [
        PostListComponent
    ],
    providers: [],
})
export class PostListModule { }
