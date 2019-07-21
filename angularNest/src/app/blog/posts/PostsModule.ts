import { NgModule } from '@angular/core';
import { PostListModule } from './list/PostListModule';
import { PostService } from './services/PostService';
import { PostResource } from './services/PostResource';
import { CreatePostDialogComponent } from '../posts/dialog/CreatePostDialogComponent';
import { ConfirmationDialogComponent } from '../../blog/dialogs/ConfirmationDialogComponent';
import { CommonMaterialModule } from '../../common/material/CommonMaterialModule';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        PostListModule,
        CommonModule,
        FormsModule,
        CommonMaterialModule

    ],
    exports: [
        PostListModule
    ],
    declarations: [
        CreatePostDialogComponent,
        ConfirmationDialogComponent
    ],
    entryComponents: [
        CreatePostDialogComponent,
        ConfirmationDialogComponent
    ],
    providers: [
        PostService,
        PostResource
    ],
})
export class PostsModule { }
