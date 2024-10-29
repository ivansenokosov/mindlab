<script setup lang="ts">
    import {onBeforeMount, ref, watch} from 'vue'
    import Select    from 'primevue/select';
    import type { ISelectItem } from '@/interfaces';

    const props = defineProps(['options'])
    const model = defineModel()
    const innerModel = ref<ISelectItem|null>(null)

    watch(innerModel, () => {
        if (innerModel.value) {
            model.value = innerModel.value.id
        }
    })

    onBeforeMount(() => {
        innerModel.value = props.options.find((item: ISelectItem) => item.id === model.value)
    })

</script>

<template>
    <Select :options="options" optionLabel="name" v-model="innerModel" placeholder="Выбрать"/>
</template>
