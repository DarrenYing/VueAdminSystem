<template>
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
  import { ref, computed } from 'vue';
  export default {
    name: "svgIcon",
    props: {
      iconClass: {
        type: String,
        default: ""
      },
      className: {
        type: String,
        default: ""
      }
    },

    // Vue2 写法
    // computed: {
    //   iconName() {
    //     return `#icon-${this.iconClass}`
    //   },
    //   svgClass() {
    //     if (this.className) {
    //       return 'svg-icon ' + this.className
    //     } else {
    //       return 'svg-icon'
    //     }
    //   }
    // },

    setup(props, context) {

      const iconName = computed(() => {
        return `#icon-${props.iconClass}`;
      });

      const svgClass = computed(() => {
        if(props.className) {
          return `svg-icon ${props.className}`;
        }
        else{
          return `svg-icon`;
        }
      });


      return {
        iconName,
        svgClass
      };
    }

  }
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }

</style>