<template>
  <div class="d-flex justify-content-center">
    <div class="form rounded-lg bg-white">
      <form @submit.prevent="submitForm" class="mw-100 lg-mw-50 mt-2">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="font-weight-bold fs-5" style="color: #262626">
            Fill in Your Card Details
          </h3>
          <h6 class="font-weight-bold fs-6" style="color: #737373">
            Total: &#8358;{{ total }}
          </h6>
        </div>
        <div v-for="(error, i) in msg" :key="i" class="py-2">
          <div class="text-danger">{{ error }}</div>
        </div>
        <!-- Name Input -->
        <div class="form-outline mb-4">
          <input
            class="form-control"
            type="text"
            placeholder="Name"
            v-model="data.name"
            required
          />
        </div>
        <!-- Email input -->
        <div class="form-outline mb-4">
          <input
            class="form-control"
            type="email"
            placeholder="Email address"
            v-model="data.email"
            required
          />
        </div>

        <!-- Card Number -->
        <div class="form-outline mb-4 d-flex align-items-center">
          <input
            class="form-control"
            type="text"
            placeholder="4242 4242 4242 4242"
            v-model="data.cardNumber"
            required
          />
        </div>

        <div class="row mb-4">
          <!-- Date -->
          <div class="col">
            <div class="row-cols-2">
              <div class="form-outline d-flex justify-content-between w-100">
                <input
                  type="text"
                  class="form-control"
                  placeholder="MM"
                  v-model="data.month"
                  required
                />
                <input
                  type="text"
                  class="form-control"
                  placeholder="YYYY"
                  v-model="data.year"
                  required
                />
              </div>
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                placeholder="CVV"
                v-model="data.cvv"
                required
                class="form-control"
              />
            </div>
          </div>
        </div>

        <!-- Submit button -->
        <div class="d-flex justify-content-between">
          <button
            type="submit"
            class="btn btn-lg btn-block"
            style="background-color: #808080; color: white"
          >
            Buy
          </button>

          <button
            @click="toggle"
            type="submit"
            class="btn btn-lg btn-block btn-danger"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      data: {
        email: "",
        cardNumber: "",
        month: "",
        year: "",
        cvv: "",
        name: "",
      },

      msg: {},
    };
  },
  props: ["toggle", "total"],

  methods: {
    validateEmail() {
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.data.email)
      ) {
        this.msg.email = "Invalid Email Address";
        return false;
      }

      return true;
    },

    validateCardNumber() {
      if (
        this.data.cardNumber.length < 16 ||
        this.data.cardNumber.length > 19
      ) {
        this.msg.cardNumber = "Invalid card number";
        return false;
      }

      return true;
    },

    validateCvv() {
      if (!this.validateCardNumber()) {
        return;
      }
      const americanExpressFirstDigits = this.data.cardNumber.slice(0, 2);

      if (this.data.cvv.length < 3 || this.data.cvv.length > 4) {
        this.msg.cvv = "Invalid cvv";

        return false;
      } else if (
        this.data.cvv.length == 4 &&
        !(
          americanExpressFirstDigits == "34" ||
          americanExpressFirstDigits == "37"
        )
      ) {
        this.msg.cvv = "Invalid cvv";

        return false;
      } else if (
        this.data.cvv.length == 3 &&
        (americanExpressFirstDigits == "34" ||
          americanExpressFirstDigits == "37")
      ) {
        this.msg.cvv = "Invalid cvv";

        return false;
      }

      return true;
    },

    validateName() {
      if (this.data.name.length < 1) {
        this.msg.name = "Name is required";
        return false;
      }

      return true;
    },

    validateExpiryDate() {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      if (this.data.year.length < 4) {
        this.msg.expiryDate = "Invalid Card details";

        return false;
      }

      if (currentYear > this.data.year) {
        this.msg.expiryDate = "Card has expired";

        return false;
      }

      if (currentYear == this.data.year && this.data.month <= currentMonth) {
        this.msg.expiryDate = "Card has expired";

        return false;
      }

      return true;
    },

    validateForm() {
      let formStatus = true;
      if (!this.validateEmail()) {
        formStatus = false;
      }

      if (!this.validateCardNumber()) {
        formStatus = false;
      }

      if (!this.validateCvv()) {
        formStatus = false;
      }

      if (!this.validateName()) {
        formStatus = false;
      }

      if (!this.validateExpiryDate()) {
        formStatus = false;
      }

      return formStatus;
    },

    submitForm() {
      this.msg = {};
      if (!this.validateForm()) {
        return;
      }

      const axios = require("axios");

      const config = {
        method: "post",
        url: "http://localhost:5000/api/validation",
        data: this.data,
      };

      axios(config)
        .then(function (response) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          return Toast.fire({
            icon: "success",
            title: "Payment Made Successfully",
          });
        })
        .catch((error) => {
          console.log(error.response);
          error.response.data.forEach((error) => {
            this.msg[error.param] = error.msg;
          });
        });
    },
  },

  computed: {},
};
</script>

<style>
.form {
  display: flex;
  align-items: center;
  height: 100%;
  margin-top: 2rem;
}
</style>