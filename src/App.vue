<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <v-list dense>
                <v-list-item :to="'/'">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="'/members/'">
                    <v-list-item-action>
                        <v-icon>mdi-account-group</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Members</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="'/periods/'">
                    <v-list-item-action>
                        <v-icon>mdi-calendar</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Periods</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="'/roles/'">
                    <v-list-item-action>
                        <v-icon>mdi-account-badge</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Roles</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="'/clients/'">
                    <v-list-item-action>
                        <v-icon>mdi-folder-key-network</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Clients</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="'/authevents/'">
                    <v-list-item-action>
                        <v-icon>mdi-calendar-check</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Auth events</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="'/selfservicetokens/'">
                  <v-list-item-action>
                    <v-icon>mdi-lock-reset</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Self service tokens</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <v-list>
                    <v-list-item :href="logoutURl">
                        <v-list-item-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <v-app-bar
                app
                clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>ERC</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import {api} from '@/common/api';

    export default Vue.extend({
        name: 'App',
        props: {
            source: String,
        },
        data: () => ({
            drawer: false,
            logoutURl: api.logout,
        }),
        created() {
            this.$vuetify.theme.dark = true;
        },
        watch: {
            '$route' (to, from) {
                document.title = to.meta.title + ' | ERC KSI' || 'ERC KSI'
            }
        },
    });
</script>
