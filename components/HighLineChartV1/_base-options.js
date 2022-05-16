export const BASE_OPTIONS = {
  chart: {
    type: 'spline',
    styledMode: true,
  },
  title: false,
  subtitle: false,
  xAxis: {
    /* computed */
  },
  yAxis: {
    title: {
      enabled: false,
    },
    labels: {
      formatter: function () {
        return this.value;
      },
    },
  },
  legend: {
    align: 'center',
    alignColumns: false,
    layout: 'vertical',
    width: '100%',
    padding: 32,
    itemMarginTop: 5,
    itemMarginBottom: 5,
    labelFormatter: function () {
      return `${this.name} ${this.yData.reduce((sum, a) => sum + a, 0)}`;
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
  },
  credits: {
    enabled: false,
  },
  series: [
    /* computed */
  ],
};

export default {};
