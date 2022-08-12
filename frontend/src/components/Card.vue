<template>
  <div class="d-flex justify-content-center">
    <div class="back"></div>
    <div
      class="form rounded-lg"
      style="width: 25rem; background-color: white; margin-top: 4rem"
    >
      <form style="padding: 10%" @submit.prevent="submitForm">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <h3
            style="
              font-size: 1.125rem;
              line-height: 1.5rem;
              font-weight: 400;
              color: #262626;
            "
          >
            Fill in Your Card Details
          </h3>
          <h6
            style="
              font-weight: 400;
              font-size: 0.875rem;
              line-height: 1.25rem;
              color: #737373;
            "
          >
            Total: &#8358;{{ total }}
          </h6>
          <button @click="toggle" type="submit">&times;</button>
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
        <div
          class="form-outline mb-4"
          style="display: flex; align-items: center"
        >
          <input
            class="form-control"
            type="text"
            placeholder="4242 4242 4242 4242"
            v-model="data.cardNumber"
            required
          />
          <img src="@/assets/card.png" style="width: 48px; hieght: 24px" />
        </div>

        <div class="row mb-4">
          <!-- Date -->
          <div class="col">
            <div class="row-cols-2">
              <div class="form-outline">
                <input
                  type="text"
                  class="form-control"
                  placeholder="MM"
                  v-model="data.month"
                  required
                />
                <span style="font-size: 1.125rem; line-height: 1.75rem">/</span>
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
        <button
          type="submit"
          class="btn btn-lg btn-block"
          style="background-color: #808080; color: white"
        >
          Buy
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { format } from "date-fns";

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
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
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
        .catch(function (error) {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
            });
          }
          if (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data[0].msg,
            });
          }
        });
    },
  },

  computed: {},
};
</script>

<style>
.back {
  z-index: 2;
  height: auto;
  widows: auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.75;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  width: 100%;
  height: 100%;
}
</style>