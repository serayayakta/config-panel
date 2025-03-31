<template>
    <div class="min-h-screen bg-[#121727] text-white px-4 py-2 font-inter">
        <AppNavbar />
        <div class="max-w-md mx-auto">
            <div v-if="loading" class="text-center text-gray-400 text-sm">Loading...</div>
            <div v-else-if="error" class="text-center text-red-400 text-sm">Error: {{ error }}</div>

            <div v-else class="space-y-4">
                <div v-for="(item, key) in config" :key="key"
                    class="border border-white rounded-2xl py-2 px-4 shadow-sm flex flex-col gap-1">

                    <div class="flex w-full text-sm font-bold">
                        <div>Parameter Key: </div>
                        <div class="text-right text-[#9c9c9f] font-medium tracking-wide ml-2">
                            {{ key }}
                        </div>
                    </div>

                    <div class="flex w-full text-sm font-bold">
                        <div>Value: </div>
                        <div class="text-right text-[#9c9c9f] font-medium tracking-wide ml-2">
                            {{ item.value }}
                        </div>
                    </div>

                    <div class="flex w-full text-sm font-bold">
                        <div>Description: </div>
                        <div class="text-right text-[#9c9c9f] font-medium tracking-wide ml-2">
                            {{ item.description }}
                        </div>
                    </div>

                    <div class="flex justify-center gap-2 pt-2">
                        <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-3 py-1 rounded-md">
                            Edit
                        </button>
                        <button class="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-3 py-1 rounded-md">
                            Del
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchConfig } from '../services/api';
import AppNavbar from '@/components/AppNavbar.vue';

const config = ref({});
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
</script>