<template>

        <jb-combobox
            :ref="vuetify_ref"
            v-model="vmodel"
            v-on="this.$listeners"
            v-bind="this.$attrs"

            :items="tipos"
        >
        </jb-combobox>

</template>

<script>

import {globalMixin}    from '../../jb-global/jb-v-mixin-global'

export default {
    mixins:[globalMixin],
    data() { return {
        tipos:[

            {text:'Avenida', value:'Avenida'},
            {text:'Praça', value:'Praça'},
            {text:'Rua', value:'Rua'},
            {text:'Travessa', value:'Travessa'},
            {text:'Vila', value:'Vila'},

            {text:' # Outros # ', value:null},

            {text:'Aeroporto', value:'Aeroporto'},
            {text:'Alameda', value:'Alameda'},
            {text:'Área', value:'Área'},
            {text:'Campo', value:'Campo'},
            {text:'Chácara', value:'Chácara'},
            {text:'Colônia', value:'Colônia'},
            {text:'Condomínio', value:'Condomínio'},
            {text:'Conjunto', value:'Conjunto'},
            {text:'Distrito', value:'Distrito'},
            {text:'Esplanada', value:'Esplanada'},
            {text:'Estação', value:'Estação'},
            {text:'Estrada', value:'Estrada'},
            {text:'Favela', value:'Favela'},
            {text:'Fazenda', value:'Fazenda'},
            {text:'Feira', value:'Feira'},
            {text:'Jardim', value:'Jardim'},
            {text:'Ladeira', value:'Ladeira'},
            {text:'Lago', value:'Lago'},
            {text:'Lagoa', value:'Lagoa'},
            {text:'Largo', value:'Largo'},
            {text:'Loteamento', value:'Loteamento'},
            {text:'Morro', value:'Morro'},
            {text:'Núcleo', value:'Núcleo'},
            {text:'Parque', value:'Parque'},
            {text:'Passarela', value:'Passarela'},
            {text:'Pátio', value:'Pátio'},
            {text:'Quadra', value:'Quadra'},
            {text:'Recanto', value:'Recanto'},
            {text:'Residencial', value:'Residencial'},
            {text:'Rodovia', value:'Rodovia'},
            {text:'Setor', value:'Setor'},
            {text:'Sítio', value:'Sítio'},
            {text:'Trecho', value:'Trecho'},
            {text:'Trevo', value:'Trevo'},
            {text:'Vale', value:'Vale'},
            {text:'Vereda', value:'Vereda'},
            {text:'Via', value:'Via'},
            {text:'Viaduto', value:'Viaduto'},
            {text:'Viela', value:'Viela'},
            {text:'Outro', value:'OUT'},
        ],
    }},
    computed:{
        vuetify_ref(){
            return this.ref || 'jb-combobox'
        }
    }
}
</script>
