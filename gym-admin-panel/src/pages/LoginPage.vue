<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center login-page">
        <div class="login-container">
          <div class="header">
            <span class="header-title">Производственная Гимнастика</span>
            <div class="header-subtitle">Панель администратора</div>
          </div>

          <div class="login-form">
            <h2 class="text-h4 q-mb-xl text-weight-bold text-grey-8 text-center">
              {{ !isCodeSended ? 'Вход в систему' : 'Подтверждение входа' }}
            </h2>

            <q-form @submit.prevent="isCodeSended ? onLogin() : onSubmit()" class="q-gutter-y-md">
              <q-input
                v-if="!isCodeSended"
                v-model="login"
                label="Введите ваш email"
                type="email"
                outlined
                class="input-field"
                :rules="[val => !!val || 'Email обязателен']"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" color="primary" />
                </template>
              </q-input>

              <q-input
                v-if="isCodeSended"
                v-model="code"
                label="Введите код с почты"
                outlined
                class="input-field"
                :rules="[val => !!val || 'Код обязателен']"
              >
                <template v-slot:prepend>
                  <q-icon name="key" color="primary" />
                </template>
              </q-input>

              <q-btn
                type="submit"
                color="primary"
                class="full-width q-py-sm q-mt-xl text-weight-bold login-btn"
                size="lg"
                :label="!isCodeSended ? 'Получить код' : 'Войти в систему'"
              />

              <q-btn
                v-if="isCodeSended"
                flat
                color="primary"
                class="full-width q-mt-md"
                label="Отправить код повторно"
                @click="isCodeSended = false"
              />
            </q-form>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { EmailResponse } from 'src/types/api';
import { QLayout, QPageContainer, QPage } from 'quasar';

const router = useRouter();
const login = ref('');
const code = ref('');
const userId = ref('');
const isCodeSended = ref(false);

const onSubmit = async () => {
  try {
    const url = 'email/send';
    const response = await api.post<EmailResponse>(url, {
      email: login.value
    });
    userId.value = response.data.id;
    isCodeSended.value = true;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const onLogin = async () => {
  try {
    const url = `email/${userId.value}/confirm`;
    const response = await api.post(url, {
      code: Number(code.value)
    });
    localStorage.setItem('token', response.data.token);
    router.push('/admin');
  } catch (error) {
    console.error('Error confirming code:', error);
  }
};
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  min-height: 100vh;
}

.login-container {
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: translateY(-20px);
}

.header {
  width: 100%;
  padding: 2.5rem 2rem;
  background: rgba(78,115,223,1);
  color: white;
  border-radius: 16px 16px 0 0;
  text-align: center;
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
}

.header-title {
  font-size: 1.75rem;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.header-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.login-form {
  padding: 3rem 2.5rem;
}

:deep(.input-field) {
  font-size: 16px;
}

:deep(.q-field__control) {
  height: 56px;
  border-radius: 12px;
}

:deep(.q-field--outlined .q-field__control) {
  border: 2px solid rgba(227,230,240,1);
}

:deep(.q-field--outlined .q-field__control:hover) {
  border-color: rgba(78,115,223,0.7);
}

:deep(.q-field--focused .q-field__control) {
  border-color: rgba(78,115,223,1) !important;
}

:deep(.login-btn) {
  border-radius: 12px;
  height: 56px;
  font-size: 1.1rem;
}

:deep(.q-btn) {
  text-transform: none;
}
</style>
