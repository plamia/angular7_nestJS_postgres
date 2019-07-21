import { Injectable } from '@angular/core';
import { PostResource } from './PostResource';
import { Observable } from 'rxjs';

import { CreatePostDto } from './dataModel/CreatePostDto';
import { PostDto } from './dataModel/PostDto';
import { EditPostDto } from './dataModel/EditPostDto';

@Injectable()
export class PostService {

    constructor(private postResource: PostResource) { }

    public getAllPostItems(): Observable<PostDto[]> {
        return this.postResource.findAll();
    }

    public createPost(createPostDto: CreatePostDto): Observable<PostDto> {
        return this.postResource.create(createPostDto);
    }

    public editPost(editPostDto: EditPostDto): Observable<PostDto> {
        return this.postResource.edit(editPostDto);
    }

    public deletePost(postId: number): Observable<void> {
        return this.postResource.delete(postId);
    }

}