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
          resetOnOptionsChange
          @input="getValueSecond"
        ></v-select>
      </div>
      <div class="w-1/2 lg:w-1/3 p-1">
        <h3>Модели</h3>
        <v-select
          :options="this.$store.state.options.OPTIONS_MODEL"
          :disabled="this.type === '' || this.marks === ''"
          v-model="model"
          label="name"
          resetOnOptionsChange
        ></v-select>
      </div>
      <div class="w-1/2 lg:w-1/3 p-1">
        <h3>Форма кузова</h3>
        <v-select
          :options="this.$store.state.options.OPTIONS_BODYSTYLES"
          :disabled="this.type === ''"
          v-model="bodystyles"
          label="name"
          resetOnOptionsChange="true"
        ></v-select>
      </div>
      <div class="w-1/2 lg:w-1/3 p-1">
        <h3>Коробка передач</h3>
        <v-select
          :options="this.$store.state.options.OPTIONS_GEARBOXES"
          :disabled="this.type === ''"
          v-model="gearboxes"
          label="name"
          resetOnOptionsChange="true"
        ></v-select>
      </div>
      <div class="w-1/2 lg:w-1/3 p-1">
        <h3>Типы привода</h3>
        <v-select
          :options="this.$store.state.options.OPTIONS_DRIVERTYPES"
          :disabled="this.type === ''"
          v-model="driverTypes"
          label="name"
          resetOnOptionsChange="true"
        ></v-select>
      </div>
    </div>
    <div class="flex flex-row px-20 py-8 justify-between">
      <button
        class="
          px-12
          py-5
          text-3xl text-blue-900
          bg-gray-50
          hover:bg-blue-800
          border-2
          rounded-sm
          border-blue-800
          hover:text-white
        "
        @click="getPrice"
      >
        GO
      </button>
      <div class="text-4xl text-indigo-700 text-justify flex items-center">
        <p><span class="text-black">Цена:</span> {{ price }}</p>
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
      gearboxes: "",
      driverTypes: "",
      model: "",
    };
  },
  mounted() {
    this.getOptionsType();
  },
  computed: {
    price() {
      if (isNaN(this.$store.state.options.PRICE.arithmeticMean)) {
        return "price no";
      } else {
        return Math.round(this.$store.state.options.PRICE.arithmeticMean);
      }
    },
  },
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
      this.$store.dispatch("GET_OPTIONS", {
        stateName: "SET_OPTIONS_GEARBOXES",
        url: `categories/${this.type.value}/gearboxes?`,
      });
      this.$store.dispatch("GET_OPTIONS", {
        stateName: "SET_OPTIONS_DRIVERTYPES",
        url: `categories/${this.type.value}/driverTypes?`,
      });
    },
    getValueSecond() {
      this.$store.dispatch("GET_OPTIONS", {
        stateName: "SET_OPTIONS_MODEL",
        url: `categories/${this.type.value}/marks/${this.marks.value}/models?`,
      });
    },
    getPrice() {
      let url = "";
      if (this.marks) {
        url = url + `&marka_id=${this.marks.value}`;
      }
      if (this.model) {
        url = url + `&model_id${this.model.value}`;
      }
      this.$store.dispatch("GET_PRICE", {
        url: url,
      });
    },
  },
};
</script>
