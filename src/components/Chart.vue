<template>
  <canvas :id="id" />
</template>

<script>
import Chart from 'chart.js/auto';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    id: {
      type: String,
      default: () => ''
    },
    weather: {
      type: Object
    }
  },
  setup() {
    const store = useStore();
    const locale = computed(() => store.getters['locale/get']);

    return {
      locale
    };
  },
  mounted() {
    Chart.defaults.color = '#FFF';
    Chart.defaults.borderColor = 'rgb(107 107 107)';
    this.chart = this.createChart(this.weather);
  },
  updated() {
    this.chart.destroy();
    this.chart = this.createChart(this.weather);
  },
  methods: {
    createChart(weather) {
      let labels, data;

      if (weather.temp) {
        labels = ['MIN', 'CURRENT', 'MAX'];
        data = [
          Math.round(weather.temp_min),
          Math.round(weather.temp),
          Math.round(weather.temp_max)
        ];
      } else {
        let count = 0,
          tempSum = 0,
          prevDate;

        const preperedWeather = weather.reduce(
          (acc, el, idx) => {
            const date = new Date(el.dt_txt);
            const currentDate = [date.getDate(), date.getMonth()];

            if (idx === 0) {
              prevDate = [...currentDate];
            }

            if (prevDate[0] !== currentDate[0]) {
              acc[0].push(prevDate);
              acc[1].push(Math.round(tempSum / count));
              prevDate = [...currentDate];
            }

            if (prevDate[0] === currentDate[0]) {
              count++;
              tempSum += el.main.temp;
            }

            return acc;
          },
          [[], []]
        );

        labels = preperedWeather[0].map(el => el.join('.'));
        data = preperedWeather[1];
      }

      return new Chart(String(this.id), {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Temperature in °C',
              data,
              borderWidth: 1,
              borderColor: '#FF6384',
              backgroundColor: '#FF6384'
            }
          ]
        },
        options: {
          elements: {
            point: {
              radius: 4,
              hitRadius: 4,
              hoverRadius: 4
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: Math.max(...data) + 1
            }
          }
        }
      });
    }
  }
};
</script>
