<template>
    <div>
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" :color="color" dark app fixed >
            <v-toolbar-content style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon v-if="comMenu" @click.stop="abrir_menudrawer = !abrir_menudrawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down"><v-btn text :href="href" class="v-btn-remove-fundo-before">{{titulo}}</v-btn></span>
            </v-toolbar-content>

            <slot></slot>

        </v-app-bar>

        <slot name="menu">
            <!-- <menulateral-principal v-if="comMenu" v-model="abrir_menudrawer" :itens="JSON.parse(menuItens)" ></menulateral-principal> -->
        </slot>

    </div>
</template>

<script>

    export default {
        props: {
            comMenu:Boolean, menuItens:String,
            titulo:String, href:{type:String, default:"/"}, color:{type:String, default:"primary"},
        },
        data: () => ({
            abrir_menudrawer: false,
        }),
        methods: {
        },
        mounted(){
        }
    }
</script>

