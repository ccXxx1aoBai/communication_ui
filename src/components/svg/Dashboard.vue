<template>
  <svg t="1690118935034" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2228"
    width="200" height="200" :style="{width: `${size}px`, height: `${size}px`}">
    <path d="M887.936 314.048L600.128 601.984l-45.312-45.312 288-287.872 45.248 45.248z" fill="currentColor" fill-opacity=".9"
      opacity=".9" p-id="2229"></path>
    <path d="M513.408 707.328a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m0 64a128 128 0 1 0 0-256 128 128 0 0 0 0 256z"
      fill="currentColor" fill-opacity=".9" opacity=".9" p-id="2230"></path>
    <path
      d="M512 224a416 416 0 0 0-341.44 653.696l-52.48 36.608A480 480 0 0 1 734.72 214.656l-29.76 56.704A414.08 414.08 0 0 0 512 224z m416 416a414.08 414.08 0 0 0-46.848-192l56.768-29.568A478.08 478.08 0 0 1 992 640a477.952 477.952 0 0 1-86.08 274.304l-52.48-36.608A413.952 413.952 0 0 0 928 640z"
      fill="currentColor" fill-opacity=".9" opacity=".9" p-id="2231"></path>
  </svg>
</template>
  
<script setup lang='ts'>
const { size } = withDefaults(defineProps<{
  color?: string,
  size?: number
}>(), {
  color: '#cccccc',
  size: 18
})
</script>