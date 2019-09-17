<!-- V-SLOTS DISPONÍVEIS EM 09/09/2019

    <template v-slot:top="{ items, pagination, options, groupedItems, updateOptions, sort, group }" ></template>

    <template v-slot:header="{ props, on }" ></template>
    <template v-slot:header.name="{ header }" ></template>
    <template v-slot:header.data-table-select="{ props, on }" ></template>

    <template v-slot:body="{ items, pagination, options, groupedItems, updateOptions, sort, group, headers, isMobile }" ></template>
    <template v-slot:body.append="{ items, pagination, options, groupedItems, updateOptions, sort, group, headers, isMobile }" ></template>
    <template v-slot:body.prepend="{ items, pagination, options, groupedItems, updateOptions, sort, group }" ></template>

    <template v-slot:group="{ items, pagination, options, groupedItems, updateOptions, sort, group }" ></template>
    <template v-slot:group.header="{ items, pagination, options, groupedItems, updateOptions, sort, group }" ></template>
    <template v-slot:group.summary="{ items, pagination, options, groupedItems, updateOptions, sort, group }" ></template>

    <template v-slot:item="{ item, select, isSelected, expand, isExpanded, headers, index }" ></template>
    <template v-slot:item.<name>="{ item, header, value }" ></template>
    <template v-slot:item.data-table-expand="{ item, select, isSelected, expand, isExpanded, headers }" ></template>
    <template v-slot:item.data-table-select="{ item, select, isSelected, expand, isExpanded, headers }" ></template>

    <template v-slot:expanded-item="{ item, headers }" ></template>

    <template v-slot:footer="{ items, pagination, options, groupedItems, updateOptions, sort, group, headers, isMobile }" ></template>
    <template v-slot:footer.page-text="{ pageStart, pageStop, itemsLength }" ></template>

    <template v-slot:loading ></template>
    <template v-slot:no-data ></template>
    <template v-slot:no-results ></template>
    <template v-slot:progress="{ items, pagination, options, groupedItems, updateOptions, sort, group }" ></template>

-->
<template>

    <v-data-table :items="items" :headers="headers" v-bind="this.$attrs" v-on="this.$listeners" class="elevation-1" :ref="vuetify_ref">

        <template v-slot:top="{ items, pagination, options, groupedItems, updateOptions, sort, group }" >
            <slot name="top" :items="items" :pagination="pagination" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group"></slot>
        </template>

        <template v-slot:body.append="{ items, pagination, options, groupedItems, updateOptions, sort, group, headers, isMobile, }" >
            <slot name="body.append" :items="items" :pagination="pagination" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group" :headers="headers" :isMobile="isMobile" ></slot>
        </template>
        <template v-slot:body.prepend="{ items, pagination, options, groupedItems, updateOptions, sort, group, }" >
            <slot name="body.prepend" :items="items" :pagination="pagination" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group"></slot>
        </template>

        <template v-slot:item="{ item, select, isSelected, expand, isExpanded, headers, index }" >
            <tr>
                <template v-for="(header, key) in headers" >
                    <td v-if="header.value!='actions'" :class="header['class']" :key="key">{{ aplicarHeaderAlteracoes(header, item[header.value]) }}</td>
                    <template v-else>
                        <td :class="header['class']" :key="key">

                            <slot name="item.actions" :item="item" :header="header" :value="header.value"></slot>
                        </td>
                    </template>

                </template>
            </tr>
        </template>

        <template v-slot:footer="{ items, pagination, options, groupedItems, updateOptions, sort, group, headers, isMobile, }" >
            <slot name="footer" :items="items" :pagination="pagination" :options="options" :groupedItems="groupedItems" :updateOptions="updateOptions" :sort="sort" :group="group" :headers="headers" :isMobile="isMobile"></slot>
        </template>
        <template v-slot:footer.page-text="{ pageStart, pageStop, itemsLength, }" >
            <slot name="footer.page-text" :pageStart="pageStart" :pageStop="pageStop" :itemsLength="itemsLength"></slot>
        </template>

        <template v-slot:loading >
            <slot name="loading"></slot>
        </template>
        <template v-slot:no-data >
            <slot name="no-data"></slot>
        </template>
        <template v-slot:no-results >
            <slot name="no-results"></slot>
        </template>

    </v-data-table>

</template>


<script>

import {globalMixin} from '../jb-global/jb-v-mixin-global'

export default {
    mixins: [globalMixin],
    props:{
        headers:String,
        items:String,
    },
    computed:{
        vuetify_ref(){
            return this.ref || 'v-data-table'
        }
    },
    methods: {
        aplicarHeaderMetodo(metodo, value){
            return value = metodo(value)
        },
        aplicarHeaderFormato(formato, value){
            switch (formato) {
                case 'datetime':
                    case 'date':
                        if(value){ value = this.$passaDatetimeParaPtbr(value) }
                    break;
                case 'credit-card':
                case 'cartao-credito':
                    if(value){ value = this.$formataNumeroParaCartaoCredito(value) }
                    break;
                case 'currency':
                case 'moeda':
                    if(value){ value = this.$formataNumeroParaMoeda(value) }
                    break;
            }
            return value
        },
        aplicarHeaderAlteracoes(header, value){
            let metodo = header.metodo || header.method
            let formato = header.format || header.formato

            if(metodo){
                value = this.aplicarHeaderMetodo(metodo, value)
            }
            if(formato){
                value = this.aplicarHeaderFormato(formato, value)
            }
            return value
        },
        // formataItemsPeloHeader(){

        //     let vuetify_comp = this.$refs[this.vuetify_ref]
        //     let headers = this.headers

        //     let items = this.items

        //     for (const key_item in items) {
        //         const item = items[key_item];
        //         for (const key_header in headers) {
        //             const header = headers[key_header];
        //             if(header.method || header.metodo || header.format || header.formato){
        //                 item[header.value] = this.aplicarHeaderAlteracoes(header, item[header.value])
        //             }
        //         }
        //     }

        // },
    },

}
</script>
