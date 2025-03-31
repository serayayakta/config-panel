<template>
    <div class="min-h-screen bg-[#121727] text-white px-4 py-2 font-inter">
        <AppNavbar />
        <div class="max-w-md mx-auto">
            <div v-if="loading" class="text-center text-gray-400 text-sm">Loading...</div>
            <div v-else-if="error" class="text-center text-red-400 text-sm">Error: {{ error }}</div>

            <div v-else class="space-y-4">
                <div v-for="(item, key) in config" :key="key"
                    class="border border-white rounded-2xl py-2 px-4 shadow-sm flex flex-col gap-1">

                    <div class="flex w-full text-md font-bold">
                        <div>Parameter Key: </div>
                        <div class="text-right text-[#9c9c9f] font-medium tracking-wide ml-2">
                            {{ key }}
                        </div>
                    </div>

                    <div class="flex w-full text-md font-bold">
                        <div>Value: </div>
                        <template v-if="editingKey === key">
                            <input v-model="editedValue"
                                class="bg-transparent text-[#9c9c9f] text-sm border border-gray-600 rounded-md px-2 py-[2px] w-full ml-2"
                                placeholder="Value" />
                        </template>
                        <div v-else class="text-right text-[#9c9c9f] font-medium tracking-wide ml-2">
                            {{ item.value }}
                        </div>
                    </div>

                    <div class="flex w-full text-md font-bold">
                        <div>Description: </div>
                        <template v-if="editingKey === key">
                            <input v-model="editedDescription"
                                class="bg-gray-800 border border-gray-600 text-sm rounded-md px-3 py-1 text-white w-full ml-2"
                                placeholder="Description" />
                        </template>
                        <div v-else class="text-right text-[#9c9c9f] font-medium tracking-wide ml-2">
                            {{ item.description }}
                        </div>
                    </div>

                    <div class="flex justify-center gap-2 pt-2 text-md">
                        <template v-if="editingKey === key">
                            <button @click="saveEdit(key)"
                                class="bg-green-500 text-white px-4 py-1 rounded-md">Save</button>
                            <button @click="cancelEdit" class="text-gray-400 underline px-4 py-1">Cancel</button>

                        </template>

                        <template v-else>
                            <button @click="startEdit(key, item)"
                                class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-md">
                                Edit
                            </button>
                            <button @click="deleteConfigItem(key)"
                                class="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded-md">
                                Del
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchConfig, updateConfig, deleteConfig } from '../services/api';
import AppNavbar from '@/components/AppNavbar.vue';

const config = ref({});
const editingKey = ref(null);
const editedValue = ref('');
const editedDescription = ref('');
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const data = await fetchConfig();
        if (data) {
            config.value = data;
        } else {
            error.value = 'No data received';
        }
    } catch (err) {
        error.value = 'Failed to load config';
        console.error(err);
    } finally {
        loading.value = false;
    }
});

const startEdit = (key, item) => {
    editingKey.value = key;
    editedValue.value = item.value;
    editedDescription.value = item.description;
};

const cancelEdit = () => {
    editingKey.value = null;
    editedValue.value = '';
    editedDescription.value = '';
};

const saveEdit = async (key) => {
    try {
        await updateConfig(key, editedValue.value, editedDescription.value);
        config.value[key].value = editedValue.value;
        config.value[key].description = editedDescription.value;
        cancelEdit();
    } catch (err) {
        alert('Failed to save');
        console.error(err);
    }
};

const deleteConfigItem = async (key) => {
    try {
        await deleteConfig(key);
        delete config.value[key];
    } catch (err) {
        alert('Failed to delete');
        console.error(err);
    }
};
</script>