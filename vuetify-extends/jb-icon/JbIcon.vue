<template>

    <v-tooltip v-if="ttText" :bottom="ttBottom">

        <template v-slot:activator="{ on }">
            <v-icon small :color="color" @click="$emit('click')" v-on="on"> <slot></slot> </v-icon>
        </template>
        <span style="font-size:small">{{ttText}}</span>

    </v-tooltip>


    <v-icon v-else small :color="color" @click="$emit('click')"> <slot></slot> </v-icon>

</template>
<script>

export default {
    props:{
        ttBottom:{type:Boolean, default:true}, ttText:String,
        type:String, color:String,
    },
    data(){
        return {
            iconName: this.getIcon(),
            classes:''
        }
    },
    created(){
        this.classes = this.$vnode.data.staticClass;
    },
    methods:{
        getIcon(){
            if (this.$slots.default) {
                return this.$slots.default[0].text.trim()
            }
        },
        trabalhaIcone(){
            let icon = this.$el.tagName=="I" ? this.$el : this.$el.getElementsByTagName('i')
            if({}.hasOwnProperty.call(icon,'0')){
                icon = icon[0]
            }

            if(typeof this.$listeners.click=='undefined'){
                // icon.classList.remove('v-icon--link')
            }
        }
    },
    mounted(){
        this.trabalhaIcone()

    },
}
</script>
