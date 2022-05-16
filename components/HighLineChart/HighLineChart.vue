<template>
  <section class="mi--high-line-chart">
    <highchart :options="options" />
  </section>
</template>

<script>
import { BASE_OPTIONS } from '@/components/HighLineChart/_base-options.js';
import {
  UNITS,
  EVENT_LABELS,
  getDiffDateArray,
  getGroupedItemsViaKey,
  getAllSeriesForOneType,
  getDayDiff,
  getLabelForTooltip,
} from '@/components/HighLineChart/_utils.js';

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
        return UNITS[2];
      } else if (days >= 7 && days < 60) {
        return UNITS[1];
      }
      return UNITS[0];
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

    tooltip() {
      const TOOLTIP_LABEL = new getLabelForTooltip(this.getAllXAxisPoints, this.unit)
      return {
        formatter: function () {
          console.log('🦕 msg', this)
            const label = TOOLTIP_LABEL.GET(this.x)
            const series = this.points.map(point => `<b>${point.series.name}: ${point.y}</b>`)
            return `${label} <br>${series.join('<br>')}`
        },
      }
    },

    options() {
      return {
        ...this.highChartBaseOptions,
        series: this.getChartSeries,
        tooltip: {
          ...this.highChartBaseOptions.tooltip,
          ...this.tooltip,
        },
      };
    },
  },
};
</script>

<style lang="scss" src="./HighLineChart.scss"></style>
