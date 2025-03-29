<template>
    <div class="p-4 text-center">
        <h1 class="text-2xl font-bold">Welcome to the Config Panel</h1>
        <p class="text-gray-600 mt-2">You're logged in!</p>
        <button @click="logout" class="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
    </div>
</template>

<script setup>
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async () => {
    await signOut(auth);
    router.push('/signin');
};
</script>