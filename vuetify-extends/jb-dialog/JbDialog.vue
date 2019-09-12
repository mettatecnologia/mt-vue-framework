<template>
    <v-dialog v-model="mostrar" :fullscreen="fullscreen" :persistent="persistent" :max-width="maxWidth" :ref="vuetify_ref">

        <v-card>
            <v-card-title>
                <span class="headline">{{ getTitulo }}</span>
                <v-spacer></v-spacer>
                <jb-icon v-if="this.$listeners.fechar" tt-text="Fechar" @click="v=>(this.$emit('fechar', false))">fas fa-times</jb-icon>
            </v-card-title>

            <v-card-text>

                <slot ></slot>

            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<script>

    export default {
        props:{
            value:Boolean,
            persistent:Boolean, fullscreen:Boolean, maxWidth:String, titulo:String,
        },
        data() {
            return {
            }
        },
        computed:{
            getTitulo(){ return this.titulo },
            mostrar(){ return this.value },
            vuetify_ref(){
                return this.ref || 'v-dialog'
            }
        }
    }
</script>
