export interface IFormula { // Формула
    arg1: string;
    arg2: string;
    operator: string
}

export interface ISelectItem {
  name: string
  id: number
}

export interface ISelector { // селект состит из
    options:ISelectItem[]
    selected_value: number | null
}

export interface IHeader { // Заголовок состоит из
    key      : string;
    readonly : boolean;
    type     : string
    formula  ?: IFormula | null
}

export interface IDataRow { // Строка таблицы с данными состоит из
    [index: number]: ISelector | string | null | number
}

 