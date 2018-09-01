<template>
   <nuxt/>
</template>
<script>
import axios from "axios"
import cookie from "js-cookie"

export default {
    beforeMount(){
        let authorization = cookie.get("authorization");
        if(authorization)axios.defaults.headers.common["authorization"] = authorization;        
    }
}
</script>