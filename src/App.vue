<template>
  <div id="app">
    <h1
      class="font-sans text-4xl font-extrabold text-center my-10 text-blue-600"
    >
      Подсчет цены транспорта
    </h1>
    <div class="flex flex-row flex-wrap mt-10 px-14">
      <div class="w-1/2 lg:w-1/3 p-1">
        <h3>Тип транспорта</h3>
        <v-select
          :options="this.$store.state.options.OPTIONS_TYPE"
          v-model="type"
          label="name"
          @input="getValueFirst('SET_VALUE_TYPE', 'this.type')"
        ></v-select>
      </div>
      <div class="w-1/2 lg:w-1/3 p-1">
        <h3>Марка транспорта</h3>
        <v-select
          :options="this.$store.state.options.OPTIONS_MARKS"
          :disabled="this.type === ''"
          v-model="marks"
          label="name"
        ></v-select>
      </div>
      <div class="w-1/2 lg:w-1/3 p-1">
        <h3>Форма кузова</h3>
        <v-select
          :options="this.$store.state.options.OPTIONS_BODYSTYLES"
          :disabled="this.type === ''"
          v-model="bodystyles"
          label="name"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/src/scss/vue-select.scss";

Vue.component("v-select", vSelect);
export default {
  data() {
    return {
      type: "",
      marks: "",
      bodystyles: "",
    };
  },
  mounted() {
    this.getOptionsType();
  },
  computed: {},
  methods: {
    getOptionsType() {
      this.$store.dispatch("GET_OPTIONS", {
        stateName: "SET_OPTIONS_TYPE",
        url: "categories/?",
      });
    },
    getValueFirst(mutation, value) {
      this.$store.commit(mutation, eval(value));
      this.$store.dispatch("GET_OPTIONS", {
        stateName: "SET_OPTIONS_MARKS",
        url: `categories/${this.type.value}/marks?`,
      });
      this.$store.dispatch("GET_OPTIONS", {
        stateName: "SET_OPTIONS_BODYSTYLES",
        url: `categories/${this.type.value}/bodystyles?`,
      });
    },
    test() {
      console.log(this.marks);
    },
  },
};
</script>
