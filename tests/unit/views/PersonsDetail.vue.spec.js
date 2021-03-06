import { shallowMount, createLocalVue } from "@vue/test-utils";
import * as Vuex from "vuex";
import VueRouter from "vue-router";
import { routes } from "@/router";

import PersonsDetail from "@/views/PersonsDetail.vue";
import { persons } from "../fixtures/persons";
import { lettersResponse } from "../fixtures/letters-response";

describe("PersonsDetail view", () => {
  let wrapper;
  let localVue;
  let actions;
  let getters;
  let store;

  jest.doMock("axios", () => ({
    get: jest.fn()
  }));

  localVue = createLocalVue();
  localVue.use(Vuex);
  const router = new VueRouter({ routes, mode: "abstract" });

  beforeEach(() => {
    getters = {
      fullNameIndex: () => [],
      persons: () => persons,
      letters: () => lettersResponse
    };

    actions = {
      loadFullNameIndexAction: jest.fn()
    };

    store = new Vuex.Store({
      actions,
      getters
    });
  });

  it("creates the component", () => {
    wrapper = shallowMount(PersonsDetail, {
      localVue,
      store,
      router,
      computed: {
        entityId: () => "G001323"
      }
    });
    wrapper.vm.getItems = jest.fn();

    expect(wrapper).toBeTruthy();

    wrapper.destroy();
  });

  it("can get the person properties", () => {
    wrapper = shallowMount(PersonsDetail, {
      localVue,
      store,
      router,
      computed: {
        entityId: () => "G001323"
      }
    });
    wrapper.vm.getItems = jest.fn();

    expect(wrapper.vm.properties.role).toBe("mythological");

    wrapper.destroy();
  });

  it("displays a list of letters where the referenced person is a correspondent", () => {
    wrapper = shallowMount(PersonsDetail, {
      localVue,
      store,
      router,
      computed: {
        entityId: () => "G001011"
      }
    });
    wrapper.vm.getItems = jest.fn();

    expect(wrapper.vm.correspondences.length).toBe(2);
    expect(wrapper.find("#correspondences").exists()).toBeTruthy();

    wrapper.destroy();
  });
});
