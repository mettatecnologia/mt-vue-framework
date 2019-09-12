<template>
    <v-btn fab depressed x-small :href="href" color="white">
        <v-icon color="primary" >arrow_back</v-icon>
    </v-btn>
</template>

<script>

    export default {
        props: {
            href:{type:String,default:"javascript:history.back()"}
        },
        data: function () {
            return {
                vmodel:this.value
            }
        },
    }
</script>
