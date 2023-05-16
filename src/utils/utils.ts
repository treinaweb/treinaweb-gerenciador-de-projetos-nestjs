import { parse, formatISO } from 'date-fns';

export class Utils {
  converterParaDataISO(dateString: string) {
    const date = parse(dateString, 'dd/MM/yyyy', new Date());
    return formatISO(date);
  }

  formatDecimal(decimal: number) {
    return parseInt(String(decimal).replace(/[\.\,]/g, ''));
  }
}
