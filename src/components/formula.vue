<script setup lang="ts">
    import { computed, onBeforeMount } from 'vue';
    import Tag from 'primevue/tag';
   import Select from 'primevue/select';
   import type { IFormula } from '@/interfaces';

   const model = defineModel<IFormula>()
   const props = defineProps(['args'])

   const severity = computed(() => { if (model.value) 
                                        if (model.value.operator === '+') 
                                            return 'success' 
                                        else 
                                            return 'danger' 
                                    })

    const change = () => {  if (model.value)
                                if (model.value.operator === '+') 
                                    model.value.operator = '-'
                                else
                                    model.value.operator = '+' 
                        }
    
    onBeforeMount(() => {
        if (!model.value) model.value = {arg1: props.args[0], arg2: props.args[0], operator: '+' }  // Если формула не передана инициализурем в это значение
    })

    
</script>

<template>
    <div class="field align-items-center" v-if="model">

    <Select :options="args" v-model = "model.arg1"/>

    <Tag style="margin:5px" :value="model.operator" :severity="severity" @click="() => change()"/>

    <Select :options="args" v-model = "model.arg2"/>
    </div>
</template>