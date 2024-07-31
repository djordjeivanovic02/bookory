import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthPayloadDtoRegister } from '../dto/autth-pay-load.dto';
import { CreateAuthorDto } from 'src/author/dtos/createAuthor.dto';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { catchError, map, Observable, of } from 'rxjs';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request){
        return req.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request){
        return req.user;
    }

    @Post('registerUser')
    registerUser(@Body() userData: CreateUserDto): Observable<{ success: boolean; data?: any; message?: string }> {
        return this.authService.registerUser(userData).pipe(
            map(result => ({ success: true, data: result })),
            catchError(error => of({ success: false, message: error.message })),
        );
    }

    @Post('registerAuthor')
    registerAuthor(@Body() authorData: CreateAuthorDto): Observable<{ success: boolean; data?: any; message?: string }> {
        return this.authService.registerAuthor(authorData).pipe(
            map(result => ({ success: true, data: result })),
            catchError(error => of({ success: false, message: error.message })),
        );
    }
}