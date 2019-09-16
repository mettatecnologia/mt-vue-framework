<template>

        <v-menu
            ref="dtp_menu"
            v-model="menu.exibir"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <jb-text
                    ref="jbtext"

                    v-model="vmodel"

                    :id="id"
                    :placeholder="placeholder"
                    :name="name"
                    :disabled="disabled"

                    :label="label"
                    :hint="hint"
                    :persistent-hint="persistentHint"
                    :append-icon="input.appendIcon"
                    :readonly="readonly"
                    clearable

                    :regras="rules_validacao"
                    :mascara="picker_tipo"

                    v-on="on"

                    @input="textFieldEmit"
                ></jb-text>
            </template>

            <jb-datetime-picker :ref="vuetify_ref" v-model="picker.value" :tipo="tipo" :reactive="reactive" :min="min" :max="max" :historica="historica"></jb-datetime-picker>

        </v-menu>

</template>

<script>

import moment from 'moment'
import {inputBaseMixin} from '../mixins/jb-v-mixin-input-base'

export default {
    mixins: [inputBaseMixin],
    props:{
        value:String,
        rules:String, label:String, id:String, type:String, placeholder:String, name:String, disabled:Boolean, readonly:Boolean,

        autofocus:Boolean,
        counter:{type:[Boolean, Number, String]},
        appendIcon:String,
        iconClickAppend:{type:Function, default:v=>(v)},
        hint:String,
        persistentHint:Boolean,

        tipo:String,
        historica:Boolean,
        reactive:Boolean,
        min:String,max:String,
    },

    data () {return{
        menu:{
            exibir: false
        },
        input:{
            appendIcon: this.appendIcon
        },
        picker:{
            value: this.value
        },
        jb_datetime_picker: false,
    }},

    computed: {
        picker_tipo(){
            if(this.tipo)
            {
                return this.tipo
            }

            if( ! this.picker.value){
                return 'date'
            }

            let isDate = this.picker.value.indexOf('-')>-1
            let isTime = this.picker.value.indexOf(':')>-1

            if(isDate && isTime){
                return 'datetime'
            }
            if(isTime)
            {
                return 'time'
            }
            else {
                return 'date'
            }

        },
        vmodel () {
            if(this.value || this.picker.value){
                if(this.picker_tipo == 'datetime'){
                    return moment(this.value).format('DD/MM/YYYY HH:mm')
                }
                if(this.picker_tipo == 'date')
                {
                    return moment(this.value).format('DD/MM/YYYY')
                }
                else if(this.picker_tipo == 'time') {
                    return this.value
                }
            }
            return null
        },
        rules_validacao()
        {
            let rules = [this.picker_tipo]
            if(this.rules){
                rules.push(this.rules)
            }

            return rules
        },
        vuetify_ref(){
            return this.ref || 'jb-datetime-picker'
        }
    },
    created(){
        this.setarIconeInput()
    },
    updated(){
        if(this.$refs[this.vuetify_ref] && ! this.jb_datetime_picker)
        {
            this.jb_datetime_picker = this.$refs[this.vuetify_ref]
        }
    },
    watch: {
        value(v){
            if( ! v ){
                this.picker.value = ''
            }
            this.$emit('input', v)
        },
        'picker.value'(v){
            this.value = v
        },
        'menu.exibir'(abrir){
            if(abrir && this.$refs[this.vuetify_ref])
            {
                this.$refs[this.vuetify_ref].selecionou = false
            }
        },
        'jb_datetime_picker.selecionou'(selecionou){
            this.menu.exibir = ! selecionou
        }

    },
    methods: {
        textFieldEmit(v){
            if(v){
                v = v.split(' ')
                v[0] = v[0].split('/').reverse().join('-')
                v = v.join(' ')

                if(moment(v).isValid()){
                    this.$emit('input', v)
                }
            }
            else {
                this.value = null
            }
        },
        setarIconeInput(){
            let icone = null
            if(this.appendIcon){
                icone = this.appendIcon
            }
            else if(this.picker_tipo=='time'){
                icone = 'access_time'
            }
            else {
                icone = 'event'
            }
            this.input.appendIcon = icone
        },
    }
}
</script>

