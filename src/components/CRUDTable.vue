<template>
    <div>
        <v-data-table class="elevation-1" :headers="tableHeaders" :loading="array === undefined" :items="mainArray"
                      loading-text="Loading... Please wait" :search="search" :disable-sort="paged" single-expand
                      :show-expand="expandable" :expanded.sync="expanded">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-btn v-if="!readonly" dark icon class="mb-2" @click.stop="createItemDialog">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn dark icon class="mb-2" @click.stop="load">
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-toolbar v-if="!paged" flat dense>
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-btn v-if="!createonly" dark icon @click.stop="editItemDialog(item)">
                    <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn dark icon @click.stop="deleteItemDialog(item)">
                    <v-icon small>mdi-delete</v-icon>
                </v-btn>
            </template>
            <template v-slot:expanded-item="{ item, headers }">
                <slot v-if="expanded.includes(item)" name="expanded-item" :item="item" :array="array"
                      :headers="headers">
                </slot>
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
                <v-card-text>
                    <slot v-if="editOrCreateDialog" name="edit-or-create" :item="editedItem" :array="array"></slot>
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
    </div>
</template>

<script>
    import Vue from 'vue';
    import {transform} from '../common/transform';

    export default Vue.extend({
        name: 'crudtable',
        data() {
            return {
                array: undefined,
                paged: false,
                toDelete: undefined,
                deleteDialog: false,
                editedItem: undefined,
                editOrCreateDialog: false,
                search: '',
                expanded: [],
            };
        },
        props: ['urls', 'headers', 'title', 'readonly', 'createonly', 'model', 'expandable'],
        methods: {
            load() {
                this.array = undefined;
                const top = this;
                Promise.all(Object.keys(top.urls).map(function (key) {
                    return Vue.axios.get(top.urls[key] + '?format=json');
                })).then(function (value) {
                    const arr = {};
                    Object.keys(top.urls).forEach(function (key, idx) {
                        const json = value[idx].data;
                        if (json.results !== undefined) {
                            if (key === 'main') {
                                top.paged = true;
                            }
                            arr[key] = json.results;
                        } else {
                            if (key === 'main') {
                                top.paged = false;
                            }
                            arr[key] = json;
                        }
                    });
                    top.array = arr;
                });
            },
            deleteItemDialog(item) {
                this.toDelete = item;
                this.deleteDialog = true;
            },
            editItemDialog(item) {
                if (!this.readonly) {
                    this.editedItem = JSON.parse(JSON.stringify(this.array.main.find(x => x.id === item.id)));
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
                Vue.axios.delete(this.urls.main + id + '/').then(function () {
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
                    Vue.axios.put(this.urls.main + item.id + '/', item).then(function () {
                        view.load();
                    });
                } else {
                    Vue.axios.post(this.urls.main, item).then(function () {
                        view.load();
                    });
                }
            },
        },
        mounted() {
            this.load();
        },
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
                    return transform(JSON.parse(JSON.stringify(this.array.main)), this.headers, this.array);
                } else {
                    return undefined;
                }
            },
        },
    });
</script>
