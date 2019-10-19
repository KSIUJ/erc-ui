<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="item.name"
                :counter="128"
                label="Name"
        ></v-text-field>
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
        props: ['item'],
    });
</script>

