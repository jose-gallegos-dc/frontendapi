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
                <button type="button" class="btn btn-primary mx-2" v-on:click="save()">
                    Save
                </button>
                <button type="button" class="btn btn-dark margen" v-on:click="exit()">
                    Exit
                </button>
            </form>
        </div>
        </LayoutDefault>
    </div>
</template>

<script>
import axios from "axios";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
export default {
    name: "CreateCompanyView",

    components: {
    LayoutDefault
    },

    data() {
        return {
            form: {
                name: "",
                email: "",
                logo: "",
                website: "",
            },
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + this.$cookies.get('token')
            },
            error_alert: false,
            error_messages: []
        };
    },

    methods: {

        save(){
            const url= "http://api-auth.test/api/companies";
            axios.post(url, this.form, {headers: this.headers}).then((response) =>{
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

        exit() {
            this.$router.push("/company");
        }
       
    },

    mounted: function () {
   
    },
};
</script>

<style scoped>
.left {
    text-align: left;
}
</style>