export const BASE_OPTIONS = {
  chart: {
    type: 'spline',
    styledMode: true,
  },
  title: false,
  subtitle: false,
  xAxis: {
    labels: {
      enabled: false,
    }
  },
  yAxis: {
    allowDecimals: false,
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
  plotOptions: {
    series: {
      marker: {
        lineWidth: 1,
      },
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
    padding: 12,
    borderRadius: 8,
    useHTML: true,
    /* computed */
  },
  credits: {
    enabled: false,
  },
  series: [
    /* computed */
  ],
};

export default {};
