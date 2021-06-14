import axios from "axios";
import { API_BASE_URl, API_KEY } from "../utils/constant";

export default {
  state: {
    OPTIONS_TYPE: [],
    OPTIONS_MARKS: [],
    OPTIONS_BODYSTYLES: [],
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
    SET_OPTIONS_BODYSTYLES(state, payload) {
      state.OPTIONS_BODYSTYLES = payload;
    },
    SET_VALUE_TYPE(state, payload) {
      state.VALUE_TYPE = payload;
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
  },
};
