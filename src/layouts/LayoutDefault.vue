<template>
    <div>
        
    <HeaderComponent/>
        <main class="LayoutDefault">
            <slot/>
        </main>
    <!-- <FooterComponent/> -->
    </div>
</template>


<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
// import FooterComponent from '@/components/FooterComponent.vue';

export default {
   name: "LayoutDefault",

   data(){
      return{
      }
   },

   created: function(){
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$cookies.get("access_token");
   },

   components:{
      HeaderComponent,
      // FooterComponent
   }
   
}
</script>