<template>
  <div style="padding-top: 50px; padding-bottom: 80px">
    <h3>Products</h3>
    <div class="main d-flex justify-content-around">
      <div class="row">
        <div class="col-md-8">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Summary</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>
                  <div class="d-flex flex-row">
                    <img :src="product.image" alt="" style="height: 48px" />
                    <span class="mt-4" style="padding-left: 10px">{{
                      product.name
                    }}</span>
                  </div>
                </td>
                <th scope="row">{{ product.price }}</th>
                <td style="width: 40%">
                  <div class="d-flex flex-row">
                    <button
                      class="btn btn-sm"
                      style="background-color: #808080; color: white"
                      @click="decrement(product.id)"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      :value="product.count"
                      style="width: 20%"
                    />
                    <button
                      class="btn btn-sm"
                      style="background-color: #808080; color: white"
                      @click="increment(product.id)"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{{ product.price * product.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="cart col-md-4">
          <div class="card">
            <h5 class="card-header">Cart Total</h5>
            <div class="card-body">
              <div class="d-flex flex-row mt-1">
                <h5 style="width: 50%">Tax:</h5>
                <h5>&#8358;100</h5>
              </div>
              <div class="d-flex flex-row mt-1">
                <h5 style="width: 50%">SubTotal:</h5>
                <h5>&#8358;{{ subTotal }}</h5>
              </div>
              <div class="d-flex flex-row mt-1">
                <h5 style="width: 50%">Shipping:</h5>
                <h5>&#8358;2000</h5>
              </div>
              <div class="d-flex flex-row mt-1">
                <h5 style="width: 50%">Total:</h5>
                <h5>&#8358;{{ totalPrice }}</h5>
              </div>
              <button @click="toggleForm" class="btn" style="background-color: #808080; color: white">
                Check Out
              </button>
            </div>
          </div>
        </div>

        <Card v-if="showForm" :toggle="toggleForm" :total="totalPrice" style="margin-bottom: 10rem" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
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
          image:
            "https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a.jpg",
        },
        {
          id: 2,
          name: "Bread",
          price: 1000,
          count: 1,
          image:
            "https://butterwithasideofbread.com/wp-content/uploads/2012/07/Easiest-Best-Homemade-Bread.BSB_.IMG_6014.jpg",
        },
        {
          id: 3,
          name: "Pancake",
          price: 1000,
          count: 1,
          image:
            "https://i0.wp.com/recipesbycarina.com/wp-content/uploads/2017/01/Fluffy-Pancakes-Recipe-square-scaled.jpg?resize=540%2C720&ssl=1",
        },
      ],
    };
  },
  components: {
    Card,
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
      let total = this.subTotal - 100 + 2000;
      return total;
    },
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
  .cart{
    width: 100%;
  }
}
</style>