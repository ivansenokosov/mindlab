<script setup lang="ts">
    import {  ref, onBeforeMount } from 'vue';
    import InputText from 'primevue/inputtext';
    import Tag       from 'primevue/tag';
    import { getFormulaValue } from '@/api/formulaValue';
    import type { IHeader, IDataRow } from '@/interfaces';
    import UniversalSelect from '@/components/UniversalSelect.vue'
    import Formula from './formula.vue';

    const props     = defineProps(['tableHeader','tableData']);
    const headers   = ref<string[]>([]) // Ключи заголовка 
    var   dataValid = true

    onBeforeMount(() => {
        // Если данные на найдены, сразу говорим, что данные не валидны
        if (!props.tableHeader || !props.tableData) {
            dataValid = false
            return 
        }

        // Формируем список ключей заголовка
        headers.value = props.tableHeader.map((item:IHeader) => item.key);

        // Проверка но соответствие длины строк данных таблицы длине заголовка

        props.tableData.forEach((element:IDataRow) => {
            if (Object.keys(element).length != Object.keys(headers.value).length) {
                dataValid = false;
                return;
            }
        });
    })
</script>

<template>
    <div v-if="dataValid"> 
        <!-- Рисуем таблицу, если данные нормальные -->
        <table>
            <tbody>
                <tr>
                    <td v-for="(column, index) in tableHeader">
                        <div class="field font-bold" >
                            <h2>{{ tableHeader[index].key }}</h2>
                        </div>
                        <Formula v-model="tableHeader[index].formula" :args="headers" v-if = "tableHeader[index].type == 'formula'"/>
                    </td>
                </tr>

                <tr v-for="row in tableData">
                    <td v-for="(column, index) in tableHeader">
                        <InputText v-model="row[index]" :disabled=tableHeader[index].readonly v-if="tableHeader[index].type == 'input'"/>
                        <UniversalSelect v-model="row[index].selected_value" :options="row[index].options" :disabled=tableHeader[index].readonly v-if="tableHeader[index].type == 'select'"/>
                        
                        <template v-if="tableHeader[index].type == 'formula'">
                            {{ getFormulaValue(row, tableHeader, headers, index) }} 
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        <Tag severity="danger" value="Данные невалидны"/>
    </div>
</template>

<style scoped>
    table { width: 1500px } 
    table, th, td { border: 1px solid; border-collapse: collapse; }
    td { padding: 5px;}
    td { text-align: center;}
</style>
