<template>
<div>
  <Navigation class="" />
  <Cart class="xl:m-20" />
  <Footer />
</div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Cart from '@/components/Cart.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Navigation,
    Footer,
    Cart
  }
}
</script>

<style>
</style>