<template>
    <div id="example1" class="demo">
        <p>Using mustaches: {{ count }}</p>
        <button @click="count++">Click</button>
    </div>
</template>
<script>
    import {dbhTool, dbhCache, dbhMd5} from '../../index'
    export default {
        data() {
            return {
              count: 1,
            };
        },
        created() {
            console.debug('App Created')

            // `this` 指向 vm 实例
            console.debug('count is: ' + this.count) // => "count is: 1"
            console.debug(dbhTool.getClientId());
            console.debug(dbhTool.getJwt());
            console.debug(dbhTool.getApiUrl(''));
            console.debug(dbhTool.getAvatarUploadUrl(''));
            console.debug(dbhTool.getSessionId());
            console.debug(dbhTool.getUID());
        }
    }
</script>
