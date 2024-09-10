import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { SavedService } from '../services/saved.service';
import { CreateSavedDto } from '../dtos/createSaved.dto';
import { Observable } from 'rxjs';
import { SavedBook } from '../entities/saved.entity';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('saved')
export class SavedController {
    constructor(private readonly savedService: SavedService){}

    @Post()
    @Roles('author', 'user')
    @UseGuards(RolesGuard)
    create(@Body() createSavedDto: CreateSavedDto): Observable<SavedBook> {
        return this.savedService.create(createSavedDto);
    }

    @Get()
    status(@Query() data: CreateSavedDto): Observable<SavedBook> {
        return this.savedService.status(data);
    }
    
    @Get('user-saves/:id')
    @Roles('author', 'user')
    @UseGuards(RolesGuard)
    findUserSavedAds(
        @Param('id') id: number,
        @Query('skip') skip: number,
        @Query('limit') limit: number
    ): Observable<SavedBook[]> {
        return this.savedService.findUserSavedAds({skip, limit}, id);
    }

    @Get('all-user-saves/:id')
    @Roles('author', 'user')
    @UseGuards(RolesGuard)
    findUserAllSaves(@Param('id') id: number){
        return this.savedService.getUserSaves(id);
    }

    @Delete('by-user-book/:user_id/:book_id')
    @Roles('author', 'user')
    @UseGuards(RolesGuard)
    removeWithUserAndBook(
        @Param('user_id') user_id: number,
        @Param('book_id') book_id: number
    ): Observable<DeleteResult>{
        return this.savedService.removeWithUserAndBook(user_id, book_id);
    }

    @Delete(':id')
    @Roles('author', 'user')
    @UseGuards(RolesGuard)
    remove(@Param('id') id: number) {
        return this.savedService.remove(id);
    }
}
