import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from "@nestjs/common";
import { pipe } from "rxjs";
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@pipe()
export class ValidationPipe implements PipeTransform<any>{
    private toValidate(metatype) : boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (!metatype || this.toValidate(metatype)){
            return value;
        }

        const object = plainToClass(metatype,value);
        const err = await validate(object);
        if (err.length > 0) {
            console.log('validate errors', err);
            throw new HttpException('error', HttpStatus.BAD_REQUEST);
        } 
        return value;
    }
    
}



