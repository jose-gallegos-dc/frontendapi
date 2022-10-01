<template>
    <div>
       <HeaderComponent/>
       <div class="container pt-5">
            <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Website</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="company in companyList" :key="company.id" v-on:click="edit(company.id)">
                <th scope="row">{{company.id}}</th>
                <td>{{company.name}}</td>
                <td>{{company.email}}</td>
                <td>{{company.website}}</td>
                </tr>
               
            </tbody>
            </table>
       </div>
       
       <FooterComponent/>
    </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import axios from 'axios';
export default{
    name: "CompanyView",

    data(){
        return{
            companyList: null
        }
    },

    components:{
        HeaderComponent,
        FooterComponent
    },

    methods: {

        edit(id){
            this.$router.push('/editCompany/'+id);
        }
    },

    mounted:function(){

        let token = this.$cookies.get('token');
        const url = 'http://api-auth.test/api/companies';

        let headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' + token
        };

        axios.get(url, {headers: headers}).then(data =>{
            this.companyList = data.data.data;
        })
    }
}
</script>

<style scoped>

</style>