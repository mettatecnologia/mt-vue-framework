<template>

        <v-select
            :ref="ref"
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
    data() {return{
        ref:"v-combobox"
    }},
    computed:{
        itens(){
            return this.items
        },
    },
}
</script>
