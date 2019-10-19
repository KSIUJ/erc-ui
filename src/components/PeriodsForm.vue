<template>
    <v-form v-model="valid">
        <v-menu
                :close-on-content-click="false"
                :nudge-right="40"
                v-model="start_date_menu"
                transition="scale-transition"
                offset-y
                min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                        v-model="item.start_date"
                        label="Start date"
                        prepend-icon="mdi-event"
                        readonly
                        v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="item.start_date" @input="start_date_menu = false" ref="start_date_menu_ref">
            </v-date-picker>
        </v-menu>
        <v-menu
                :close-on-content-click="false"
                :nudge-right="40"
                v-model="end_date_menu"
                transition="scale-transition"
                offset-y
                min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                        v-model="item.end_date"
                        label="End date"
                        prepend-icon="mdi-event"
                        readonly
                        v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="item.end_date" @input="end_date_menu = false" ref="end_date_menu_ref">
            </v-date-picker>
        </v-menu>

    </v-form>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                valid: true,
                start_date_menu: false,
                end_date_menu: false,
            };
        },
        props: ['item'],
        methods: {},
        watch: {
            start_date_menu(val) {
                val && setTimeout(() => (this.$refs.start_date_menu_ref.activePicker = 'YEAR'));
            },
            end_date_menu(val) {
                val && setTimeout(() => (this.$refs.end_date_menu_ref.activePicker = 'YEAR'));
            },
        },
    });
</script>

