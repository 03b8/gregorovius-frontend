<template>
  <q-card class="col-md-8 col-12 q-pa-xl" flat bordered>
    <q-table
      v-if="letters.length > 0"
      title="Korrespondenzen"
      :data="letters"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      flat
    >
      <template v-slot:body-cell="props">
        <q-td
          :props="props"
          class="cursor-pointer"
          @click.native="$router.push({ path: `/letters/${props.row.id}` })"
          >{{ props.value }}</q-td
        >
      </template>
    </q-table>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CorrespondenceTable",
  props: {
    letters: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filter: "",
      loading: true,
      pagination: {
        rowsPerPage: 10,
        sortBy: "title"
      },
      columns: [
        {
          name: "title",
          required: true,
          align: "left",
          field: row => row.properties.title
        }
      ],
      data: []
    };
  },

  computed: {
    ...mapGetters(["fullNameIndex"])
  }
};
</script>

<style></style>
