import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { error } from "console";
import { Response } from "express";
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter{
    catch(exception: MongoServerError, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'something wrong with the database';

        if(exception.code === 11000){
            status = HttpStatus.CONFLICT;
            message = 'data with this name already exist please choose another name';
        }

        response.status(status).json({
            statusCode : status,
            error : 'Database Error',
            message : message,
        });
    }
}