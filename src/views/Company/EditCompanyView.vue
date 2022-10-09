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
                    <input type="text" class="form-control" id="name" placeholder="name" v-model="name" />
                </div>
                <div class="mb-3 left">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="email" v-model="email" />
                </div>
                <div class="mb-3 left row">
                  <div class="col">
                     <!-- <label for="email" class="form-label">Logo</label>
                    <input type="file" class="form-control" @change="onFileChange" placeholder="Choose a file or drop it here..."/> -->
                    <label for="logo" class="form-label">Logo</label>
                    <input type="file" class="form-control" @change="onFileChange" placeholder="Choose a file or drop it here..."/>
                  </div>
                  <div class="col">
                     <label for="preview" class="form-label">Preview</label>
                     <img v-if="url_logo" :src="url_logo" class="logo"/>
                  </div>
                </div>
                <div class="mb-3 left">
                    <label for="website" class="form-label">Website</label>
                    <input type="text" class="form-control" id="website" placeholder="website" v-model="website" />
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
            name: "",
            email: "",
            website: "",
            formData: new FormData(),
            url_logo: "", // src del logo al cambiar su valor 
            logo_old:"",// nombre del logo de la compañía asociada
            url: "http://api-auth.test/api/companies/" + this.$route.params.id,
            error_alert: false,
            error_messages: []
        };
    },

    methods: {

         onFileChange(e) {
            
            let files = e.target.files || e.dataTransfer.files;
            if(!files.length){
               this.url_logo = "http://api-auth.test/logos/" + this.logo_old;
               this.formData.delete("logo", "logo_old");
               return;
            }
            this.formData.append("logo", files[0]);
            this.formData.append("logo_old", this.logo_old);
            this.url_logo = URL.createObjectURL(files[0]);


            console.log(this.logo_old);
         },

        update(){
            this.formData.append('_method', 'PUT');
            this.formData.append('name', this.name);
            this.formData.append('email', this.email);
            this.formData.append('website', this.website);

            axios.post(this.url, this.formData).then((response) => {
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
                    axios.delete(this.url, {data:{ logo_old: this.logo_old}}).then((response) =>{
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
            this.name = response.data.data.name;
            this.email = response.data.data.email;
            this.website = response.data.data.website;
            this.url_logo = "http://api-auth.test/logos/" + response.data.data.logo;
            this.logo_old = response.data.data.logo;
            

        });
    },
};
</script>

<style scoped>
.left {
    text-align: left;
}

.logo {
   max-width: 150px;
   max-height: 100px;
}
</style>