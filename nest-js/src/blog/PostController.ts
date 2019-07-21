import { Controller, Get, Post, Put, Body, Delete, Param } from "@nestjs/common";
import { PostService } from "./services/PostService";
import { Observable } from "rxjs";
import { PostDto } from "./dtos/PostDto";
import { create } from "domain";
import { async } from "rxjs/internal/scheduler/async";
import { CreatePostDTO } from "./dtos/CreatePostDTO";
import { EditPostDTO } from "./dtos/EditPostDTO";
import { PostEntity } from "./entities/PostEntity";

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {}
    @Get()
    findAll(): Observable<PostEntity[]> {
        return this.postService.findAll();
    }
    
    @Post() 
    async create(@Body() createPostDTO: CreatePostDTO): Promise<PostDto> {
        return this.postService.create(createPostDTO);
    }

    @Put() 
    async edit(@Body() editPostDTO: EditPostDTO): Promise<PostDto> {
        return this.postService.edit(editPostDTO);
    }

    @Delete(':id')
    delete(@Param() postId: number) {
        return this.postService.delete(postId);
    }

}