<template>
    <div v-html="content">

    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
    props: {
        id: String
    },
    setup(props) {
        const content = ref("");

        function updatePage(id: string) {
            axios.get("./api/pages/" + id)
            .then((result: any) => {
                if (result.data.Success) {
                    content.value = result.data.Content;
                    document.title = result.data.Name;
                } else {
                    content.value = "Er was een probleem bij het laden van deze pagina.";
                    console.error("There was an error while loading the page with id " + id);
                }
            }).catch((result: any) => {
                content.value = "Er was een probleem bij het laden van deze pagina.";
                console.error("There was an error while loading the page with id " + id);
            });
        }

        updatePage(<string>props.id);

        return {
            content,
            updatePage
        };
    },
    watch: {
        '$route.params': {
            handler(value) {
                this.updatePage(value.id);
            },
            immediate: true,
        }
    }
});

</script>