<script setup lang="ts">
  import { ref } from 'vue'
  import type { IHeader, IDataRow, ISelector} from '@/interfaces'
  import UniversalTable from './../components/UniversalTable.vue'

  const dictionary1 = [{name: 'aaa', id: 1},  {name: 'bbb', id: 2},  {name: 'ccc', id:3}]
  const dictionary2 = [{name: 'ddd', id: 1},  {name: 'eee', id: 2},  {name: 'ggg', id:3}]

  const select1: ISelector = {selected_value: null, options: dictionary1}  // Селект1
  const select2: ISelector = {selected_value: null, options: dictionary2}  // Селект2
  const select3: ISelector = {selected_value: 1,    options: dictionary1}  // Селект3
  const select4: ISelector = {selected_value: 2,    options: dictionary2}  // Селект4

  const header = ref<IHeader[]>([{key: 'A', readonly: true,  type: 'input'},
                                 {key: 'B', readonly: false, type: 'input'},
                                 {key: 'C', readonly: true,  type: 'select'},
                                 {key: 'D', readonly: false, type: 'select'},
                                 {key: 'Q', readonly: false, type: 'input'},
                                 {key: 'E', readonly: true,  type: 'formula', formula: null},
                                 {key: 'F', readonly: false, type: 'formula', formula: {arg1: 'A', arg2: 'B', operator: '-'}},])

  const data = ref<IDataRow[]>([['1',  '2',  select1, select2, '5',  null, null],
                                ['3',  '4',  select3, select4, '18', null, null],
                               ])
</script>

<template>
    <div>
      <!-- <h1>header</h1>
      {{ header }}
      <h1>data</h1>
      {{ data }} -->
      
      <UniversalTable :tableHeader="header" :tableData="data"/>
    </div>
</template>
 