<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRoute } from 'vue-router';
import LoadingPopup from '@/components/LoadingPopup.vue';
import axios from '@/plugins/axios';
import { toast } from 'vue3-toastify';

const route = useRoute();
const loading = ref(false);
const contact = ref<any>({});

const fetchContact = (): void => {
    if (!route.params.id) return;
    loading.value = true;
    axios
        .get('/api/contact/get/' + route.params.id)
        .then((response) => {
            contact.value = response.data.data;
        })
        .catch((error) => console.error(error))
        .finally(() => (loading.value = false));
};

const loadingUpdate = ref(false)

const updateContact = (): void => {
    if (!route.params.id) return;
    loadingUpdate.value = true;
    axios
        .post('/api/contact/update/' + route.params.id, { active: true })
        .then((response) => {
            toast.success("Cập nhật thành công")
            fetchContact()
        })
        .catch((error) => console.error(error))
        .finally(() => (loadingUpdate.value = false));
};

fetchContact();
</script>
<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Chi tiết">
                <div class="pa-7 pt-0">
                    <span v-if="contact.active"> <v-label  class="font-weight-bold mb-1">Tình trạng: </v-label><span style="margin-left: 5px; color: green;"> Đã liên hệ</span> </span><br />
                    <span v-if="!contact.active"> <v-label  class="font-weight-bold mb-1">Tình trạng: </v-label><span style="margin-left: 5px; color: red;"> Chưa liên hệ</span> </span><br />
                    <v-label class="font-weight-bold mb-1">Họ và tên: </v-label><span style="margin-left: 5px"> {{ contact.name }}</span>
                    <br />
                    <v-label class="font-weight-bold mb-1">Email: </v-label><span style="margin-left: 5px"> {{ contact.email }}</span>
                    <br />
                    <v-label class="font-weight-bold mb-1">Số điện thoại: </v-label
                    ><span style="margin-left: 5px"> {{ contact.phone }}</span> <br />
                    <v-label class="font-weight-bold mb-1">Khoá học quan tâm: </v-label
                    ><span style="margin-left: 5px"> {{ contact?.course }}</span> <br />
                    <v-label class="font-weight-bold mb-1">Cơ sở quan tâm: </v-label
                    ><span style="margin-left: 5px"> {{ contact?.base }}</span> <br />
                    <v-label class="font-weight-bold mb-1">Câu hỏi: </v-label>
                    <p>{{ contact?.descriptions }}</p>
                    <br />
                    <v-btn v-if="!contact.active" color="green-darken-1" @click="updateContact">Xác nhận đã liên hệ</v-btn>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
    <LoadingPopup :dialog="loading" />
</template>
