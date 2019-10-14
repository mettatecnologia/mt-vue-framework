<template>

    <v-btn :href="url" :color="color" :fab="fab" :small="small" :icon="icon" :tile="tile" :elevation="elevation">

        <jb-icon  small dark :color="iconColor" > {{icone}} </jb-icon>
        <slot v-if="!fab"> Voltar </slot>

    </v-btn>

</template>

<script>

import {globalMixin} from '../jb-global/jb-v-mixin-global'

export default {
    mixins:[globalMixin],
    props:{
        elevation:{type:[Number, String], default:1},
        fab:{type:Boolean, default:true},
        icon:Boolean,
        small:{type:Boolean, default:true},
        tile:Boolean,
        color:{type:String, default:'white'},

        iconColor:{type:String, default:'primary'},
        icone:{type:String, default:'fas fa-arrow-left'},
        url:{type:String, default:"javascript:history.back()"},
    },
    computed:{
        vuetify_ref(){
            return this.ref || 'v-btn-voltar'
        },
    },
}
</script>
