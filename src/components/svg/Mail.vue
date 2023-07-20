<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"
    viewBox="0 0 32 32" fill="none" :style="{width: `${size}px`, height: `${size}px`}">
    <g opacity="1" transform="translate(0 0)  rotate(0)">
      <mask id="bg-mask-0" fill="white">
        <use transform="translate(0 0)  rotate(0)" xlink:href="#path_0"></use>
      </mask>
      <g mask="url(#bg-mask-0)">
        <path id="Vector" fill-rule="evenodd" style="fill: currentColor" opacity="1"
          d="M1 8.25002L1 23.73C1 25.6 2.52 27.12 4.39 27.12L27.61 27.12C29.48 27.12 31 25.6 31 23.73L31 8.25002C31 7.94002 30.96 7.64002 30.87 7.35002L18.52 15.97C17.77 16.52 16.89 16.78 16 16.78C15.12 16.78 14.23 16.51 13.46 15.96L1.19 7.15002C1.07 7.50002 1 7.87002 1 8.25002Z">
        </path>
        <path id="Vector" fill-rule="evenodd" style="fill: currentColor" opacity="1"
          d="M4.37977,4.87zM3.25977,5.06999c0.35,-0.12999 0.74,-0.19999 1.12,-0.19999h23.23003c0.47,0 0.92,0.1 1.34,0.28l-3.75,2.62l-8.36,5.84c-0.51,0.37 -1.18,0.37 -1.69,0.01z">
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