
import {globalMixin}    from '../../jb-global/jb-v-mixin-global'
import {validacaoMixin} from '../mixins/jb-v-mixin-validacao'

export const inputBaseMixin = {
    mixins:[globalMixin, validacaoMixin],
    props:{
        validarNaCriacao:Boolean,
        mascara:String,
        regras:String
    },
    data() {return{
        error_messages:null,
        validar:false,
    }},
    computed: {
        regras_validacao(){
            return this.regras || this.rules
        },
        eObrigatorio(){
            return this.$typeof(this.regras_validacao,'object') ? {}.hasOwnProperty.call(this.regras_validacao,'required') : this.regras_validacao.indexOf('required') > -1
        },
        label_comp(){
            return this.regras_validacao && this.label && this.eObrigatorio ? `${this.label} *` : this.label
        },
        vmodelRules(){
            let result = this.validar ? this.executarValidacao(this.regras_validacao) : [];
            return result
        },
        vmodelMask(){
            return this.mascara
        },
    },
    created(){
        Object.assign(this, this.$attrs)

        this.validar = this.validarNaCriacao
        this.rules = []
    },
  }
