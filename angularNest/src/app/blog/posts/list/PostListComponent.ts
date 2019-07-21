import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/PostService';
import { Observable, BehaviorSubject } from 'rxjs';
import { PostDto } from '../services/dataModel/PostDto';
import { MatDialog, MatSnackBar } from '@angular/material';

import { CreatePostDialogComponent } from '../dialog/CreatePostDialogComponent';
import { ConfirmationDialogComponent } from '../../dialogs/ConfirmationDialogComponent';

import { take, finalize } from 'rxjs/operators';
import { EditPostDto } from '../services/dataModel/EditPostDto';
import * as _ from 'lodash';

@Component({
    selector: 'app-post-list',
    templateUrl: 'postList.html',
    styleUrls: ['postStyles.scss']
})

export class PostListComponent implements OnInit {
    public isLoading = false;
    private postListSubject: BehaviorSubject<PostDto[]> = new BehaviorSubject(null);
    public displayedColumns: string[] = ['id', 'title', 'subTitle', 'imageUrl', 'delete', 'edit'];
    constructor(private postService: PostService, private matDialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit() { 
        this.isLoading = true;
        this.postService.getAllPostItems().pipe(finalize( () => this.isLoading = false)).subscribe( (postListItems) => this.postListSubject.next(postListItems) );
    }

    public getPostList(): Observable<PostDto[]> {
        return this.postListSubject.asObservable();
    }

    public editPost(editPost: EditPostDto) {

        const ref = this.matDialog.open(CreatePostDialogComponent,{
            height: '400px',
            width: '600px',
            data: { editPostDto: editPost }
        });

        ref.afterClosed().subscribe( (editedPost: PostDto)  => {
            if(editedPost) {
                const list = this.postListSubject.getValue();
                list.map((value,index) => {
                  if(editedPost.id === list[index].id) {
                        list[index] = editedPost;
                    }
                });
                var cloned = JSON.parse(JSON.stringify(list));
                this.postListSubject.next(cloned);
                
                
                //  const postIndex = _.findIndex(list, post => post.id === editPost.id);
                
                //  console.log('index2',postIndex);
                // list[postIndex] = editedPost;
                // var cloned = JSON.parse(JSON.stringify(list));
                // this.postListSubject.next(cloned);
               
            }
        })
    }
    
    public deletePost(postDto: PostDto) {
       console.log('postId',postDto);
       const ref = this.matDialog.open(ConfirmationDialogComponent);

       

    ref.afterClosed().subscribe( (canContinue)  => {
        if(canContinue) {
            this.isLoading = true;
            this.postService.deletePost(postDto.id)
                    .pipe(finalize(() => this.isLoading = false))
                    .subscribe(() => {
                     
                        const list = this.postListSubject.getValue();
                        _.remove(list, post => post.id === postDto.id);
                        this.postListSubject.next(_.cloneDeep(list));

                        this.snackBar.open(`Post ${postDto.title} has been removed`, null , {
                            duration: 2500,
                        });
                        // list.map((value,index) => {
                        //     if(postDto.id === list[index].id) {
                        //         console.log('aaa');
                        //         list.slice(0,index);
                                  
                        //       }
                        //   });
                       
                        // var cloned = JSON.parse(JSON.stringify(list));
                        // this.postListSubject.next(cloned);
                    });
        }
    })
}

    public createPost() {
       const ref = this.matDialog.open(CreatePostDialogComponent,{
            height: '400px',
            width: '600px'
        });

        ref.afterClosed().subscribe( (newPost: PostDto)  => {
            if(newPost) {
                const list = this.postListSubject.getValue();
                list.push(newPost);
                var cloned = JSON.parse(JSON.stringify(list));
                this.postListSubject.next(cloned);
                this.snackBar.open(`Post ${newPost.title} has been created`, null , {
                    duration: 2500,
                });
            }
        })
        
    }

}

