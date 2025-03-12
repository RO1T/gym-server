<template>
  <q-page padding>
    <!-- Tabs -->
    <div class="statistics__wrapper">
      <h3>Аналитика всех видео</h3>
      <div class="statistics__controls">
        <div class="statistics__selectors">
          <div class="selector" v-for="(option, idx) in selectableOptions" :key="idx">
            <button
              v-bind:class="option.type === state.activeState ? 'active' : ''"
              @click="state.activeState = option.type"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!--   Выбор временного диапазона     -->
        <div class="statistics__date-picker">
          <span>Выберите промежуток</span>
          <div class="date-inputs">
            <input :value="state.selectedStartDate" type="date" /> -
            <input :value="state.selectedEndDate" type="date" />
          </div>
          <!--    Отображает сообщение об ошибке если есть      -->
          <span v-if="state.dateRangeError.isError" style="color: red">
            {{ state.dateRangeError.errorMessage }}
          </span>
        </div>
      </div>
    </div>

    <StatisticsChartComponent :view-type="state.activeState" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import StatisticsChartComponent from 'components/StatisticsChartComponent.vue'

export default defineComponent({
  name: 'VideoStats',
  components: { StatisticsChartComponent },
  setup() {
    interface errorWithMessage{
      isError: boolean
      errorMessage: string
    }

    // Selectors state
    const state = ref({
      activeState: ref('full'),
      selectedStartDate: ref(''),
      selectedEndDate: ref(''),
      dateRangeError: ref<errorWithMessage>({ isError: false, errorMessage: '' })
    })

    //Selectors options
    const selectableOptions = [
      { type: 'full', label: 'Кол-во полных просмотров' },
      { type: 'half', label: 'Кол-во просмотров на половину' },
      { type: 'declined', label: 'Кол-во отклоненных просмотров' },
    ]

    //Event Handlers
    const onDateInputChange = () => {
      //Do smth if date changed
      //If incorrect range (selectedStartDate > selectedEndDate) =>
      // dateRangeError.value = {isError:true, errorMessage: 'Invalid Range'}
    }

    return {
      state,
      selectableOptions,
      onDateInputChange,
    }
  },
})
</script>

<style scoped>
.statistics__controls {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 50px;
}
.statistics__selectors {
  display: flex;
}

.selector > button {
  padding: 5px 15px;
  background: #fff;
  border: none;
}

.selector > button:hover {
  cursor: pointer;
}

.selector > button.active {
  color: #161e43;
  box-shadow: 0 -2.5px 0 #161e43 inset;
}

.statistics__date-picker {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
