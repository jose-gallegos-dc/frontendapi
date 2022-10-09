<template>
    <div>
       <LayoutDefault>
       <div class="container pt-5 left">

            <button class="btn btn-primary my-4" v-on:click="create()">New Company</button>
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
       
    </LayoutDefault>
    </div>
</template>

<script>

import axios from 'axios';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
export default{
    name: "CompanyView",

    data(){
        return{
            companyList: null,
            // headers: {
            //     "Content-type": "application/json; charset=UTF-8",
            //     "Authorization": 'Bearer ' + this.$cookies.get('access_token')
            // }
        }
    },
    components:{
        LayoutDefault
    },

    methods: {

        edit(id){
            this.$router.push('/company/'+id);
        },

        create(){
            this.$router.push('/company/create');
        }


    },

    mounted:function(){
      
      //   const url = 'http://api-auth.test/api/companies';
      //   axios.get(url, {headers: this.headers}).then(data =>{
      //       this.companyList = data.data.data;
      //   }); 
      const url = 'http://api-auth.test/api/companies';
        axios.get(url).then(data =>{
            this.companyList = data.data.data;
        }); 
    }
}
</script>

<style scoped>
.left {
    text-align: left;
}
</style>