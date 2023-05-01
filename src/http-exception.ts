import {
    Catch,
    ExceptionFilter,
    HttpException,
    ArgumentsHost,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status: number = 400;
        try {
            status = exception.getStatus();
        } catch (error) { }
        // console.log(" exception :: ", exception)
        response.status(status).json({
            code: status,
            message: exception.message,
            status: 'fail',
        });
    }
}
