<template>
    <v-dialog v-model="props.dialog" persistent width="1024">
        <!-- <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
        </template> -->
        <v-card>
            <v-card-title>
                <span class="text-h5">Thêm slide</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-label>Tiêu đề</v-label>
                            <v-text-field v-model="title" label="Tiêu đề"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-label>Mô tả</v-label>
                            <v-text-field v-model="descriptions" label="Mô tả"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-label>Link</v-label>
                            <v-text-field v-model="link" label="Link bài viết (Nếu có)"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-label>Hình ảnh <span style="color: red;">*</span> </v-label>
                            <v-file-input
                                v-model="files"
                                :show-size="1000"
                                accept="image/*"
                                class="input-item"
                                label="Tải lên ảnh bìa"
                                color="primary"
                                required="true"
                            ></v-file-input>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" style="color: red" @click="closeDialog"> Close </v-btn>
                <v-btn color="blue-darken-1" :loading="loading" variant="text" style="color: blue" @click="submitForm"> Save </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';
import { toast } from 'vue3-toastify';
import axios from '@/plugins/axios';

const props = defineProps({
    dialog: Boolean
});
const emit = defineEmits(['close', 'success']);

const topic = ref('');
const loading = ref(false);
const title = ref('');
const descriptions = ref('');
const link = ref('');
const files = ref([]);




const submitForm = () => {
    if(!files.value.length) {
        toast.error('Vui lòng chọn ảnh');
        return;
    }
    loading.value = true;
    let data = new FormData()
    data.append('title', title.value.trim())
    data.append('descriptions', descriptions.value.trim())
    data.append('link', link.value.trim())
    data.append('file', files.value[0])
    
    axios
        .post('/api/slide/create', data)
        .then((response: any) => {
            toast('Thành công');
            title.value = '';
            descriptions.value = '';
            link.value = '';
            files.value = [];
            emit('success', 're-load');
        })
        .catch((error) => {
            toast.error('Đã xảy ra lỗi!');
            console.error(error);
        })
        .finally(() => (loading.value = false));
};

const closeDialog = () => {
    emit('close');
};
</script>
