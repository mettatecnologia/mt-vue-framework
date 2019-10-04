<template>

        <fieldset
            class="jb-fieldset"
            :ref="vuetify_ref"
            v-on="this.$listeners"
            v-bind="this.$attrs"
        >
            <legend class="theme--light v-label">{{legend_comp}}</legend>
            <slot></slot>

            <div id="messages" class="caption">
                <slot name="messages"> {{messages}} </slot>
            </div>

        </fieldset>

</template>

<script>

import {inputBaseMixin} from './mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    props:{
        legend:String,
    },
    data(){return {
        messages:null,
        Form:null,
    }},
    computed:{
        vuetify_ref(){
            return this.ref || 'fieldset'
        },
        legend_comp(){
            return this.regras_validacao && this.legend && this.eObrigatorio ? `${this.legend} *` : this.legend
        },
    },
    mounted(){
        this.Form = this.buscarForm(this)
        this.$set(this.Form.errorBag, this._uid, true)
    },
    watch:{
        value(v){
            if(this.regras){
                this.verificarValidacao()
            }
        },
    },
    methods:{
        buscarForm(Inicio){
            let Comp = Inicio.$parent
            if(Comp && Comp.$el){
                if(Comp.$el.tagName == 'FORM'){
                    return Comp;
                }
                else {
                    this.buscarForm(Comp)
                }
            }
            else {
                return null
            }
        },
        verificarValidacao(){
            let Fieldset = this.$refs[this.vuetify_ref]

            let validacoes = this.vmodelRules
            let erro = false
            let result = null

            for (const key in validacoes) {
                const validacao = validacoes[key];

                result = validacao(this.value)
                if(this.$typeof(result,'string')){
                    erro = true
                    break
                }
            }

            if(erro){
                Fieldset.classList.add('error--text')
            }
            else {
                Fieldset.classList.remove('error--text')
            }

            this.messages = result
            this.Form.errorBag[this._uid] = erro

            return result
        }
    }
}
</script>

<style>

.jb-fieldset {
    border: 1px solid #949494;
    padding: 5px 10px;
    width: 100%;
}

.jb-fieldset > legend {
    color: #949494;
    padding: 0 10px 0 10px;
}

.jb-fieldset.error--text {
    border-color: #ff5252
}
.jb-fieldset.error--text > legend,
.jb-fieldset.error--text div.v-input:not(.rules-ignore) * {
    color: #ff5252
}

</style>
