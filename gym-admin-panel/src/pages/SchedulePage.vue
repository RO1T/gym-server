<template>
  <div class="q-pa-md">
    <h4>Расписание видео</h4>

    <div class="schedule-container">
      <div class="schedule-element" v-for="(day, idx) in days" :key="idx">
        <div class="schedule-element__head">
          <div>{{day.name}}</div>
        </div>
        <div class="schedule-element__body">
          <div v-if="day.items.length === 0" class="body__empty">
            <div>Нет видео на этот день</div>
          </div>
          <div v-else class="body__list">
            <ul v-for="(schedule, idx) in day.items" :key="idx" class="">
              <li v-bind:class = "(idx%2 === 0)?'li-even':'li-odd'">
                <div class="body__video_wrapper">
                    <div class="video__name">
                      <div class="video__label">
                        Видео
                      </div>
                      <span>
                        {{getVideoNameById(schedule.VideoID)}}
                      </span>
                  </div>
                  <div class="video__time">
                    <div>
                       <div class="time__label">
                          Время
                      </div>
                      <span>
                          {{ schedule.Time }}
                      </span>
                    </div>
                     <div class="body__video_buttons">
                      <q-btn
                        icon="edit"
                        flat
                        class="video__edit_btn"
                        @click="onEdit(getVideoNameById(schedule.VideoID), schedule.VideoID, day.order); isEditModalOpen = true; index = schedule.ID"
                      />
                      <button class="video__delete" @click="index = schedule.ID; _removeSchedule()">
                        &times;
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <button class="body__add-btn" @click="onAdd(day.order); isEditModalOpen = true;">
            Добавить +
          </button>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="isEditModalOpen">
    <q-card style=" min-width: 400px; min-height: 200px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px">
      <q-select
        v-model="newVideoName"
        label="Название видео"
        style="width: 80%"
        placeholder="Выберите видео"
        :display-value="newVideoName ? `${newVideoName}` : `Выберите видео`"
        :options="videos.map((el:any) => el.Name)"
        @update:model-value="onSelectedVideoChange"
      />
      <span>Выберите время показа</span>
      <q-time
        v-model="timeWithSeconds"
        landscape
        @update:model-value="onSelectedTimeChange"
      />
      <div style="width: 80%; display: flex; gap: 20px; margin-bottom: 20px;">
        <q-btn
          label="Сохранить"
          color="positive"
          style="width: 50%"
          @click="onSave"
        />
        <q-btn
          label="Отмена"
          color="negative"
          style="width: 50%"
          @click="onDecline"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const mondayVideos: { ID: string, Time: string, VideoID: string, Name: string }[] = []
const tuesdayVideos: { ID: string, Time: string, VideoID: string, Name: string }[] = []
const wednesdayVideos: { ID: string, Time: string, VideoID: string, Name: string }[] = []
const thursdayVideos: { ID: string, Time: string, VideoID: string, Name: string }[] = []
const fridayVideos: { ID: string, Time: string, VideoID: string, Name: string }[] = []
const saturdayVideos: { ID: string, Time: string, VideoID: string, Name: string }[] = []
const sundayVideos: { ID: string, Time: string, VideoID: string, Name: string }[] = []

const days = ref([
  { items: mondayVideos, name: "Понедельник", bg: 'bg-primary', order:0 },
  { items: tuesdayVideos, name: "Вторник", bg: 'bg-primary',order:1 },
  { items: wednesdayVideos, name: "Среда", bg: 'bg-primary',order:2 },
  { items: thursdayVideos, name: "Четверг", bg: 'bg-primary',order:3 },
  { items: fridayVideos, name: "Пятница", bg: 'bg-primary',order:4 },
  { items: saturdayVideos, name: "Суббота", bg: 'bg-primary',order:5 },
  { items: sundayVideos, name: "Воскресенье", bg: 'bg-primary',order:6 },
])
const videos = ref()
const index = ref()
const isEditModalOpen = ref(false)
const newVideoName = ref('')
const timeWithSeconds = ref('')
const videoToSchedule = ref({
  dayofweek: '',
  time: '',
  videoid: ''
})

type videoData = {
  ID:string,
  created_at:string,
  updated_at:string,
  deleted_at:string,
  Name:string,
  archived:boolean
}

