<template>
    <div>
        <v-card-text v-if="editedItem">
            <memberform :item="editedItem.member"></memberform>
            <v-select
                    v-model="editedItem.period"
                    :items="array.periods"
                    item-value="id"
                    :item-text="periodText"
                    label="Period"
            ></v-select>
            <v-select
                    v-model="editedItem.roles"
                    :items="array.roles"
                    item-value="id"
                    item-text="name"
                    label="Roles"
                    multiple
            ></v-select>
            <v-checkbox
                    v-model="editedItem.fee_paid"
                    label="Fee paid"
            ></v-checkbox>
        </v-card-text>
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" text @click.stop="submit" :disabled="processing">
                Submit
            </v-btn>
        </v-card-actions>
        <v-snackbar
                v-model="popup"
                top
                @click.stop="popup = false"
                color="success"
                :timeout="3000"
        >
            Membership prolonged
        </v-snackbar>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {memberText, periodText} from '../common/utils';
    import {api} from '@/common/api';
    import MemberForm from './MemberForm';

    export default Vue.extend({
        data() {
            return {
                memberText,
                periodText,
                model: {
                    member: {
                        given_name: null,
                        surname: null,
                        email: null,
                        card_id: null,
                        discord_id: null,
                        ldap_uid: null,
                        do_not_contact: false,
                        tshirt: false,
                    },
                    period: null,
                    roles: [],
                    fee_paid: false,
                },
                editedItem: undefined,
                popup: false,
                processing: false,
            }
        },
        methods: {
            submit() {
                const view = this;
                this.processing = true;
                Vue.axios.post(api.enroll, this.editedItem).then(function () {
                    view.popup = true;
                    view.clear();
                    view.processing = false;
                });
            },
            clear() {
                this.editedItem = JSON.parse(JSON.stringify(this.model));
                console.log(this.editedItem);
            },
        },
        mounted() {
            this.clear();
        },
        props: ['array'],
        components: {
            memberform: MemberForm,
        }
    });
</script>

<style scoped>

</style>
