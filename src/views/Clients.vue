<template>
    <div class="container page">
        <crudtable :title="'Clients'" :headers="headers" :model="model" :urls="urls">
            <template v-slot:edit-or-create="props">
                <clientsform :item="props.item" :array="props.array"></clientsform>
            </template>
        </crudtable>
    </div>
</template>

<script>
    import Vue from 'vue';
    import CRUDTable from '../components/CRUDTable.vue';
    import ClientsForm from '../components/ClientsForm';
    import {api} from '@/common/api';

    export default Vue.extend({
        data() {
            return {
                headers: [
                    {
                        text: 'Name',
                        value: 'name',
                    },
                    {
                        text: 'Client id',
                        value: 'client_id',
                    },
                    {
                        text: 'Enabled',
                        value: 'enabled',
                    },
                    {
                        text: 'Permissions',
                        value: 'permissions',
                        transform: (val, array) =>
                            val.map((x) => array.roles.find((v) => v.id === x).name).join(', '),
                    },
                ],
                model: {
                    client_id: null,
                    enabled: false,
                    name: null,
                    permissions: [],
                    secret: null,
                },
                urls: {
                    main: api.clients,
                    roles: api.roles,
                },
            };
        },
        components: {
            crudtable: CRUDTable,
            clientsform: ClientsForm,
        },
    });
</script>
