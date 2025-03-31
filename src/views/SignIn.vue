<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-[#121727] text-gray-500 font-inter px-4">

        <!-- Logo -->
        <div class="flex justify-center">
            <img src="/icon.png" alt="Logo" class="h-36" />
        </div>

        <!-- Title -->
        <h2 class="text-center text-lg text-[#404664] tracking-wide mt-10">Please sign in</h2>

        <!-- Email -->
        <input v-model="email" type="email" placeholder="E-mail address"
            class="w-72 px-4 py-2 mt-4 rounded-t-md !bg-[#1c1f2c] text-gray-200 border border-[#404664] focus:border-[#e34bc7] text-sm placeholder-gray-400 focus:outline-none"
            required />

        <!-- Password -->
        <input v-model="password" type="password" placeholder="Password" @keyup.enter="signIn"
            class="w-72 px-4 py-2 rounded-b-md !bg-[#1c1f2c] border border-[#404664] focus:border-[#e34bc7] text-sm placeholder-gray-400 focus:outline-none"
            required />

        <!-- Button -->
        <button @click="signIn"
            class="w-72 mt-2 bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] hover:opacity-90 text-white font-semibold py-2 rounded-md text-xs transition">
            Sign in
        </button>

        <!-- Error -->
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

        <!-- Footer -->
        <p class="text-center text-xs text-gray-500 mt-14">Codeway © 2021</p>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter();

const signIn = async () => {
    try {
        error.value = null;
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        const token = await user.getIdToken();

        console.log("✅ Logged in UID:", user.uid);
        console.log("🔐 Token:", token.slice(0, 20) + "...");

        router.push('/');
    } catch (err) {
        error.value = "Invalid credentials";
    }
};
</script>