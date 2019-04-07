<template>
    <fieldset class="form-group">
        <input class="form-control form-control-lg"
               :type="data.inputType"
               :placeholder="data.placeholder"
               v-model="value">
    </fieldset>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Emit, Watch } from 'vue-property-decorator'
import {InputFieldProps} from "../types";

@Component
export default class InputFieldCommon extends Vue {
    @Prop(Object) fieldData! : InputFieldProps

    data : InputFieldProps = this.fieldData
    value : string = ''

    @Watch('value')
    modelChange() {
        this.emitValue({ value: this.value, model: this.data.model })
    }

    @Emit('emit')
    emitValue({ value, model } : any) {

    }
}
</script>

<style>
</style>
