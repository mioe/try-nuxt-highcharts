<template>
  <section class="mi--high-line-chart">
    <highchart :options="options" />
  </section>
</template>

<script>
import dayjs from 'dayjs';
import { BASE_OPTIONS } from '@/components/HighLineChartV1/_base-options.js';
import {
  EVENT_LABELS,
  getDiffDateArray,
  getGroupedItemsViaKey,
  getAllSeriesForOneType,
  getDayDiff,
} from '@/components/HighLineChartV1/_utils.js';

import data from '@/assets/data.json';
const EVENT_NAMES = Object.keys(EVENT_LABELS);

export default {
  props: {
    dateRange: {
      type: Array,
      default: null,
    },
    wazzupId: {
      type: String,
      default: null,
    },
    deviceType: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    events: data.data.events,
    highChartBaseOptions: BASE_OPTIONS,
  }),
  computed: {
    unit() {
      const days = getDayDiff(this.dateRange);
      if (days >= 60) {
        return 'month';
      } else if (days >= 7 && days < 60) {
        return 'day';
      }
      return 'hours';
    },

    getEventsWithFilter() {
      const wazzupId = this.wazzupId || undefined;
      const deviceType = this.deviceType || undefined;
      return this.events.filter((ev) => {
        if (wazzupId && deviceType) {
          return ev.wazzupId.includes(wazzupId) && ev.deviceType === deviceType;
        }
        if (wazzupId) {
          return ev.wazzupId.includes(wazzupId);
        }
        if (deviceType) {
          return ev.deviceType === deviceType;
        }
        return true;
      });
    },

    getAllXAxisPoints() {
      return getDiffDateArray(this.dateRange, this.unit);
    },

    getAllEventsWithNameGroup() {
      return getGroupedItemsViaKey(
        this.getEventsWithFilter,
        'name',
        EVENT_NAMES
      );
    },

    getChartSeries() {
      return EVENT_NAMES.map((nameSerie) => {
        return {
          name: EVENT_LABELS[nameSerie],
          data: getAllSeriesForOneType(
            this.getAllXAxisPoints,
            this.getAllEventsWithNameGroup[nameSerie],
            this.unit
          ),
        };
      });
    },

    xAxis() {
      return {
        categories: [...this.getAllXAxisPoints],
        labels: {
          enabled: false,
        },
      };
    },

    options() {
      return {
        ...this.highChartBaseOptions,
        xAxis: this.xAxis,
        series: this.getChartSeries,
      };
    },
  },
};
</script>

<style lang="scss" src="./HighLineChart.scss"></style>
