import { Injectable } from "@nestjs/common";
import { Observable, of, from } from "rxjs";
import { map } from "rxjs/operators";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import { MockedPost } from "../mock/MockedPosts";
import { PostEntity } from "../entities/PostEntity";
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import { EditPostDTO } from '../dtos/EditPostDTO';
import { PostDto } from '../dtos/PostDto';
import * as _ from 'lodash';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
      ) {}
    
     public findAll() : Observable<PostEntity[]> {
        return from(this.postRepository.find())
        .pipe(map( (posts) => _.orderBy(posts,['id'], ['desc'])));
    }
    

    public create(createPostDTO: CreatePostDTO): Promise<PostDto> {
        return this.postRepository.save(createPostDTO);
    }

    public edit(editPostDTO: EditPostDTO): Promise<PostDto> {
        return this.postRepository.save(editPostDTO);
    }

    public delete(postID: number): void {
      this.postRepository.delete(postID);
    }

   
}