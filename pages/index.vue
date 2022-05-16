<template>
  <main style="width: 100%; max-width: 1200px; margin: 0 auto; padding 16px;">
    <Panel
      :dateRange="dateRange"
      :deviceType="deviceType"
      :wazzupId="wazzupId"
      @update-dateRange="dateRange = $event"
      @update-deviceType="deviceType = $event"
      @update-wazzupId="wazzupId = $event"
    />
    <HighChart
      :dateRange="dateRange"
      :deviceType="deviceType"
      :wazzupId="wazzupId"
    />
    <HighChartV1
      :dateRange="dateRange"
      :deviceType="deviceType"
      :wazzupId="wazzupId"
    />
  </main>
</template>

<script>
import Panel from '@/components/Panel.vue';
import HighChart from '@/components/HighLineChart/HighLineChart.vue';
import HighChartV1 from '@/components/HighLineChartV1/HighLineChart.vue';

export default {
  data: () => ({
    dateRange: ['2021-12-10', '2022-04-14'],
    deviceType: null,
    wazzupId: null,
  }),
  components: {
    Panel,
    HighChart,
    HighChartV1,
  },
};
</script>
