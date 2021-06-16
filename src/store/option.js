import axios from "axios";
import { API_BASE_URl, API_KEY } from "../utils/constant";

export default {
  state: {
    PRICE: "0",
    OPTIONS_TYPE: [],
    OPTIONS_MARKS: [],
    OPTIONS_MODEL: [],
    OPTIONS_BODYSTYLES: [],
    OPTIONS_GEARBOXES: [],
    OPTIONS_DRIVERTYPES: [],
    VALUE_TYPE: "",
    VALUE_BODYSTYLES: "",
  },
  mutations: {
    SET_OPTIONS_TYPE(state, payload) {
      state.OPTIONS_TYPE = payload;
    },
    SET_OPTIONS_MARKS(state, payload) {
      state.OPTIONS_MARKS = payload;
    },
    SET_OPTIONS_MODEL(state, payload) {
      state.OPTIONS_MODEL = payload;
    },
    SET_OPTIONS_BODYSTYLES(state, payload) {
      state.OPTIONS_BODYSTYLES = payload;
    },
    SET_OPTIONS_GEARBOXES(state, payload) {
      state.OPTIONS_GEARBOXES = payload;
    },
    SET_OPTIONS_DRIVERTYPES(state, payload) {
      state.OPTIONS_DRIVERTYPES = payload;
    },
    SET_VALUE_TYPE(state, payload) {
      state.VALUE_TYPE = payload;
    },
    SET_PRICE(state, payload) {
      state.PRICE = payload;
    },
  },
  actions: {
    async GET_OPTIONS({ commit }, { stateName, url }) {
      await axios
        .get(`${API_BASE_URl}${url}${API_KEY}`)
        .then((data) => data.data)
        .then((data) => {
          commit(stateName, data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async GET_PRICE({ commit }, { url }) {
      await axios
        .get(`${API_BASE_URl}/average_price?${API_KEY}${url}`)
        .then((data) => data.data)
        .then((data) => {
          commit("SET_PRICE", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
