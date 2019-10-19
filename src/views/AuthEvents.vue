<template>
    <div class="container page">
        <crudtable :title="'Auth events'" :readonly="true" :headers="headers"
                   :urls="urls"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import CRUDTable from '../components/CRUDTable.vue';
    import {api} from '@/common/api';

    const TYPES = {
        CARD: 'Card',
        LDAP: 'LDAP',
        DISCORD: 'Discord',
        EMAIL: 'Email',
    };

    export default Vue.extend({
        data() {
            return {
                headers: [
                    {
                        text: 'Date',
                        value: 'date',
                        transform: (val) =>
                            new Date(Date.parse(val)).toUTCString(),
                    },
                    {
                        text: 'Client',
                        value: 'client',
                    },
                    {
                        text: 'Type',
                        value: 'type',
                        transform: (val) => TYPES[val],
                    },
                    {
                        text: 'Value',
                        value: 'value',
                    },
                    {
                        text: 'Member',
                        value: 'member',
                    },
                    {
                        text: 'Success',
                        value: 'success',
                    },
                ],
                urls: {
                    main: api.authevents,
                },
            };
        },
        components: {
            crudtable: CRUDTable,
        },
    });
</script>
