<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="item.given_name"
                :counter="128"
                label="Given name"
        ></v-text-field>
        <v-text-field
                v-model="item.surname"
                :counter="128"
                label="Surname"
        ></v-text-field>
        <v-text-field
                v-model="item.email"
                :counter="128"
                label="Email"
                type="email"
        ></v-text-field>
        <v-text-field
                v-model="item.card_id"
                :counter="20"
                label="Card ID"
        >
            <template v-slot:append-outer>
                <v-btn dark color="info" @click.stop="get_last_card_id" :disabled="processing">
                    <v-icon left>mdi-sync</v-icon>
                    Use last scanned ID
                </v-btn>
            </template>
        </v-text-field>
        <v-text-field
                v-model="item.discord_id"
                :counter="128"
                label="Discord"
        ></v-text-field>
        <v-text-field
                v-model="item.ldap_uid"
                :counter="64"
                label="LDAP"
        ></v-text-field>
        <v-row no-gutters>
            <v-col cols="3">
                <v-checkbox
                        v-model="item.do_not_contact"
                        label="Do not contact"
                ></v-checkbox>
            </v-col>
            <v-col cols="3">
                <v-checkbox
                        v-model="item.tshirt"
                        label="T-shirt"
                ></v-checkbox>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
    import Vue from 'vue';
    import {api} from '../common/api';

    export default Vue.extend({
        data() {
            return {
                valid: true,
                processing: false,
            };
        },
        props: ['item'],
        methods: {
            get_last_card_id() {
                this.processing = true;
                Vue.axios.get(api.last_scanned_id, {withCredentials: true})
                    .then((response) => {
                        const json = response.data;
                        this.item.card_id = json.card_id;
                        this.processing = false;
                    });
            },
        },
    });
</script>

