<template>
  <section class="mi--panel">
    <input type="date" v-model="startDate" />
    <input type="date" v-model="endDate" />

    <select v-model="localDeviceType">
      <option :value="null">All</option>
      <option v-for="t in DEVICE_TYPES" :key="t" :value="t">
        {{ t }}
      </option>
    </select>

    <input type="text" v-model="localWazzupId" placeholder="#####" />
  </section>
</template>

<script>
import { DEVICE_TYPES } from '@/components/HighLineChart/_utils.js';

export default {
  props: {
    dateRange: {
      type: Array,
      default: null,
    },
    deviceType: {
      type: String,
      default: null,
    },
    wazzupId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      DEVICE_TYPES,
      startDate: this.dateRange[0] || '1996-11-26',
      endDate: this.dateRange[1] || '1996-11-17',
    };
  },
  watch: {
    startDate(val) {
      this.$emit('update-dateRange', [val, this.endDate]);
    },
    endDate(val) {
      this.$emit('update-dateRange', [this.startDate, val]);
    },
  },
  computed: {
    localDeviceType: {
      get() {
        return this.deviceType;
      },
      set(val) {
        this.$emit('update-deviceType', val);
      },
    },
    localWazzupId: {
      get() {
        return this.wazzupId;
      },
      set(val) {
        this.$emit('update-wazzupId', val);
      },
    },
  },
};
</script>
