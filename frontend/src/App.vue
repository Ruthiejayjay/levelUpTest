<template>
<div class="container-md">
<NavBar />
  <Cart />
  <NavBar />
</div>
</template>

<script>
import Cart from './components/Cart.vue'
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    Cart,
  }
}
</script>

<style>

</style>
