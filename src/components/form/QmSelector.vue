<template>
  <div>
    <md-field-item
      :title="selectorData.label"
      :content="selectorValue"
      @click="showSelector"
      :name="selectorData.name"
      arrow
      solid
    />
    <md-selector
      v-model="isSelectorShow"
      :default-value="selectorData.value"
      :data="selectorData.option"
      max-height="320px"
      :title="selectorData.label"
      large-radius
      @choose="onSelectorChoose"
    ></md-selector>
  </div>
</template>

<script>
import { FieldItem, Field, Selector } from "mand-mobile";
export default {
  components: {
    [FieldItem.name]: FieldItem,
    [Field.name]: Field,
    [Selector.name]: Selector,
  },
  props: {
    selectorData: {
      type: Object,
      defalut: () => ({
        label: "选择器",
        option: [],
      }),
    },
  },
  data: () => ({
    selectorValue: "",
    isSelectorShow: false,
  }),
  mounted() {
    this.$nextTick(() => {
      if (this.selectorData.option.length > 0) {
        this.selectorData.option.forEach((item) => {
          if (item.value === this.selectorData.value) {
            this.selectorValue = item.text;
          }
        });
      }
    });
  },
  methods: {
    showSelector() {
      this.isSelectorShow = true;
    },
    onSelectorChoose({ text }) {
      this.selectorValue = text;
    },
  },
};
</script>