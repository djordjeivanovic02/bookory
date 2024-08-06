import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SavedService } from '../services/saved.service';
import { CreateSavedDto } from '../dtos/createSaved.dto';
import { Observable } from 'rxjs';
import { SavedBook } from '../entities/saved.entity';

@Controller('saved')
export class SavedController {
    constructor(private readonly savedService: SavedService){}

    @Post()
    create(@Body() createSavedDto: CreateSavedDto): Observable<SavedBook> {
        return this.savedService.create(createSavedDto);
    }

    @Get()
    status(@Query() data: CreateSavedDto): Observable<SavedBook> {
        return this.savedService.status(data);
    }
}
