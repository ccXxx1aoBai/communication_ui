<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    :style="{ flex: `0 0 ${size}px`, height: `${size}px` }"
  >
    <g opacity="1" transform="translate(0 0)  rotate(0)">
      <mask id="mask-0" fill="white">
        <path
          d="M10 40L30 40C35.52 40 40 35.52 40 30L40 10C40 4.48 35.52 0 30 0L10 0C4.48 0 0 4.48 0 10L0 30C0 35.52 4.48 40 10 40Z"
        ></path>
      </mask>
      <g mask="url(#mask-0)"></g>
      <g mask="url(#mask-0)">
        <g
          opacity="1"
          transform="translate(5.99920654296875 5.99920654296875)  rotate(0)"
        >
          <path
            id="路径 27"
            fill-rule="evenodd"
            fill="currentColor"
            opacity="1"
            d="M14,0c7.73,0 14,6.27 14,14c0,7.73 -6.27,14 -14,14c-7.73,0 -14,-6.27 -14,-14c0,-7.73 6.27,-14 14,-14zM25.3751,14.0052c0,-6.29 -5.09,-11.38 -11.37,-11.38c-6.29,0 -11.38,5.09 -11.38,11.38c0,6.28 5.09,11.37 11.38,11.37c6.28,0 11.37,-5.09 11.37,-11.37z"
          ></path>
          <path
            id="路径 28"
            fill-rule="evenodd"
            fill="currentColor"
            opacity="1"
            d="M11.0865,11.0054zM16.9165,16.9954l1.96,-3.53c0.19,-0.34 0.56,-0.56 0.96,-0.56h2.91c0.61,0 1.1,0.49 1.1,1.1c0,0.6 -0.49,1.09 -1.1,1.09h-2.27l-2.6,4.69c-0.2,0.35 -0.56,0.56 -0.96,0.56c-0.4,0 -0.76,-0.21 -0.96,-0.56l-4.87,-8.78l-1.96001,3.53c-0.2,0.34 -0.56,0.56 -0.96,0.56h-2.92c-0.6,0 -1.09,-0.49 -1.09,-1.09c0,-0.61 0.49,-1.1 1.09,-1.1h2.28l2.60001,-4.69002c0.19,-0.34 0.56,-0.56 0.96,-0.56c0.4,0 0.76,0.22 0.95,0.56z"
          ></path>
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { size } = withDefaults(
  defineProps<{
    color?: string;
    size?: number;
  }>(),
  {
    color: '#cccccc',
    size: 18,
  }
);
</script>
