<template>
    <div class="min-h-screen bg-[#121727] text-white px-4 py-6 font-inter">
        <div class="max-w-md mx-auto">
            <div v-if="loading" class="text-center text-gray-400 text-sm">Loading...</div>
            <div v-else-if="error" class="text-center text-red-400 text-sm">Error: {{ error }}</div>

            <div v-else class="space-y-4">
                <div v-for="(item, key) in config" :key="key"
                    class="bg-[#1c1f2c] border border-[#2e3749] rounded-2xl p-4 shadow-sm flex flex-col gap-2">

                    <div class="flex w-full text-sm font-semibold text-[#778ba3]">
                        <div>Parameter Key: </div>
                        <div class="text-right text-white font-medium tracking-wide ml-2">
                            {{ key }}
                        </div>
                    </div>

                    <div class="flex w-full text-sm font-semibold text-[#778ba3]">
                        <div>Value</div>
                        <div class="text-right text-white font-medium tracking-wide ml-2">
                            {{ item.value }}
                        </div>
                    </div>

                    <div class="flex w-full text-sm font-semibold text-[#778ba3]">
                        <div>Description</div>
                        <div class="text-right text-white font-medium tracking-wide ml-2">
                            {{ item.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchConfig } from '../services/api';

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