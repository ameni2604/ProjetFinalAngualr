import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dinar',
  standalone: true
})
export class DinarPipe implements PipeTransform {

  transform(value:any ) {
        return `${value.toFixed(3)} TND`
  }

}
