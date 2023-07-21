<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"
    viewBox="0 0 32 32" fill="none" :style="{width: `${size}px`, height: `${size}px`}">
    <g opacity="1" transform="translate(0 0)  rotate(0)">
      <mask id="bg-mask-0" fill="white">
        <use transform="translate(0 0)  rotate(0)" xlink:href="#path_0"></use>
      </mask>
      <g mask="url(#bg-mask-0)">
        <path id="Vector" fill-rule="evenodd" style="fill: currentColor" opacity="1"
          d="M26,30h-4v-8c0,-2.2 -1.78,-4 -4,-4h-4c-2.22,0 -4,1.8 -4,4v8h-4c-2.2,0 -4,-1.78 -4,-4v-5.99c0,-2.5 -0.03,-3.9 0.41,-5.1c0.44,-1.22 1.33,-2.12 2.84,-3.63l7.92,-8.1c0.78,-0.78 1.8,-1.18 2.83,-1.18c1.03,0 2.05,0.4 2.83,1.18l7.92,8.1c1.51,1.51 2.4,2.41 2.84,3.63c0.44,1.2 0.41,2.6 0.41,5.1v5.99c0,2.22 -1.8,4 -4,4zM12,30v-8c0,-1.13 0.9,-2 2,-2h4c1.1,0 2,0.87 2,2v8z">
        </path>
      </g>
    </g>
    <defs>
      <rect id="path_0" x="0" y="0" width="32" height="32" />
    </defs>
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