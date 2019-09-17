<template>

        <v-select
            :ref="vuetify_ref"
            v-model="vmodel"
            v-on="this.$listeners"
            v-bind="this.$attrs"

            :label="label_comp"
            :rules="vmodelRules"
            :error-messages="error_messages"
        ></v-select>
</template>

<script>

import {inputBaseMixin} from '../mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    props:{
        retornoKey:{type:String, default:null}
    },
    computed:{
        vuetify_ref(){
            return this.ref || 'v-select'
        },
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
