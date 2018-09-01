<template>
    <div class="main-logo">
        <img src="~/assets/images/logo.gif" width="100" :class="{hide:value}"/>
        <img src="~/assets/images/logo-small.gif" width="26" height="26" :class="{hide:!value}"/>
    </div>
</template>

<script>
export default {
    props:{
        value:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style lang="scss">
.main-logo {
    position: relative;;
    width: 100%;
    height: 60px;
    overflow: hidden;
    clear: both;
    background-color: white;

    > img{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        opacity: 1;
        transition: opacity 0.5s ease-in-out;

        &.hide{
            opacity: 0;
        }
    }
}
</style>