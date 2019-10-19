<template>
    <v-container class="container page">
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>KSI Computer Science Students' Association</v-card-title>
                    <v-card-text></v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Quick enroll</v-card-title>
                    <v-skeleton-loader
                            type="list-item@5, list-item-two-line@2, list-item@4, list-item-two-line@2, actions"
                            :loading="loading"
                    >
                        <div>
                            <enrollmember v-if="!loading" :array="array"></enrollmember>
                        </div>
                    </v-skeleton-loader>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Prolong membership</v-card-title>
                    <v-skeleton-loader
                            type="list-item@4, list-item-two-line, actions"
                            :loading="loading"
                    >
                        <div>
                            <prolongmembership v-if="!loading" :array="array"></prolongmembership>
                        </div>
                    </v-skeleton-loader>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import Vue from 'vue';
    import MemberForm from '../components/MemberForm';
    import {api} from '@/common/api';
    import ProlongMembership from '@/components/ProlongMembership';
    import EnrollMember from '@/components/EnrollMember';

    export default Vue.extend({
        data() {
            return {
                array: undefined,
                urls: {
                    members: api.members,
                    roles: api.roles,
                    periods: api.periods,
                },
                memberModel: {
                    given_name: null,
                    surname: null,
                    email: null,
                    card_id: null,
                    discord_id: null,
                    ldap_uid: null,
                    do_not_contact: false,
                    tshirt: false,
                },
            }
        },
        methods: {
            load() {
                this.array = undefined;
                const top = this;
                Promise.all(Object.keys(top.urls).map(function (key) {
                    return Vue.axios.get(top.urls[key] + '?format=json');
                })).then(function (value) {
                    const arr = {};
                    Object.keys(top.urls).forEach(function (key, idx) {
                        arr[key] = value[idx].data;
                    });
                    top.array = arr;
                });
            },
            periodText(item) {
                return item.start_date + ' - ' + item.end_date;
            },
            memberText(item) {
                return item.given_name + ' ' + item.surname;
            },
        },
        mounted() {
            this.load();
        },
        computed: {
            loading() {
                return this.array === undefined;
            },
        },
        components: {
            memberform: MemberForm,
            prolongmembership: ProlongMembership,
            enrollmember: EnrollMember,
        },
    });
</script>
