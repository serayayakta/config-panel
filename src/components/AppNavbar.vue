<template>
    <nav class="flex items-center justify-between h-20 w-full min-w-md py-12 px-12">
        <!-- Left: Logo -->
        <img src="/icon.png" alt="Logo" class="h-6" />

        <!-- Right: User Icon + Arrow -->
        <div class="flex items-center gap-1 cursor-pointer">
            <img src="/user-icon.svg" alt="User" class="h-6 w-6 text-white" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-white" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd" />
            </svg>
        </div>
    </nav>
</template>