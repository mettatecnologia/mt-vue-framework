<template>
    <v-card>
        <!-- ===========================
                    Tabs
                =========================== -->
        <v-toolbar v-if="picker_tipo=='datetime'" background-color="primary" tabs >
            <template>
                <v-tabs v-model="tabs.index" color="primary" grow >
                    <v-tab> <v-icon>event</v-icon> </v-tab>
                    <v-tab> <v-icon>access_time</v-icon> </v-tab>

                    <v-tabs-slider color="primary"></v-tabs-slider>
                </v-tabs>
            </template>
        </v-toolbar>

        <!-- ===========================
                    Datepicker (trabalha apenas com datas yyyy-mm-dd)
                =========================== -->
        <v-tabs-items v-model="tabs.index">
            <v-tab-item v-if="picker_tipo=='datetime' || picker_tipo=='date'" >
                <v-date-picker ref="vdatepicker" v-model="date_picker" @input="datePickerEmitInput" :reactive="reactive" :min="min" :max="max"  ></v-date-picker>
            </v-tab-item>
            <v-tab-item v-if="picker_tipo=='datetime' || picker_tipo=='time'" >
                <v-time-picker ref="vtimepicker" v-model="time_picker" @input="timePickerEmitInput"  @click:minute="timeMinutePickerEmitClick" format="24hr"  ></v-time-picker>
            </v-tab-item>
        </v-tabs-items>


        <!-- ===========================
                    Rodape
                =========================== -->
        <v-col cols="12" v-if="picker_tipo=='date'" class="py-1 text-center">
            <v-btn @click="setarDataHoje" color="primary">Hoje</v-btn>
        </v-col>

        <v-col cols="12" v-if="picker_tipo=='time'" class="py-1 text-center">
            <v-btn @click="setarHoraAgora" color="primary">Agora</v-btn>
        </v-col>

        <v-row v-if="picker_tipo=='datetime'" no-gutters >
            <v-col cols="12" class="py-2 text-center">
                <strong>{{ data_ptbr }}</strong>
            </v-col>

            <v-col cols="12" class="pb-1 text-center">
                <v-btn @click="setarDataHoraAgora" color="primary">Agora</v-btn>
            </v-col>
        </v-row>

    </v-card>
</template>

<script>

import moment from 'moment'

export default {
    props:{
        value:String,
        tipo:String,

        reactive:Boolean,
        min:String,max:String,
        historica:Boolean

    },

    data () {return{
        tabs: {
            index: 0
        },
        date_picker: null,
        time_picker: null,
        active_date_picker: 'DATE',
        picker_tipo_aux: this.tipo,

        selecionou: false,
    }},

    computed: {
        picker_tipo(){
            if( ! this.picker_tipo_aux){
                this.setarTipoAux()
            }
            return this.picker_tipo_aux=='time' || this.picker_tipo_aux=='datetime' ? this.picker_tipo_aux : 'date'
        },
        data_ptbr () {
            if(this.value || this.date_picker || this.time_picker){
                if(this.picker_tipo=='time'){
                    return this.time_picker
                }
                else {
                    return [this.date_picker.split('-').reverse().join('/'), this.time_picker].join(' ').trim()
                }
            }
            return null
        },
    },
    created(){
        this.separarDateTime()
        if(this.picker_tipo=='datetime'){
            this.reactive = false
        }
        this.ativarHistorica()
    },
    watch: {
        value(v){
            if( ! v ){
                this.date_picker = ''
                this.time_picker = ''
            }
        },
        selecionou(v){
            this.ativarHistorica()
        }
    },
    methods: {
        ativarHistorica(){
            if(this.picker_tipo!='time' && this.historica){
                !this.selecionou && setTimeout(() => (this.$refs.vdatepicker.activePicker = 'YEAR'))
                this.active_date_picker = 'YEAR'
            }
        },
        datePickerEmitInput(v){

            this.$emit('input', v)
            let old_active_date_picker = this.active_date_picker
            let new_active_date_picker = this.$refs.vdatepicker.activePicker

            let date_picker_date = old_active_date_picker == 'YEAR' && new_active_date_picker == 'DATE'

            if(date_picker_date){
                if(this.picker_tipo=='datetime' && this.tabs.index == 0 ){
                    this.tabs.index = 1
                }
                else
                {
                    this.selecionou =  true
                }
            }

            this.active_date_picker = new_active_date_picker
        },
        timePickerEmitInput(v){
            if(this.picker_tipo=='datetime'){
                this.$emit('input', [this.date_picker,this.time_picker].join(' '))
            }
            else{
                this.$emit('input', v)
            }
        },
        timeMinutePickerEmitClick(v){
            if(this.picker_tipo=='datetime'){
                this.tabs.index = 0
            }
            this.selecionou =  true
        },
        setarTipoAux(){

            if( ! this.picker_tipo_aux){
                let tipo = null
                if(this.$buscarRegExp('time').test(this.value)){
                    tipo = 'time'
                }
                else if(this.$buscarRegExp('date_us').test(this.value)){
                    tipo = 'date'
                }
                else if(this.$buscarRegExp('datetime_us').test(this.value)){
                    tipo = 'datetime'
                }

                this.picker_tipo_aux = tipo
            }
        },
        separarDateTime(){
            if( ! this.value){
                return
            }

            if(this.picker_tipo == 'time'){
                this.time_picker = this.value
            }
            else {
                [this.date_picker, this.time_picker] = this.value.split(' ')
            }
        },
        setarDataHoje(){
            this.date_picker = moment().format('YYYY-MM-DD')
            this.selecionou =  true
            this.$emit('input', this.date_picker)
        },
        setarHoraAgora(){
            this.time_picker = moment().format('HH:mm')
            this.selecionou =  true
            this.$emit('input', this.time_picker)
        },
        setarDataHoraAgora(){
            this.date_picker = moment().format('YYYY-MM-DD')
            this.time_picker = moment().format('HH:mm')
            this.tabs.index = 0

            this.selecionou =  true
            this.$emit('input', [this.date_picker,this.time_picker].join(' '))
        },
    }
}
</script>