const init = () => {
  const token = localStorage.getItem('token');

  days.value.forEach(async (day, idx) => {
    setTimeout(async () => {
      await fetch(`http://localhost:8083/api/v1/schedule/${idx}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        }).then(async (res) => {
          const response = await res.json()
          day.items = response
        })
    }, idx * 50)
  })
}

onMounted(async () => {
  init()
  await fetch(`http://localhost:8083/api/v1/videos`, {
    method: 'GET',
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json()
      videos.value = response;
    }
  })
})

const _removeSchedule = async () => {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:8083/api/v1/schedule/${index.value}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }).then(async (res) => {
    if (res.ok) {
      init()
    }
  })
}

// const addSchedule = async (id: number) => {
//   const token = localStorage.getItem('token');
//   await fetch(`http://localhost:8083/api/v1/schedule/${id + 1}`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//     }).then(async () => {
//       init()
//   })
// }

const updateSchedule = async () =>{
  const token = localStorage.getItem('token');

  if(videoToSchedule.value.videoid === '' || videoToSchedule.value.time === '' || videoToSchedule.value.dayofweek === '')
    return

  await fetch(`http://localhost:8083/api/v1/schedule`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      dayofweek: Number(videoToSchedule.value.dayofweek),
      time: videoToSchedule.value.time,
      videoid: Number(videoToSchedule.value.videoid)
    }),
  }).then(async (res) => {
    if (res.ok) {
      init()
    }
  })
}

const onSave = () => {
  updateSchedule().then(
    () => onDecline()
  )
}

const onDecline = () => {
  videoToSchedule.value.dayofweek =''
  videoToSchedule.value.time =''
  videoToSchedule.value.videoid =''
  isEditModalOpen.value = false
  newVideoName.value=''
}

const onSelectedTimeChange = (value: string | null) =>{
  if(value)
    videoToSchedule.value.time = value
}

const onAdd = (dayOfWeek:number) =>{
  videoToSchedule.value.dayofweek = dayOfWeek.toString()
}
const onEdit = (videoName:string, videoID:string, dayOfWeek:number) => {
  newVideoName.value = videoName
  videoToSchedule.value.videoid = videoID.toString()
  videoToSchedule.value.dayofweek = dayOfWeek.toString()
}

const onSelectedVideoChange = (value:string) =>{
  const [video] = getVideoIdByName(value)
  videoToSchedule.value.videoid = video.ID.toString()
}

const getVideoIdByName = (name:string) => {
  return videos.value.filter((video:videoData) => video.Name === name)
}

const getVideoNameById = (id:string) => {
  const filtered = videos.value.filter((video:videoData) => video.ID === id)
  return filtered.length > 0 ? filtered[0].Name : `There's no video with such ID`;
}

</script>
<style>
  .schedule-container{
    display:flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: start;
    gap:10px;
  }
  .body__video_wrapper{
    width: 100%;
  }
  .schedule-element{
    flex:1;
    min-width: 155px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-radius:5px;
    border: 2px solid #161e43;
  }
  .schedule-element__head{
    padding: 10px;
    color:#fff;
    background: #161e43;
  }
  .body__empty{
    margin-top: auto;
  }
  .schedule-element__head > div,
  .body__empty > div{
    margin: 0 auto;
    width: max-content;
  }

  .schedule-element__body{
    background: #72779f;
    height: 100%;
    min-height: 200px;

    display: flex;
    flex-direction: column;
  }
  .body__add-btn{
    margin-top: auto;
    width: 100%;
    background: #161e43;
    padding: 10px;
    color:#fff;
    border: none;
  }
  .body__add-btn:hover{
    cursor: pointer;
    background: #1d2753;
  }
  .body__add-btn:active{
    background: #161e43;
  }

  .body__list > ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }
  .body__list > ul > li{
    display: flex;
    flex-direction: row;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
  }

  .time__label,
  .video__label{
    font-size: 12px;
    opacity: .8;
  }

  .video__time{
    display: flex;
    justify-content: space-between;
  }
  .body__video_buttons{
    display: flex;
    align-items: center;
    gap:5px;
  }

  .video__delete{
    width: 25px;
    aspect-ratio: 1/1;
    background: none;
    border: 2px solid #161e43;
    border-radius: 3px;
  }
  .video__delete:hover{
    cursor: pointer;
    background: #161e43;
    color:#fff;
  }
  .video__edit_btn{
    padding: 0;
  }
  .li-odd{
    background: #676c8e;
  }

</style>
