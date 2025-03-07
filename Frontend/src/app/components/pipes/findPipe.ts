import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'find'
})
export class FindPipe implements PipeTransform {
    transform(items: any[], args: any): any {
        if (!items || !args) {
            return null;
        }
        return items.find(item => item[Object.keys(args)[0]] === args[Object.keys(args)[0]]);
    }
}