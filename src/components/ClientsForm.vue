<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="item.name"
                :counter="64"
                label="Name"
        ></v-text-field>
        <v-text-field
                v-model="item.client_id"
                :counter="32"
                label="client ID"
        ></v-text-field>
        <v-text-field
                v-model="item.secret"
                :counter="64"
                label="Secret"
        ></v-text-field>
        <v-select
                v-model="item.permissions"
                :items="array.roles"
                item-value="id"
                item-text="name"
                label="Permissions"
                multiple
        ></v-select>
        <v-checkbox
                v-model="item.enabled"
                label="Enabled"
        ></v-checkbox>
    </v-form>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                valid: true,
            };
        },
        props: ['item', 'array'],
        methods: {
        },
    });
</script>


