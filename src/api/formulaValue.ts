
import type { IHeader, IDataRow } from '@/interfaces'

function isNumeric(str:any):boolean {
    if (typeof str != 'string') return false // Обрабатываем только строки  
    return !isNaN(Number(str)) && !isNaN(parseFloat(String(str))) 
}

export const getFormulaValue = (row: IDataRow, tableHeader: IHeader[], headers: string[], index: number):string => {

    if (tableHeader[index].formula) {

        const operator :string = tableHeader[index].formula.operator
        const arg1index:number = headers.indexOf(tableHeader[index].formula.arg1)  // Определяем индекс первого аргумента
        const arg2index:number = headers.indexOf(tableHeader[index].formula.arg2)  // Определяем индекс второго аргумента

        if (arg1index < 0 || arg2index < 0 ) return 'Неверная формула'             // Если хотя бы один из индексов не найден

        const prefix   :string = row[arg1index] + ' ' + operator + ' ' + row[arg2index] + ' = ' // A + B = 

        if (isNumeric(row[arg1index]) && isNumeric(row[arg2index])) {
            
            if (operator == '+') 
                return prefix + (Number(row[arg1index]) + Number(row[arg2index]))
            else 
                return prefix + (Number(row[arg1index]) - Number(row[arg2index]))

        } else 
            return 'Аргумент(ы) не число'
        
    } else 
        return 'Это не формула'
    
}

