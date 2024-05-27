<script setup>
const props = defineProps(["code"])

const imgSrc = computed(() => {
    return `https://flagcdn.com/16x12/${props.code ?? "ATA"}.png`
})
</script>

<template>
    <img :src="imgSrc" width="16" height="12" alt="⚽" />
</template>
