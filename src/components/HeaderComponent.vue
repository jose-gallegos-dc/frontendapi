<template>
<div>
    <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <router-link to="/dashboard">Dashboard</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item px-2">
                <router-link to="/company">Company</router-link>
            </li>
        </ul>
    
        </div>
    </div>
    </nav>
</div>
</template>

<script>
export default{
    name: "HeaderComponent",
}
</script>