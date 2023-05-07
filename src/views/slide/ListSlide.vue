<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import { productPerformance } from '@/data/dashboard/dashboardData';
import axios from '@/plugins/axios';
import { toast } from 'vue3-toastify';
import LoadingPopup from '@/components/LoadingPopup.vue';
import CreateTopic from '@/components/CreateTopic.vue';
// import { revertButtonCreateTopic, buttonCreateTopic } from '@/store/index';
// import AddImageTopic from '@/components/AddImageTopic.vue';
import AddSlideVue from '@/components/AddSlide.vue';
import UpdateSlideVue from '@/components/UpdateSlide.vue';

const { cookies } = useCookies();

const list = ref<any>([]);

const page = ref(1);
const limit = ref(10);
const totalPage = ref(1);
const dialog = ref(false);
const dialogImage = ref(false);
const loadingFetchPost = ref(false);

const openDialogAdd = ref(false);
const openDialogUpdate = ref(false);
const slide = ref({})

const size = ref({ state: '10 / page', abbr: 10 });
const listSize = ref([
    { state: '10 / page', abbr: 10 },
    { state: '20 / page', abbr: 20 },
    { state: '30 / page', abbr: 30 },
    { state: '40 / page', abbr: 40 },
    { state: '50 / page', abbr: 50 }
]);

const search = ref('');
const loadingPost = ref<any>({});

const fetchPost = (): void => {
    loadingFetchPost.value = true;
    let params: any = {
        page: page.value,
        limit: limit.value,
        search: search.value
    };
    axios
        .get('/api/slide/list')
        .then((response) => {
            list.value = response.data.list;
            list.value.map((i: any) => (loadingPost.value[i._id] = false));
            totalPage.value = response.data.totalPage;
        })
        .catch((error) => {
            toast.error('Đã xảy ra lỗi!');
            console.error(error);
        })
        .finally(() => (loadingFetchPost.value = false));
};

fetchPost();

const changeSize = (): void => {
    limit.value = size.value.abbr;
    fetchPost();
};

const changePagination = (p: any): void => {
    page.value = p;
    fetchPost();
};

const findPost = (page: any): void => {
    page.value = 1;
    limit.value = 10;
    fetchPost();
};

const deletePost = (): void => {
    loadingPost.value[postId.value] = true;
    dialog.value = false;
    axios
        .delete('/api/slide/delete/' + postId.value)
        .then((response) => {
            toast('Xoá slide thành công');
            fetchPost();
        })
        .catch((error) => {
            toast.error('Xoá slide thất bại');
            console.error(error);
        })
        .finally(() => (loadingPost.value[postId.value] = false));
};

const postId = ref('');
const openDialog = (id: string) => {
    postId.value = id;
    dialog.value = true;
};

const topicId = ref('');
const openDialogImage = (data: any) => {
   slide.value = data;
   openDialogUpdate.value = !openDialogUpdate.value;
};

const closeDialog = (type?: string) => {
    openDialogAdd.value = !openDialogAdd.value;
    if (type == 're-load') {
        fetchPost();
    }
};

const closeDialogUpdate = (type?: string) => {
    openDialogUpdate.value = !openDialogUpdate.value;
    if (type == 're-load') {
        fetchPost();
    }
};

const closeDialogImage = (type?: string) => {
    dialogImage.value = false;
    if (type == 're-load') {
        // fetchPost();
    }
};
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Chủ đề hình ảnh">
                <div class="pa-7 pt-0">
                    
                    <v-btn class="bg-primary" style="height: 50px;" @click="closeDialog">Thêm slide</v-btn>
                    <v-card elevation="10" class="" style="margin-top: 20px">
                        <v-card-item class="pa-6">
                            <!-- <v-card-title class="text-h5 pt-sm-2 pb-7">Danh sách thể loại</v-card-title> -->
                            <div style="max-height: 700px; overflow: auto">
                                <v-table class="month-table table-contact">
                                    <thead>
                                        <tr>
                                            <th class="text-subtitle-1 font-weight-bold" style="width: 10%">Stt</th>
                                            <th class="text-subtitle-1 font-weight-bold" style="width: 30%">Title</th>
                                            <th class="text-subtitle-1 font-weight-bold" style="width: 30%">Mô tả</th>
                                            <th class="text-subtitle-1 font-weight-bold" style="width: 20%">Hình ảnh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in list" :key="item._id" class="month-item">
                                            <td>
                                                <p class="text-15 font-weight-medium">{{ (page - 1) * limit + index + 1 }}</p>
                                            </td>
                                            <td>
                                                <p class="text-body-1 text-muted">{{ item.title }}</p>
                                            </td>
                                            <td>
                                                <p class="text-body-1 text-muted">{{ item.descriptions }}</p>
                                            </td>
                                            <td>
                                                <img :src="item.url_image" alt="" style="max-width: 150px;height: auto;">
                                            </td>
                                            <td>
                                                <div style="display: flex">
                                                    <v-btn style="margin-left: 5px; color: green" @click="openDialogImage(item)"
                                                        >Chỉnh sửa</v-btn
                                                    >
                                                    <v-btn
                                                        style="margin-left: 5px; color: red"
                                                        :loading="loadingPost[item._id]"
                                                        @click="openDialog(item._id)"
                                                        >Xoá</v-btn
                                                    >
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </div>
                          
                        </v-card-item>
                    </v-card>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent width="auto">
        <v-card>
            <v-card-title class="text-h5">Xoá slide?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="dialog = false"> Huỷ </v-btn>
                <v-btn color="green-darken-1" variant="text" @click="deletePost"> Xoá </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <LoadingPopup :dialog="loadingFetchPost" />
    <AddSlideVue :dialog="openDialogAdd" @success="closeDialog" @close="closeDialog" />
    <UpdateSlideVue :dialog="openDialogUpdate" :slide="slide" @success="closeDialogUpdate" @close="closeDialogUpdate" />
</template>

<style scoped>
.align-button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.input-item {
    margin-bottom: 20px;
}
</style>

<style>
.table-contact table {
    min-width: 700px;
}
</style>
