<template>
    <v-alert v-model="value" dismissible :color="color || 'info'" :ref="vuetify_ref" :dense="dense" :class="exibir?'':'display_none'" dark >
        <div v-if="value_type=='string'">
            {{value}}
        </div>
        <ul v-else class="pl-3">
            <li v-for="(msg, key) in value" :key="key">
                {{msg}}

                <v-tooltip v-if="key==0 && tooltip" bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on" style="cursor:pointer; font-size:21px">help</v-icon>
                    </template>
                    <span> {{tooltip}} </span>
                </v-tooltip>
            </li>
        </ul>
    </v-alert>
</template>

<script>
    export default {
        extends: window.Vue._VAlert,
        props: {
            tooltip:String,
        },
        computed:{
            vuetify_ref(){
                return this.ref || 'v-alert'
            },
            value_type(){
                return this.$typeof(this.value)
            },
            exibir(){
                return this.$typeof(this.value,'string') || Object.keys(this.value).length > 0
            },
        },
        mounted(){
            this.$mesclarComponentesViaRef(this)
        },
    }
 </script>

 <style>
 .display_none {
     display: none
 }
 </style>

