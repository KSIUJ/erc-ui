<template>
    <div class="container page">
        <crudtable :title="'Members'" :headers="headers" :model="model" :urls="urls" :expandable="true">
            <template v-slot:edit-or-create="props">
                <memberform :item="props.item"></memberform>
            </template>
            <template v-slot:expanded-item="props">
                <membermemberships :member="props.item" :topheaders="props.headers" :toparray="props.array"></membermemberships>
            </template>
        </crudtable>
    </div>
</template>

<script>
    import Vue from 'vue';
    import CRUDTable from '../components/CRUDTable.vue';
    import MemberForm from '../components/MemberForm.vue';
    import MemberMemberships from '../components/MemberMemberships.vue';
    import {api} from '../common/api.js';

    export default Vue.extend({
        data() {
            return {
                headers: [
                    {
                        text: 'First name',
                        value: 'given_name',
                    },
                    {
                        text: 'Last name',
                        value: 'surname',
                    },
                    {
                        text: 'Email',
                        value: 'email',
                    },
                    {
                        text: 'Discord',
                        value: 'discord_id',
                    },
                    {
                        text: 'LDAP',
                        value: 'ldap_uid',
                    },
                ],
                model: {
                    given_name: null,
                    surname: null,
                    email: null,
                    card_id: null,
                    discord_id: null,
                    ldap_uid: null,
                    do_not_contact: false,
                    tshirt: false,
                },
                urls: {
                    main: api.members,
                    roles: api.roles,
                    periods: api.periods,
                },
            };
        },
        components: {
            crudtable: CRUDTable,
            memberform: MemberForm,
            membermemberships: MemberMemberships,
        },
    });
</script>
