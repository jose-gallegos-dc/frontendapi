<template>
    <div>
        <LayoutDefault>
        <div class="container pt-5">
            <div class="alert alert-danger left" role="alert" v-if="error_alert">
                <ul>
                    <li v-for="error_message in error_messages" :key="error_message.id">
                        {{error_message[0]}}
                    </li>
                </ul>
            </div>
            <form>
                <div class="mb-3 left">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="name" v-model="form.name" />
                </div>
                <div class="mb-3 left">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="email" v-model="form.email" />
                </div>
                <div class="mb-3 left">
                    <label for="logo" class="form-label">Logo</label>
                    <input type="text" class="form-control" id="logo" placeholder="logo" v-model="form.logo" />
                </div>
                <div class="mb-3 left">
                    <label for="website" class="form-label">Website</label>
                    <input type="text" class="form-control" id="website" placeholder="website" v-model="form.website" />
                </div>
                <button type="button" class="btn btn-primary" v-on:click="update()">Edit</button>
                <button type="button" class="btn btn-danger margen mx-2" v-on:click="destroy()">Delete</button>
                <button type="button" class="btn btn-dark margen" v-on:click="exit()">Exit</button>
            </form>
        </div>
        </LayoutDefault>
    </div>
</template>

<script>
import axios from "axios";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
export default {
    name: "EditCompanyView",

    components: {
    LayoutDefault
    },

    data() {
        return {
            companyId: null,
            form: {
                name: "",
                email: "",
                logo: "",
                website: "",
            },
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + this.$cookies.get('access_token')
            },
            url: "http://api-auth.test/api/companies/" + this.$route.params.id,
            error_alert: false,
            error_messages: []
        };
    },

    methods: {
        update(){
            axios.put(this.url, this.form, { headers: this.headers }).then((response) => {
                this.error_alert = false;
                this.$swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error =>{
                this.error_alert = true;
                this.error_messages = error.response.data.errors;
            });
        },

        destroy(){
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(this.url, {headers: this.headers}).then((response) =>{
                        this.$router.push("/company");
                        this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                        }); 
                    });   
                }
            })
        },

        exit() {
            this.$router.push("/company");
        },
    },

    mounted: function () {
   
        const url = "http://api-auth.test/api/companies/" + this.$route.params.id;
        axios.get(url, { headers: this.headers }).then((response) => {
            this.form.name = response.data.data.name;
            this.form.email = response.data.data.email;
            this.form.logo = response.data.data.logo;
            this.form.website = response.data.data.website;
        });
    },
};
</script>

<style scoped>
.left {
    text-align: left;
}
</style>