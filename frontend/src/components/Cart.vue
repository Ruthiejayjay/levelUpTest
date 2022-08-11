<template>
  <div class="bg-white flex-row items-center md:mt-12">
    <div
      class="
        main
        container
        flex xl:flex-row
        xl:gap-28 
        justify-between
        px-6
        py-5
        max-w-7xl
        mx-auto
        mt-4
      "
    >
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex flex-col w-full max-w-3xl mt-4 md:mt-4">
          <div class="flex gap-5 w-full">
            <h4 class="text-2xl antialiased font-bold">Product Cart</h4>
          </div>
          <table class="shadow-lg bg-white mt-3 border rounded-lg">
            <tr class="border rounded-lg">
              <th class="bg-gray-100 border text-left px-8 py-4 rounded-lg">
                Product
              </th>
              <th class="bg-gray-100 border text-left px-8 py-4">Price</th>
              <th class="bg-gray-100 border text-left px-8 py-4">Quantity</th>
              <th class="bg-gray-100 border text-left px-8 py-4">Summary</th>
            </tr>
            <tr v-for="product in products" :key="product.id">
              <td class="border px-8 py-4">
                <div class="flex flex-row gap-2 mx-0">
                  <img :src="product.image" alt="" class="h-12" />
                  <span class="mt-4 text-lg">{{ product.name }}</span>
                </div>
              </td>
              <td class="border px-8 py-4">&#8358; {{ product.price }}</td>
              <td class="border px-8 py-4">
                <div class="flex flex-row">
                  <button
                    class="text-lg font-semibold mr-2"
                    v-on:click="decrement(product.id)"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    :value="product.count"
                    class="w-12 border border-gray-500/50 rounded-lg"
                  />
                  <button
                    class="text-lg font-semibold ml-2"
                    v-on:click="increment(product.id)"
                  >
                    +
                  </button>
                </div>
              </td>
              <td class="border px-8 py-4">
                &#8358;{{ product.price * product.count }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="mt-4 border rounded-lg shadow-md w-72 md:mb-3">
        <div class="flex gap-5 w-full mb-3">
          <h4 class="text-2xl antialiased m-4 font-bold">Cart Total</h4>
        </div>
        <div class="m-5">
          <div class="flex gap-5 mb-3 text-xl">
            <h5 class="w-40">SubTotal:</h5>
            <h5>&#8358;{{ subTotal }}</h5>
          </div>
          <div class="flex gap-5 mb-3 text-xl">
            <h5 class="w-40">Tax:</h5>
            <h5>&#8358;100</h5>
          </div>
          <div class="flex gap-5 mb-3 text-xl">
            <h5 class="w-40">Shipping:</h5>
            <h5>&#8358;2000</h5>
          </div>
          <div class="flex gap-5 mb-3 text-xl">
            <h5 class="w-40">Total:</h5>
            <h5>&#8358;{{totalPrice}}</h5>
          </div>
        </div>

        <div class="flex m-5">
          <button
            @click="toggleForm"
            class="rounded-lg bg-gray-700 text-white px-5 py-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenter"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>

    <CardForm2 v-if="showForm" :toggle="toggleForm" :total="totalPrice" />
  </div>
</template>

<script>

import CardForm2 from "@/components/CardForm2.vue";
export default {
  data() {
    return {
      showForm: false,
      count: 1,
      products: [
        {
          id: 1,
          name: "Cake",
          price: 2000,
          count: 1,
          image: "https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a.jpg",
        },
        {
          id: 2,
          name: "Bread",
          price: 1000,
          count: 1,
          image: "https://butterwithasideofbread.com/wp-content/uploads/2012/07/Easiest-Best-Homemade-Bread.BSB_.IMG_6014.jpg",
        },
        {
          id: 3,
          name: "Pancake",
          price: 1000,
          count: 1,
          image: "https://i0.wp.com/recipesbycarina.com/wp-content/uploads/2017/01/Fluffy-Pancakes-Recipe-square-scaled.jpg?resize=540%2C720&ssl=1",
        },
      ],
    };
  },
  components: {
    CardForm2,
  },

  computed: {
    subTotal() {
      let total = 0;
      this.products.forEach((product) => {
        total += product.count * product.price;
      });
      return total;
    },

    totalPrice() {
      let total = this.subTotal -100 + 2000
      return total
    }
  },

  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    productSummart() {
      this.product;
    },
    increment(id) {
      this.products = this.products.map((product) => {
        if (product.id === id) {
          return { ...product, count: product.count + 1 };
        }
        return { ...product };
      });
    },
    decrement(id) {
      this.products = this.products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            count: product.count > 0 ? product.count - 1 : product.count,
          };
        }
        return { ...product };
      });
    },
  },
};
</script>

<style>
@media screen and (max-width: 600px) {
  .main {
    flex-direction: column;
  }
}
</style>