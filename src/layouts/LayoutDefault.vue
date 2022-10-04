<template>
    <div>
        
    <HeaderComponent/>
        <main class="LayoutDefault">
            <slot/>
        </main>
    <FooterComponent/>
    </div>
</template>


<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
    name: "LayoutDefault",

    data(){
        return{
        }
    },

    components:{
        HeaderComponent,
        FooterComponent
    },

    mounted(){
    }
}
</script>