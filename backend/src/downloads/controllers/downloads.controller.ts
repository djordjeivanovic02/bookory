import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { DownloadsService } from '../services/downloads.service';
import { CreateDownloadDto } from '../dtos/createDownload.dto';
import { Observable } from 'rxjs';
import { DownloadedBook } from '../entities/downloads.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('downloads')
export class DownloadsController {
    constructor(private readonly downloadedService: DownloadsService){}

    @Post()
    @Roles('author', 'user')
    @UseGuards(RolesGuard)
    create(@Body() createDownloadedDto: CreateDownloadDto): Observable<DownloadedBook> {
        return this.downloadedService.create(createDownloadedDto);
    }
    
    @Get('user-downloads/:id')
    @Roles('author', 'user')
    @UseGuards(RolesGuard)
    findUserSavedAds(
        @Param('id') id: number,
        @Query('skip') skip: number,
        @Query('limit') limit: number
    ): Observable<DownloadedBook[]> {
        return this.downloadedService.findUserDownloadedAds({skip, limit}, id);
    }
}
