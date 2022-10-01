<template>
    <div>
        <HeaderComponent/>
        <div class="container pt-5">
        <form>
            <div class="mb-3 left">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" placeholder="name" v-model="form.name">
            </div>
            <div class="mb-3 left">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" placeholder="email" v-model="form.email">
            </div>
            <div class="mb-3 left">
                <label for="logo" class="form-label">Logo</label>
                <input type="text" class="form-control" id="logo" placeholder="logo" v-model="form.logo">
            </div>
            <div class="mb-3 left">
                <label for="website" class="form-label">Website</label>
                <input type="text" class="form-control" id="website" placeholder="website" v-model="form.website">
            </div>
            <button type="button" class="btn btn-primary" v-on:click="update()">Edit</button>
            <button type="button" class="btn btn-danger margen">Delete</button>
            <button type="button" class="btn btn-dark margen" v-on:click="exit()">Cancel</button>
        </form>
        </div>
        <footer-component/>
    </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import axios from 'axios';
export default {
    name: "EditCompanyView",

    components:{
        HeaderComponent,
        FooterComponent
    },

    data(){
        return{
            companyId: null,
            form:{
                name: "",
                email: "",
                logo: "",
                website: "",
            }
        }
    },

    methods:{
        update(){

            let token = this.$cookies.get('token');
            const url = 'http://api-auth.test/api/companies/'+this.$route.params.id;

            let headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' + token
            };

            axios.put(url, this.form, {headers: headers}).then(response =>{
                console.log(response.data.data)
            })
        },

        exit(){
            this.$router.push('/company');
        }
    },

    mounted: function(){
      
        let token = this.$cookies.get('token');
        const url = 'http://api-auth.test/api/companies/'+this.$route.params.id;

        let headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' + token
        };

        axios.get(url, {headers: headers}).then(response =>{

            this.form.name = response.data.data.name;
            this.form.email = response.data.data.email;
            this.form.logo = response.data.data.logo;
            this.form.website = response.data.data.website;
        })
    }
}
</script>

<style scoped>
    .left{
        text-align: left;
    }
</style>