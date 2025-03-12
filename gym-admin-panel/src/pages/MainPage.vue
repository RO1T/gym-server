<template>
  <q-page class="bg-grey-1">
    <div class="content">
      <h1 class="page-title">Обзор системы</h1>

      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-title">Всего пользователей</div>
          <div class="stat-value">1,247</div>
          <q-icon name="people" class="stat-icon" />
        </div>
        <div class="stat-card">
          <div class="stat-title">Просмотров сегодня</div>
          <div class="stat-value">382</div>
          <q-icon name="visibility" class="stat-icon" />
        </div>
        <div class="stat-card">
          <div class="stat-title">Завершено просмотров</div>
          <div class="stat-value">76%</div>
          <q-icon name="check_circle" class="stat-icon" />
        </div>
        <div class="stat-card">
          <div class="stat-title">Активных видео</div>
          <div class="stat-value">24</div>
          <q-icon name="play_circle" class="stat-icon" />
        </div>
      </div>

      <div class="dashboard-row">
        <div class="dashboard-card">
          <h2 class="card-title">
            <q-icon name="history" class="q-mr-sm" />
            Активность системы
          </h2>
          <div class="activity-item">
            <q-icon name="circle" color="primary" size="xs" class="activity-indicator" />
            <div class="activity-text">Новое видео добавлено: "Утренняя зарядка"</div>
            <div class="activity-time">10:24</div>
          </div>
          <div class="activity-item">
            <q-icon name="circle" color="positive" size="xs" class="activity-indicator" />
            <div class="activity-text">Расписание обновлено для Отдела разработки</div>
            <div class="activity-time">09:41</div>
          </div>
          <div class="activity-item">
            <q-icon name="circle" color="warning" size="xs" class="activity-indicator" />
            <div class="activity-text">Пользователь Иванов И. достиг 5 достижений</div>
            <div class="activity-time">Вчера</div>
          </div>
          <div class="activity-item">
            <q-icon name="circle" color="negative" size="xs" class="activity-indicator" />
            <div class="activity-text">Проблема с загрузкой видео "Растяжка шеи"</div>
            <div class="activity-time">Вчера</div>
          </div>
        </div>

        <div class="dashboard-card">
          <h2 class="card-title">
            <q-icon name="insert_chart" class="q-mr-sm" />
            Статистика просмотров
          </h2>
          <div class="chart-container">
            <!-- Add your chart component here -->
            <q-icon name="show_chart" size="100px" color="primary" class="q-mb-md" />
            <div class="text-grey-7">График просмотров видео по дням недели</div>
          </div>
        </div>
      </div>

      <div class="dashboard-row">
        <div class="dashboard-card">
          <h2 class="card-title">
            <q-icon name="trending_up" class="q-mr-sm" />
            Популярные видео
          </h2>
          <div class="activity-item">
            <q-icon name="play_circle" color="primary" size="sm" class="activity-indicator" />
            <div class="activity-text">Разминка для рук и плеч</div>
            <div class="activity-time">842 просмотра</div>
          </div>
          <div class="activity-item">
            <q-icon name="play_circle" color="primary" size="sm" class="activity-indicator" />
            <div class="activity-text">Растяжка спины для офиса</div>
            <div class="activity-time">753 просмотра</div>
          </div>
          <div class="activity-item">
            <q-icon name="play_circle" color="primary" size="sm" class="activity-indicator" />
            <div class="activity-text">Гимнастика для глаз</div>
            <div class="activity-time">687 просмотров</div>
          </div>
        </div>

        <div class="dashboard-card">
          <h2 class="card-title">
            <q-icon name="notifications" class="q-mr-sm" />
            Системные уведомления
          </h2>
          <div class="activity-item">
            <q-icon name="circle" color="negative" size="xs" class="activity-indicator" />
            <div class="activity-text">Необходимо обновить JWT-токены</div>
            <div class="activity-time">Важно</div>
          </div>
          <div class="activity-item">
            <q-icon name="circle" color="warning" size="xs" class="activity-indicator" />
            <div class="activity-text">Высокая нагрузка на сервер</div>
            <div class="activity-time">Предупреждение</div>
          </div>
          <div class="activity-item">
            <q-icon name="circle" color="positive" size="xs" class="activity-indicator" />
            <div class="activity-text">Резервное копирование завершено</div>
            <div class="activity-time">Успех</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
</script>

<style scoped>
.content {
  padding: 0 40px 40px;
}

.page-title {
  color: rgba(90,92,105,1);
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 30px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-title {
  color: rgba(78,115,223,1);
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  color: rgba(90,92,105,1);
}

.stat-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 48px;
  opacity: 0.1;
  color: rgba(78,115,223,1);
}

.dashboard-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.dashboard-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.card-title {
  color: rgba(90,92,105,1);
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(227,230,240,1);
  display: flex;
  align-items: center;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(227,230,240,0.5);
}

.activity-indicator {
  margin-right: 12px;
}

.activity-text {
  font-size: 14px;
  color: rgba(90,92,105,1);
  flex: 1;
}

.activity-time {
  font-size: 12px;
  color: rgba(108,117,125,1);
  margin-left: 12px;
}

.chart-container {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(108,117,125,1);
}
</style>


<script setup lang="ts">
</script>
