<template>
    <div class="container page">
        <crudtable :title="'Periods'" :headers="headers" :model="model" :urls="urls">
            <template v-slot:edit-or-create="props">
                <periodsform :item="props.item"></periodsform>
            </template>
        </crudtable>
    </div>
</template>

<script>
    import Vue from 'vue';
    import CRUDTable from '../components/CRUDTable.vue';
    import PeriodsForm from '../components/PeriodsForm.vue';
    import {api} from '../common/api';

    export default Vue.extend({
        data() {
            return {
                headers: [
                    {
                        text: 'Start date',
                        value: 'start_date',
                    },
                    {
                        text: 'End date',
                        value: 'end_date',
                    },
                ],
                model: {
                    start_date: null,
                    end_date: null,
                },
                urls: {
                    main: api.periods,
                },
            };
        },
        components: {
            crudtable: CRUDTable,
            periodsform: PeriodsForm,
        },
    });
</script>

