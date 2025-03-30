<template>
    <div class="min-h-screen bg-[#121727] text-white font-inter">
        <!-- ✅ Top Navbar -->
        <AppNavbar />

        <div class="px-12 py-8 mx-auto">
            <!-- ✅ Table Header -->
            <div class="hidden sm:grid grid-cols-6 gap-4 text-xl text-[#778ba3] pb-2 mb-3 text-left">
                <div>Parameter Key</div>
                <div>Value</div>
                <div class="col-span-2">Description</div>
                <div>Create Date ↓</div>
                <div />
            </div>

            <!-- ✅ Config List -->
            <div v-if="config.length" class="space-y-3 text-[#d2d2d5] text-left">
                <div v-for="item in config" :key="item.key"
                    class="grid grid-cols-1 sm:grid-cols-6 gap-8 items-start text-sm">

                    <!-- Key -->
                    <div class="font-medium sm:col-span-1">{{ item.key }}</div>

                    <!-- Value -->
                    <div class="sm:col-span-1">
                        <div v-if="editingKey === item.key" class="flex gap-2 items-center">
                            <input v-model="editedValue"
                                class="bg-gray-800 text-sm rounded-md px-3 py-1 border border-gray-600 w-full sm:w-auto" />
                            <button @click="saveEdit(item.key)"
                                class="bg-green-500 hover:bg-green-600 text-sm px-3 py-1 rounded-md">Save</button>
                            <button @click="cancelEdit" class="text-sm  hover:underline">Cancel</button>
                        </div>
                        <p v-else class="text-base break-all">{{ item.value }}</p>
                    </div>

                    <!-- Description -->
                    <div class="text-sm sm:col-span-2">{{ item.description }}</div>

                    <!-- Timestamp -->
                    <div class="text-xs  sm:text-right sm:col-span-1">{{ item.createdAt || '–' }}</div>

                    <!-- Actions -->
                    <div class="flex gap-4 sm:justify-end sm:col-span-1">
                        <button @click="startEdit(item.key, item.value)"
                            class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-md">Edit</button>
                        <button @click="deleteField(item.key)"
                            class="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-md">Delete</button>
                    </div>

                </div>
            </div>

            <!-- ✅ Add New Row -->
            <div class="grid grid-cols-1 sm:grid-cols-6 gap-8 items-center mt-8 text-sm">
                <input v-model="newKey" placeholder="New Parameter"
                    class="bg-transparent border border-gray-600 rounded-md px-3 py-1 text-white placeholder-gray-500 w-full" />
                <input v-model="newValue" placeholder="Value"
                    class="bg-transparent border border-gray-600 rounded-md px-3 py-1 text-white placeholder-gray-500 w-full" />
                <input v-model="newDesc" placeholder="New Description"
                    class="col-span-3 bg-transparent border border-gray-600 rounded-md px-3 py-1 text-white placeholder-gray-500 w-full" />
                <button @click="addField"
                    class="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded-md px-4 py-1 flex flex-wrap">ADD</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AppNavbar from '../components/AppNavbar.vue';


const config = ref([]);
const newKey = ref('');
const newValue = ref('');
const newDesc = ref('');
const editingKey = ref(null);
const editedValue = ref('');

// 📥 Fetch config from Firestore
onMounted(async () => {
    const docRef = doc(db, 'config', 'main');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        config.value = Object.entries(data).map(([key, value]) => ({
            key,
            value,
            description: "Default description...",
        }));
    }
});

const startEdit = (key, value) => {
    editingKey.value = key;
    editedValue.value = value;
};

const cancelEdit = () => {
    editingKey.value = null;
    editedValue.value = '';
};

const saveEdit = async (key) => {
    const docRef = doc(db, 'config', 'main');
    try {
        await updateDoc(docRef, { [key]: editedValue.value });

        config.value = config.value.map((item) =>
            item.key === key ? { ...item, value: editedValue.value } : item
        );

        editingKey.value = null;
        editedValue.value = '';
    } catch (err) {
        console.error("Error updating Firestore:", err);
        alert("Failed to save.");
    }
};

const deleteField = (key) => {
    alert(`Delete: ${key}`);
};

const addField = () => {
    alert(`Add: ${newKey.value} → ${newValue.value} (${newDesc.value})`);
};
</script>