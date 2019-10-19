<template>
    <div>
        <v-card-text v-if="editedItem">
            <v-autocomplete
                    v-model="editedItem.member"
                    label="Member"
                    :items="array.members"
                    item-value="id"
                    :item-text="memberText"
            >
            </v-autocomplete>
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

    export default Vue.extend({
        data() {
            return {
                memberText,
                periodText,
                model: {
                    member: null,
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
                Vue.axios.post(api.memberships, this.editedItem).then(function () {
                    view.popup = true;
                    view.clear();
                    view.processing = false;
                });
            },
            clear() {
                this.editedItem = JSON.parse(JSON.stringify(this.model));
            },
        },
        mounted() {
            this.clear();
        },
        props: ['array'],
    });
</script>

<style scoped>

</style>
