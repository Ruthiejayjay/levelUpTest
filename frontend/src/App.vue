<template>
<div class="container">
<NavBar />
  <Cart />
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
