<template>
    <i :class="className" class="img-mask" :style="style" :title="title"></i>
</template>

<script>
    // import main from '../configs/main';
    export default {
        name: 'WtIcon',
        props: ['name', 'title', 'size', 'color', 'weight'],

        computed: {
            className() {
                return 'wt-icon ' + this.name
            },
            style() {
                let size = this.size || ('12px')
                let color = this.color || ('#333333')
                let weight = this.weight || ('5px')
                return 'font-size: ' + size + '; color: ' + color + '; margin: 0 ' + weight + '; '
            }

        }

    }
</script>

<style scoped>

</style>
