<template>
    <div
            class="wt-action-item"
            v-on:click="item.onClick"
            :title="item.placeholder"
    >
        {{item.title}}
    </div>
</template>

<script>
    export default {
        name: 'WtActionBtn',
        props: ['item']
    }
</script>

<style scoped>
    .wt-action-item {
        background-color: rgba(255, 255, 255, .8);
        float: left;
        min-width: 35px;
        height: 30px;
        padding: 0 4px;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        font-weight: bold;
        color: #666;
        margin-left: 4px;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 3px;
        box-shadow: 1px 1px 2px rgba(0,0,0,.4);
    }

    .wt-action-item:hover {
        color: #333333;
        box-shadow: 1px 1px 2px #666;
    }
</style>
