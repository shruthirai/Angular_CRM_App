import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customerFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    

    /* Typed Value */
    if(!value)return null;

    /* whole customerlist */
    if (!args) {
      return value;
    }

    args = args.toLowerCase();

    return value.filter((val) => {
      console.log('args',val)
      let rVal = (val.name.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }
}