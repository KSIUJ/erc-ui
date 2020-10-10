<template>
    <v-form v-model="valid">
        <v-autocomplete
                v-model="item.member"
                :items="array.members"
                :item-text="memberName"
                item-value="id"
                :counter="64"
                label="Member"
        ></v-autocomplete>
        <v-select
                v-model="item.type"
                :counter="32"
                :items="items"
                label="Type"
        ></v-select>
    </v-form>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                valid: true,
                items: ["CARD_ID"],
            };
        },
        props: ['item', 'array'],
        methods: {
          memberName(item) {
            return item.given_name + ' ' + item.surname;
          },
        },
    });
</script>


