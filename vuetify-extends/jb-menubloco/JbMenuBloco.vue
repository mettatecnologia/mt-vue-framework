/** Modelo de array aceito
$array = [
    'operacoes'=>[
        ['action'=>'pessoas','color'=>'orange darken-4','icone'=>'fas fa-users','qtd'=>$pessoas_qtd,'titulo'=>'Pessoas','action-text'=>null,'action-icon'=>null]
    ],
    'config'=>[
        ['action'=>'pessoas','color'=>'orange darken-4','icone'=>'fas fa-users','qtd'=>$pessoas_qtd,'titulo'=>'Pessoas','action-text'=>null,'action-icon'=>null]
    ]
];
*/
<template>
<v-row align="start">
     <v-col cols="12" v-for="(blocos, tipo) in array_itens" :key="tipo">

        <v-row v-if="tipo" :key="i" >
            <v-col>
                <v-divider></v-divider>
                <v-row justify="end"><span class="title font-italic grey--text mr-3">{{tipo}}</span></v-row>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="(bloco, i) in blocos" :key="i" cols="3">
                <jb-bloco :action="bloco.action" :action-text="bloco['action-text']" :action-icon="bloco['action-icon']" :color="bloco.color" :icone="bloco.icone">
                    <div :class="bloco.qtd !== null ? 'display-1 font-weight-bold':'display-1 font-weight-bold mt-4 pt-3' ">{{bloco.qtd}}</div>
                    <div class="subtitle-1">{{bloco.titulo}}</div>

                    <template slot="conteudo-extra">
                        <slot v-if="bloco.id" :name="bloco.id"></slot>
                    </template>
                </jb-bloco>
            </v-col>

        </v-row>

     </v-col>
</v-row>
</template>

<script>
    export default {
      props:{
          itens: String
      },
      data(){
          return {
              array_itens: [],
          }
      },
      created(){
          this.array_itens = JSON.parse(this.itens)
      }
    }
</script>
