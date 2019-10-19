<template>
    <td :colspan="topheaders.length">
        <v-data-table :headers="tableHeaders" :loading="array === undefined" :items="mainArray"
                      loading-text="Loading... Please wait" disable-filtering disable-pagination disable-sort
                      hide-default-footer>
            <template v-slot:item.action="{ item }">
                <v-btn dark icon @click.stop="editItemDialog(item)">
                    <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn dark icon @click.stop="deleteItemDialog(item)">
                    <v-icon small>mdi-delete</v-icon>
                </v-btn>
            </template>
            <template v-slot:header.action="{ header }">
                <v-btn dark icon @click.stop="createItemDialog()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <v-dialog v-model="deleteDialog" max-width="800">
            <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-text>
                    <v-list two-line v-if="toDelete">
                        <v-list-item v-for="header in headers">
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{header.text}}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{toDelete[header.value]}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn text @click.stop="deleteDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="error" text @click.stop="deleteItem()">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="editOrCreateDialog" max-width="1500">
            <v-card>
                <v-card-title class="headline">
                    <span v-if="isEditItemPresent()">Edit</span>
                    <span v-else>Create</span>
                </v-card-title>
                <v-card-text v-if="editOrCreateDialog">
                    <v-select
                            v-model="editedItem.period"
                            :items="toparray.periods"
                            item-value="id"
                            :item-text="periodText"
                            label="Period"
                    ></v-select>
                    <v-select
                            v-model="editedItem.roles"
                            :items="toparray.roles"
                            item-value="id"
                            item-text="name"
                            label="Permissions"
                            multiple
                    ></v-select>
                    <v-checkbox
                            v-model="editedItem.fee_paid"
                            label="Fee paid"
                    ></v-checkbox>


                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn text @click.stop="editOrCreateDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" text @click.stop="submitEditOrCreate">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </td>
</template>

<script>
    import Vue from 'vue';
    import {transform} from '../common/transform';
    import {api} from '@/common/api';

    export default Vue.extend({
        data() {
            return {
                toDelete: undefined,
                deleteDialog: false,
                editedItem: undefined,
                editOrCreateDialog: false,
                headers: [
                    {
                        text: 'Period',
                        value: 'period',
                        transform: function (val, array) {
                            let period = array.periods.find(v => v.id === val);
                            return period.start_date + ' - ' + period.end_date;
                        },
                    },
                    {
                        text: 'Fee paid',
                        value: 'fee_paid',
                        transform: function (val, array) {
                            return val ? 'paid' : 'not paid'
                        },
                    },
                    {
                        text: 'Roles',
                        value: 'roles',
                        transform: function (val, array) {
                            return val.map(x => array.roles.find(v => v.id === x).name).join(', ');
                        },
                    },
                ],
                model: {
                    member: this.member.id,
                    period: null,
                    roles: [],
                    fee_paid: false,
                },
                array: undefined,
            };
        },
        props: [
            'member', 'toparray', 'topheaders',
        ],
        methods: {
            load() {
                this.array = undefined;
                const top = this;
                Vue.axios.get(api.members + this.member.id + '/memberships/?format=json')
                    .then(function (response) {
                        top.array = response.data;
                    });
            },
            deleteItemDialog(item) {
                this.toDelete = item;
                this.deleteDialog = true;
            },
            editItemDialog(item) {
                if (!this.readonly) {
                    this.editedItem = JSON.parse(JSON.stringify(this.array.find(x => x.id === item.id)));
                    this.editOrCreateDialog = true;
                }
            },
            createItemDialog() {
                this.editedItem = JSON.parse(JSON.stringify(this.model));
                this.editOrCreateDialog = true;
            },
            deleteItem() {
                const id = this.toDelete.id;
                this.array = undefined;
                this.toDelete = undefined;
                this.deleteDialog = false;
                const view = this;
                Vue.axios.delete(api.memberships + id + '/').then(function () {
                    view.load();
                });
            },
            isEditItemPresent() {
                return this.editedItem !== undefined;
            },
            submitEditOrCreate() {
                const view = this;
                const item = this.editedItem;
                this.array = undefined;
                this.editedItem = undefined;
                this.editOrCreateDialog = false;
                if (item.id !== undefined) {
                    Vue.axios.put(api.memberships + item.id + '/', item).then(function () {
                        view.load();
                    });
                } else {
                    Vue.axios.post(api.memberships, item).then(function () {
                        view.load();
                    });
                }
            },
            periodText(item) {
                return item.start_date + ' - ' + item.end_date;
            },
        },
        mounted() {
            this.load();
        },
        components: {},
        computed: {
            tableHeaders() {
                if (this.readonly) {
                    return this.headers;
                } else {
                    return this.headers.concat([
                        {
                            text: 'Actions',
                            value: 'action',
                            align: 'right',
                            sortable: false,
                        },
                    ]);
                }
            },
            mainArray() {
                if (this.array) {
                    return transform(JSON.parse(JSON.stringify(this.array)), this.headers, this.toparray);
                } else {
                    return undefined;
                }
            },
        },
    });
</script>
