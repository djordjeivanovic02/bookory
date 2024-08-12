import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DownloadsService } from '../services/downloads.service';
import { CreateDownloadDto } from '../dtos/createDownload.dto';
import { Observable } from 'rxjs';
import { DownloadedBook } from '../entities/downloads.entity';

@Controller('downloads')
export class DownloadsController {
    constructor(private readonly downloadedService: DownloadsService){}

    @Post()
    create(@Body() createDownloadedDto: CreateDownloadDto): Observable<DownloadedBook> {
        return this.downloadedService.create(createDownloadedDto);
    }
    
    @Get('user-downloads/:id')
    findUserSavedAds(
        @Param('id') id: number,
        @Query('page') skip: number,
        @Query('limit') limit: number
    ): Observable<DownloadedBook[]> {
        return this.downloadedService.findUserDownloadedAds({skip, limit}, id);
    }
}
