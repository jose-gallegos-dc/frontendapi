<template>
    <div>
       <HeaderComponent/>
            <h1>Dashboard</h1>
       <FooterComponent/>
    </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default{
    name: "DashboardView",
    components:{
    HeaderComponent,
    FooterComponent
}
}
</script>

<style scoped>

</style>