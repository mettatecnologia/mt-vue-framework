
export const globalMixin = {
    props:{
        value:String,
    },
    data() {return{
        atualizar_componente:false
    }},
    computed: {
        vmodel(){
            return this.value
        },
        vuetify_ref(){
            return this.ref || `uid_${this._uid}`
        }
    },
    methods: {
        atualizarComponente(){
            this.atualizar_componente = ! this.atualizar_componente
        },
    },
  }
