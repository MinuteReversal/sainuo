<template>
  <el-cascader
    :options="options"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>
</template>

<script>
export default {
    props:{
        "value":{
            type:String|Number|Object,
            default:""
        },
        "src":{
            type:String,
            default:""
        },
        "autoLoad":{
            "type":Boolean,
            "default":true
        },
        "clearable":{
            type:Boolean,
            default:false
        },
        "disabled":{
            type:Boolean,
            default:false
        },
        "placeholder": {
            "type": String,
            "default": "请选择"
        },
        "modelMap":{
            "type":Function,
            "default":(model)=>{
                return model;
            }
        },
        "params":{
            "type":Object,
            "default":()=>({
                skipCount:0,
                maxCount:65536
            })
        },
        "showColumns": {
            "type": Array,
            "default":()=> ["id", "name"]
        },
        "valueField": {
            "type": String,
            "default": "id"//model:item|fieldName:item.fieldName
        },
        "displayField": {
            "type": String,
            "default": "name"
        },
        "childrenField":{
            "type": String,
            "default": "children"
        },
        "isDistinct": {
            "type": Boolean,
            "default": false
        },
        "remote": {
            "type": Boolean,
            "default": false
        }
    },
    data(){
        return {
            "loading": false,
            "val": "",
            "options": [],
            "allOptions": []
        };
    },
    watch: {
        "value": function (val, oldVal) {
            var me = this;
            me.val = val;
        }
    },
    methods: {
        getValueField: function (item) {
            var me = this;
            if (me.valueField !== "model") {
                return item[me.valueField];
            }
            return item;
        },
        handleChange: function (val) {
            this.$emit("input", val);
        },
        updateValue: function (val) {
            this.val = val;
        },
        getOdataFilter: function (query) {
            var me = this;
            if (typeof query === "string" && query === "") return undefined;
            var odata = [];
            for (var i = 0, column; column = me.showColumns[i]; i++) {
                odata.push("substringof('" + query + "', " + column + ") eq true");
            }
            return odata.join(" or ");
        },
        loadData: function (query) {
            var me = this;
            me.loading = true;

            if (typeof query === 'undefined') {
                query = "";
            }

            axios.get(me.src,{params:me.params}).then(function (response) {
                me.allOptions = me.modelMap(response.data);
                me.options=me.allOptions;
                me.loading = false;
                me.$emit("load",{target:me,data:me.allOptions});
            });
        },
        distinct: function (arr) {
            var list = [];
            var hash = {};
            for (var i = 0, item; item = arr[i]; i++) {
                var key = item;
                if (typeof key === "object") key = JSON.stringify(item);

                if (hash[key.toString()]) continue;

                hash[key.toString()] = item;
                list.push(item);
            }
            return list;
        },
        getFields: function () {
            var me = this;
            var fields = [];
            if (me.valueField === "model") {
                return "*";
            }

            fields = fields.concat(me.showColumns);

            me.testPush(fields, me.displayField);
            me.testPush(fields, me.valueField);

            return fields.join(',');
        },
        testPush: function (arr, val) {
            if (arr.indexOf(val) === -1) arr.push(val);
        },
        filterMethod: function (val) {
            var me = this;
            if (me.remote) return;
            var foundList = [];
            for (var i = 0, item; item = me.allOptions[i]; i++) {
                var isMatch = false;
                for (var j = 0, c; c = me.showColumns[j]; j++) {
                    if (item[c].toString().indexOf(val) > -1) isMatch = true;
                }

                if (isMatch) {
                    foundList.push(item);
                }

            }
            me.options = foundList;
        }
    },
    components: {
        "el-select": ELEMENT.Select,
        "el-option": ELEMENT.Option
    },
    mounted: function () {
        var me=this;
        if(me.autoLoad){
            me.loadData();
        }
        me.updateValue(me.value);
    }
}
</script>

<style>

</style>
