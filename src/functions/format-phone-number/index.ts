export class PhoneNumber {
    static format(value: string) {
      if (!value) return "";
      const numbers = this.removeFormatting(value);
      return this.formatPhoneNumber(numbers);
    }
  
    static removeFormatting(value: string) {
      if (!value) return "";
      return value.replace(/\D/g, "");
    }
  
    static formatPhoneNumber(numbers: string) {
      const areaCode = numbers.slice(0, 2);
      const prefix = numbers.slice(2, 7);
      const suffix = numbers.slice(7);
  
      return `${areaCode} ${prefix}-${suffix}`;
    }
  
    static insertNumber(value: string, number: string) {
      if (!value) return number;
      if (value.length === 2) return `${value} ${number}`;
      if (value.length === 7) return `${value}-${number}`;
      return `${value}${number}`;
    }
  }