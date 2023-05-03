<script setup>

const props = defineProps({
  inputType: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  labelBindingId: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['input'])
const handleInput = e => {
  emit('input', e.target.value)
}
</script>

<template>
  <div :class="['input-wrapper', {'input-wrapper_row': props.label}]">
    <div v-if="props.label" class="input__label-box">
      <label
        :for="props.labelBindingId"
        class="input__label"
      >
        {{ props.label }}
      </label>
    </div>
    <input 
      class="input"
      :value="value"
      @input="e => handleInput(e)"
      :id="props.labelBindingId"
      :type="props.inputType"
    >
  </div>
</template>

<style lang="scss">
.input-wrapper {
  padding: 2px;
  width: 100%;
  border: 1px solid var(--color-input-background);
  border-radius: 0;

  background: var(--color-input-background);
  transition: .2s all;

  &_row {
    display: flex;
    align-items: center;
  }

  &:focus-within {
    border: 1px solid var(--c-accent-2);

    .input__label {
      color: var(--c-accent);
    }
  }
}

.input {
  display: block;

  width: 100%;
  padding: 10px 10px;
  border: 0;
  border-radius: 0;

  outline: none;
  background-color: transparent;

  font-family: var(--ff-menlo);
  color: var(--color-text);

  &__label-box {
    display: block;
    width: max-content;
    padding: 10px 10px;
  }

  &__label {
    font-family: var(--ff-menlo);
    font-size: 14px;
    color: var(--color-text);

    opacity: 0.5;
    transition: .2s all;
  }
}
</style>