<template>
  <div class="container page">
    <crudtable :title="'Self service tokens'" :headers="headers" :model="model" :urls="urls" createonly="true">
      <template v-slot:edit-or-create="props">
                        <tokenform :item="props.item" :array="props.array"></tokenform>
      </template>
    </crudtable>
  </div>
</template>

<script>
import Vue from 'vue';
import CRUDTable from '../components/CRUDTable.vue';
import SelfServiceTokensForm from '../components/SelfServiceTokensForm.vue';
import {api} from '@/common/api';

export default Vue.extend({
  data() {
    return {
      members: undefined,
      headers: [
        {
          text: 'Member',
          value: 'member',
          transform: (val, array) => {
              const member = array.members.find((v) => v.id === val);
              return member.given_name + ' ' + member.surname;
          },
        },
        {
          text: 'Type',
          value: 'type',
        },
        {
          text: 'Token',
          value: 'token',
        },
      ],
      model: {
        member: null,
        type: null,
        token: null,
      },
      urls: {
        main: api.self_service_tokens,
        members: api.members,
      },
    };
  },
  components: {
    crudtable: CRUDTable,
    tokenform: SelfServiceTokensForm,
  },
});
</script>
