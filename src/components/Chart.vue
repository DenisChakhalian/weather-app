<template>
  <canvas :id="id" />
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    id: {
      type: String,
      default: () => ''
    },
    weather: {
      type: Object
    },
    locale: {
      type: String,
      default: 'en'
    }
  },
  computed: {
    labelsByDay() {
      return [
        this.$t('cards.min', this.locale),
        this.$t('cards.current', this.locale),
        this.$t('cards.max', this.locale)
      ];
    }
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
        labels = this.labelsByDay;
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
            const month = date.getMonth() + 1;
            const currentDate = [
              date.getDate(),
              month < 10 ? '0' + month : month
            ];

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
              label: this.$t('cards.temperature', this.locale),
              data,
              borderWidth: 1,
              borderColor: '#FF6384',
              backgroundColor: '#FF6384'
            }
          ]
        },
        options: {
          interaction: {
            intersect: false
          },
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
              suggestedMax: Math.max(...data) + 1,
              suggestedMin: Math.max(...data) - 1
            }
          }
        }
      });
    }
  }
};
</script>
