
export const globalMixin = {
    props:{},
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
    created(){
    },
    methods: {
        atualizarComponente(){
            this.atualizar_componente = ! this.atualizar_componente
        },
    },
  }
