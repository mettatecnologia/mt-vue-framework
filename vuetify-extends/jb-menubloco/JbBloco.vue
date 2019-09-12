<template>
<div>

    <v-hover>
        <v-card tile :color="color" dark :min-height="height || '140'" class="jb-bloco ma-1" slot-scope="{ hover }" >
            <v-card-text class="headline pa-0"  >
                <v-row align="center" justify="space-between" class="px-3 pt-3">


                    <div class="text-sm-left">
                        <div class="white--text pl-3"> <slot></slot> </div>
                    </div>

                    <div v-if="icone" class="pr-2">
                        <v-icon v-if="icone" class="icon icon-mdi">{{icone}}</v-icon>
                    </div>

                    <v-expand-transition v-if="hoverText">
                        <div v-if="hover" :class="configuraHoverClasses()"  style="height: 100%;" >
                        {{hoverText}}
                        </div>
                    </v-expand-transition>


                </v-row>
            </v-card-text>

            <v-card-actions class="pa-0 fixar">
                <v-btn depressed small block :href="action" @click=" v => (action?null:dialog.mostrarDialog = true) " class="pa-0 caption" ><v-icon class="mr-1 body-1">{{actionIcon || 'arrow_forward'}}</v-icon> {{actionText || 'Entrar'}} </v-btn>
            </v-card-actions>
        </v-card>

    </v-hover>

    <v-dialog v-model="dialog.mostrarDialog" :fullscreen="dialogFullscreen" :persistent="dialogPersistent" :max-width="dialogMaxWidth || 'max-content'">
        <v-card>
            <v-card-title>
                <span class="headline">{{ dialogTitulo }}</span>
                <v-spacer></v-spacer>
                <jb-icon tt-text="Fechar" @click="v=>( this.dialog.mostrarDialog = false )">fas fa-times</jb-icon>
            </v-card-title>

            <v-card-text>

                <slot name="conteudo-extra"></slot>

            </v-card-text>

        </v-card>
    </v-dialog>

</div>
</template>

<script>
    export default {
      props:{
          height:String, color:{type:String, required:true},
          icone:String,
          action:String, actionText:String, actionIcon:String,
          hoverText:String, hoverColor:String,

        //---- Dialog
        dialogTitulo:String,
        dialogPersistent:Boolean,
        dialogMaxWidth:String,
        dialogFullscreen:Boolean,

      },
      data(){
          return {
            dialog:{
                mostrarDialog: false,
                form: {
                    formValid: false,
                    resetValidation: false,
                    mensagens_data: this.mensagens,
                    mensagensTipo_data: this.mensagensTipo,
                },
            },
          }
      },
      methods:{
            configuraHoverClasses(){
                let base = "d-flex transition-fast-in-fast-out darken-4 subheading v-card--reveal white--text "
                let backColor = this.hoverColor || this.color;
                let classes = base + backColor;
                return classes;
            },
      }
    }
</script>

<style media="screen">

/* .v-dialog {
    width: auto !important;
} */

.jb-bloco.v-card .icon {
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
    z-index: 0;
    opacity: 0.25;
  }

.jb-bloco.v-card .icon.icon-mdi { font-size: 70px; }
.jb-bloco.v-card:hover .icon.icon-mdi { font-size: 75px; }

.jb-bloco.v-card .icon.icon-fa { font-size: 75px; }
.jb-bloco.v-card:hover .icon.icon-fa { font-size: 80px; }

.jb-bloco .v-card__actions.fixar {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.jb-bloco .v-card__actions.fixar button,
.jb-bloco .v-card__actions.fixar a { background-color: rgba(0, 0, 0, 0.25) !important }

.jb-bloco .v-card--reveal {
    align-items: center;
    top: 0;
    position: absolute;
    justify-content: center;
    opacity: .9;
    width: 100%;
}

</style>
