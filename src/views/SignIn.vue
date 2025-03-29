<template>
    <div class="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <form @submit.prevent="signIn" class="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 class="text-xl font-semibold text-center">Admin Login</h2>
            <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 border rounded-md"
                required />
            <input v-model="password" type="password" placeholder="Password" class="w-full px-4 py-2 border rounded-md"
                required />
            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                Login
            </button>
            <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
        </form>
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
        console.log("🔐 Token:", token.slice(0, 20) + "..."); // for debugging

        router.push('/');
    } catch (err) {
        error.value = "Invalid credentials";
    }
};

</script>