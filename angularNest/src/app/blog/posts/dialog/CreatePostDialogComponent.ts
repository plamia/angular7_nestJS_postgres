import { Component, Inject, OnInit } from '@angular/core';
import { CreatePostDto } from '../services/dataModel/CreatePostDto';
import { PostService } from '../services/PostService';
import { take, finalize } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { EditPostDto } from '../services/dataModel/EditPostDto';
import { Observable } from 'rxjs';
import { PostDto } from '../services/dataModel/PostDto';

@Component({
    selector: 'app-post-dialog',
    templateUrl: 'createPostDialog.html'
})

export class CreatePostDialogComponent implements OnInit {
    public newPostModel: CreatePostDto | EditPostDto = {} as CreatePostDto;
    public isLoading = false;
    public isEditing = false;

    constructor(private dialogRef: MatDialogRef<CreatePostDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {editPostDto: EditPostDto}, private postService: PostService) { }

    ngOnInit(): void {
        this.isEditing = !!_.get(this.data, 'editPostDto');
        if(this.isEditing) {
            this.newPostModel = _.clone(this.data.editPostDto);
        }
    }
    public submit(form: NgForm) {
            if(form.valid) {
                this.isLoading = true;
            this.handleAfterSubmit(
                this.isEditing ? this.postService.editPost(this.newPostModel as EditPostDto) : this.postService.createPost(this.newPostModel)
            );

        }
    }

    private handleAfterSubmit(observable: Observable<PostDto>) {
        return observable
                .pipe(finalize( () => this.isLoading = false)).subscribe( (resp) => {
                    
                    this.dialogRef.close(resp);
                });
    }
}