<template>
  <div>
    <q-page v-show="!this.$store.getters.loading && loading == false" padding>
      <div class="row justify-center">
        <div class="col-md-8 col-12 q-py-xl q-gutter-y-lg">
          <PersonsTitle :person="data.person" :entity="entity"></PersonsTitle>
        </div>
      </div>
      <div v-if="correspondences.length" id="correspondences" class="row justify-center">
        <div class="col-md-8 col-12 q-pb-xl q-gutter-y-lg">
          <CorrespondenceTable :letters="correspondences"></CorrespondenceTable>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-md-8 col-12 q-pb-xl q-gutter-y-lg">
          <MentionsTable :entity-id="entityId" :entity-name="name" entity-type="persons" />
        </div>
      </div>
    </q-page>
    <q-page v-show="this.$store.getters.loading || loading == true">
      <div class="q-pt-xl row justify-center">
        <q-spinner-oval color="primary" size="5em" />
      </div>
    </q-page>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MentionsTable from "@/components/MentionsTable";
import CorrespondenceTable from "@/components/CorrespondenceTable";
import PersonsTitle from "@/components/PersonsTitle.vue";
import { dataService } from "@/shared";

import { QPage, QSpinnerOval } from "quasar";

export default {
  name: "PersonsDetail",
  components: {
    QPage,
    QSpinnerOval,
    MentionsTable,
    CorrespondenceTable,
    PersonsTitle
  },
  data() {
    return {
      data: {
        person: {
          persName: "",
          birth: "",
          death: "",
          idno: "",
          note: ""
        }
      },
      loading: true
    };
  },

  computed: {
    ...mapGetters(["fullNameIndex", "persons", "letters"]),
    entityId() {
      return this.$route.params.id;
    },
    entity() {
      if (!this.persons.length) {
        return {};
      }
      return this.persons.find(person => person.id === this.entityId);
    },
    properties() {
      if (!this.persons.length) {
        return {};
      }
      return this.entity.properties;
    },
    correspondences() {
      if (!this.letters.length) {
        return [];
      }
      return this.letters.filter(
        letter =>
          letter.properties.sender.includes(this.entityId) ||
          letter.properties.recipient.includes(this.entityId)
      );
    }
  },

  async mounted() {
    await this.loadFullNameIndexAction();
    await this.getItems();
  },

  methods: {
    ...mapActions(["loadLettersAction", "loadFullNameIndexAction"]),
    async getItems() {
      const data = await dataService.getEntity("persons", this.$route.params.id, "json");
      this.data = { ...this.data, ...data };
      this.loading = false;
    }
  }
};
</script>
