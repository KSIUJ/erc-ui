<template>
    <div class="container page">
        <crudtable :title="'Roles'" :headers="headers" :model="model" :urls="urls">
            <template v-slot:edit-or-create="props">
                <rolesform :item="props.item"></rolesform>
            </template>
        </crudtable>
    </div>
</template>

<script>
    import Vue from 'vue';
    import CRUDTable from '../components/CRUDTable.vue';
    import RolesForm from '../components/RolesForm.vue';
    import {api} from '@/common/api';

    export default Vue.extend({
        data() {
            return {
                headers: [
                    {
                        text: 'Name',
                        value: 'name',
                    },
                ],
                model: {
                    name: null,
                },
                urls: {
                    main: api.roles,
                },
            };
        },
        components: {
            crudtable: CRUDTable,
            rolesform: RolesForm,
        },
    });
</script>
