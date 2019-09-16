<template>

        <v-combobox
            :ref="ref"
            v-model="vmodel"
            v-on="this.$listeners"
            v-bind="this.$attrs"

            :label="label_comp"
            :rules="vmodelRules"
            :error-messages="error_messages"
            :search-input.sync="search"
        >
            <template v-slot:no-data>
                <v-list-tile>
                    <v-list-tile-content>
                    <v-list-tile-title>
                        Nenhum resultado para "<strong>{{ search }}</strong>".
                    </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-combobox>

</template>

<script>

import {inputBaseMixin} from '../mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    props:{
        retornoKey:{type:String, default:null}
    },
    data() {return{
        search:'',
        ref:"v-combobox"
    }},
    computed:{
        vmodel(){

            if(this.itens && typeof this.itens[0] == 'object'){
                let result = this.$buscaItemDatatable(this.itens,this.value)
                if(result){ return result.result }
            }

            if(this.retornoKey && this.$hasKey(this.retornoKey,this.value)){
                return this.value[this.retornoKey]
            }
            else {
                return this.value
            }
        },
        itens(){
            return this.items
        },
    },
}
</script>
