export class SearchField  {
  order: number;
  name: string;
  label: {
    bold: string;
    normal: string;
  };
  size: string;
  placeholder: string;
  type: 'inputText' | 'inputNumber' | 'inputDate' | 'select'; // Se debe agregar mas tipos si se requiere
  options?: SelectField[]; // Se utiliza cuando el campo es de tipo "select"
}

export class SelectField  {
  value: string | number;
  label: string;
}
