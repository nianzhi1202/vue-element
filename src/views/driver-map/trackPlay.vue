<template>
    <track_play_back class="track-container h-div" :show-table="true"></track_play_back>
</template>

<script>
    import Track_play_back from '../driver/track_play_back'
    import Request from '../../cores/request/request'
    export default {
        name: 'trackPlay',
        // eslint-disable-next-line vue/no-unused-components
        components: {Track_play_back},
        // mounted() {
        //     BaseCall.get( 'orderDriverInfo', { params: { id: this.$route.query.code } }, ({type, data}) => {
        //         if( type === 'success' ) {
        //             let resultData = data.data;
        //             if( resultData.car ) {
        //                 let title = resultData.car.vin_code;
        //
        //                 if( resultData.car.license_plate ) {
        //                     title += ' - ' + resultData.car.license_plate;
        //                 }
        //                 if( resultData.car.owner_name ) {
        //                     title += ' - ' + resultData.car.owner_name;
        //                 }
        //
        //                 this.title = title;
        //                 return true;
        //             }
        //         }
        //         this.title = this.$route.query.code;
        //     } );
        // },
        created() {
            const code = this.$route.query.code
            const type = this.$route.query.type

            this.$store.commit('update', {
                target: this.$store.state.modal.options,
                data: {
                    code: code,
                    type: type
                }
            })
        }
    }
</script>

<style scoped>
    .track-container /deep/ .track-play-back {
        height: calc( 100% - 160px );
    }

    .track-container /deep/ .yk-small-map {
        height: 100% !important;
    }
</style>
