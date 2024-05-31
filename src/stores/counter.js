import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  //    ref menjadi state
  const count = ref(0);
  const name = ref("Eduardo");
  //    computed menjadi getters
  const doubleCount = computed(() => count.value * 100);

  //    function menjadi action
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
//counter.js