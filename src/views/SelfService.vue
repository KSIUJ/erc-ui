<template>
  <v-container class="container page">
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <v-card outlined>
          <v-card-title>Self-service utility</v-card-title>
          <div v-if="current_stage === Stage.INVALID_OR_EMPTY_TOKEN">
            <v-card-subtitle class="pt-0">
              Authentication token required.
            </v-card-subtitle>
            <v-card-text>
              <v-alert color="deep-orange" v-if="invalid">
                Provided token is invalid!
              </v-alert>
              If you are using this utility you've most likely already received a self service one time token. Otherwise
              please contact administrators.
              <v-text-field v-model="token"
                            label="Token"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" @click.stop="verifyToken">
                Submit
              </v-btn>
            </v-card-actions>
          </div>
          <div v-if="current_stage === Stage.READER_FORM">
            <v-card-subtitle class="pt-0">
              Hello {{ name }}!
            </v-card-subtitle>
            <v-card-text>
              <p>You can register your ID card with ERC using this tool.</p>
              <p>Steps:</p>
              <ol>
                <li>Have your Mifare card ready (e.g. your student ID or public transit card).</li>
                <li>Find the nearest ERC-enabled card reader (e.g. door lock).</li>
                <li>Write down the reader name in the form below (as on a sticker on the reader) and press submit.</li>
              </ol>
              <v-alert color="deep-orange" v-if="invalid">
                Invalid reader name!
              </v-alert>
              <v-text-field v-model="readerName"
                            label="Card reader name"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" @click.stop="scanCard">
                Submit
              </v-btn>
            </v-card-actions>
          </div>
          <div v-if="current_stage === Stage.SCAN_CARD">
            <v-card-subtitle class="pt-0">
              Please scan your card {{ name.replace(/ .*/, '') }}.
            </v-card-subtitle>
            <v-card-text>
              <p>Wave your card directly over the reader. A light should blink on the reader. Do not leave this page
                until the process is complete.</p>
              <div class="text-center">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="blue"
                    indeterminate
                    class="mt-10 mb-5"
                ></v-progress-circular>
                <p>Waiting for card</p>
              </div>
            </v-card-text>
          </div>
          <div v-if="current_stage === Stage.SUCCESS">
            <v-card-subtitle class="pt-0">
              All set up!
            </v-card-subtitle>
            <v-card-text>
              <p>The process finished successfully.</p>
              <ul>
                <li>user: {{ name }}</li>
                <li v-for="(value, key) in success_data">{{ key }}: {{ value }}</li>
              </ul>
            </v-card-text>
          </div>
          <div v-if="current_stage === Stage.ERROR">
            <v-card-subtitle class="pt-0">
              Error
            </v-card-subtitle>
            <v-card-text>
              Unknown error occurred Try restarting the process. Contact administrators for help.
            </v-card-text>
          </div>
          <div v-if="current_stage === Stage.VALIDATING_TOKEN || current_stage === Stage.VALIDATING_READER">
            <div class="text-center">
              <v-progress-circular
                  :size="70"
                  :width="7"
                  color="blue"
                  indeterminate
                  class="mt-10 mb-5"
              ></v-progress-circular>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import Vue from 'vue';
import {api} from '@/common/api';

const Stage = {
  VALIDATING_TOKEN: 0,
  INVALID_OR_EMPTY_TOKEN: 1,
  READER_FORM: 2,
  VALIDATING_READER: 3,
  SCAN_CARD: 4,
  SUCCESS: 5,

  ERROR: 999,
};

export default Vue.extend({
  data() {
    return {
      dialog: true,
      readerName: '',
      Stage,
      current_stage: null,
      token: null,
      name: null,
      invalid: false,
      success_data: '',
    };
  },
  methods: {
    verifyToken() {
      this.invalid = false;
      this.current_stage = Stage.VALIDATING_TOKEN;
      const top = this;
      Vue.axiosDefault.get(api.self_service + this.token + '/?format=json')
          .then(function (response) {
            top.handleToken(response.data);
          }, function (error) {
            if (error.response.status === 404) {
              top.invalid = true;
              top.current_stage = Stage.INVALID_OR_EMPTY_TOKEN;
            } else {
              alert(error + (error.response ? '\n' + JSON.stringify(error.response.data) : ''));
              window.location.reload(false);
            }
          });
    },
    handleToken(verificationData) {
      this.name = verificationData.member;
      if (verificationData.type === 'CARD_ID') {
        this.current_stage = Stage.READER_FORM;
        return;
      }
      this.current_stage = Stage.ERROR;
    },
    scanCard() {
      this.invalid = false;
      this.current_stage = Stage.VALIDATING_READER;
      this.waitForCard();
    },
    waitForCard() {
      const top = this;
      Vue.axiosDefault.post(api.self_service + this.token + '/set_card_id/?format=json',
          {client: this.readerName})
          .then(function (response) {
            top.success_data = response.data;
            top.current_stage = Stage.SUCCESS;
          }, function (error) {
            if (error.response.status === 404) {
              top.current_stage = Stage.SCAN_CARD;
              setTimeout(top.waitForCard, 1000)
            } else if (error.response.status === 400) {
              top.invalid = true;
              top.current_stage = Stage.READER_FORM;
            } else {
              alert(error + (error.response ? '\n' + JSON.stringify(error.response.data) : ''));
              window.location.reload(false);
            }
          });
    },
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('token')) {
      this.token = params.get('token');
      this.verifyToken();
    } else {
      this.current_stage = Stage.INVALID_OR_EMPTY_TOKEN;
    }
  },
  components: {},
});
</script>
