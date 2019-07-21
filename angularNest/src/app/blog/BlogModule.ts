import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PostsModule } from './posts/PostsModule';
import { CommonMaterialModule } from '../common/material/CommonMaterialModule';

@NgModule({
    imports: [
        HttpClientModule,
        PostsModule,
        CommonMaterialModule
    ],
    exports: [
        PostsModule,
        CommonMaterialModule

    ],
    declarations: [],
    providers: [
       
    ],
})
export class BlogModule { }
