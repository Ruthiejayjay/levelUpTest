<template>
  <div class="d-flex justify-content-center">
    <div class="back"></div>
    <div
      class="form rounded-lg"
      style="width: 25rem; background-color: white; margin-top: 4rem"
    >
      <form style="padding: 10%">
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
        <!-- Email input -->
        <div class="form-outline mb-4">
          <input
            class="form-control"
            type="email"
            placeholder="Email address"
            v-model="email"
            required
          />
          <span
            v-if="msg.email"
            style="font-size: 0.875rem; line-height: 1.25rem; color: red"
            >{{ msg.email }}</span
          >
        </div>

        <!-- Card Number -->
        <div class="form-outline mb-4">
          <input
            class="form-control"
            type="text"
            placeholder="4242 4242 4242 4242"
            v-model="cardNumber"
            required
          />
          <span
            v-if="msg.cardNumber"
            style="font-size: 0.875rem; line-height: 1.25rem; color: red"
            >{{ msg.cardNumber }}</span
          >
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
                  v-model="month"
                  required
                />
                <span style="font-size: 1.125rem; line-height: 1.75rem">/</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="YYYY"
                  v-model="year"
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
                v-model="cvv"
                required
                class="form-control"
              />
              <span
                v-if="msg.cvv"
                style="font-size: 0.875rem; line-height: 1.25rem; color: red"
                >{{ msg.cvv }}</span
              >
            </div>
          </div>
        </div>

        <div class="form-outline mb-4">
          <input
            class="form-control"
            type="text"
            placeholder="Name"
            v-model="name"
            required
          />
          <span
            v-if="msg.name"
            style="font-size: 0.875rem; line-height: 1.25rem; color: red"
            >{{ msg.name }}</span
          >
        </div>

        <!-- Submit button -->
        <button
          @click.prevent="submitForm"
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
      email: "",
      cardNumber: "",
      month: "",
      year: "",
      expiryDate: "",
      cvv: "",
      name: "",
      msg: [],
    };
  },
  props: ["toggle", "total"],

  watch: {
    email(value) {
      this.email = value;
      this.validateEmail(value);
    },
    cardNumber(value) {
      this.cardNumber = value;
      this.validateCardNumber(value);
    },
    cvv(value) {
      this.cvv = value;
      this.validateCvv(value);
    },
    name(value) {
      this.name = value;
      this.validateName(value);
    },
  },

  methods: {
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalid Email Address";
      }
    },

    validateCardNumber(value) {
      let difference = 19 - value.length;
      if (value.length < 16 || value.length > 19) {
        this.msg["cardNumber"] =
          "Must be 16 to 19 characters! " + difference + " characters left";
      } else {
        this.msg["cardNumber"] = "";
      }
    },

    validateCvv(value) {
      let difference = 3 - value.length;
      if (value.length < 3 || value.length > 3) {
        this.msg["cvv"] =
          "Must be 3 characters! " + difference + " characters left";
      } else {
        this.msg["cvv"] = "";
      }
    },

    validateName(value) {
      if (value.length < 1) {
        this.msg["name"] = "Name is required";
      } else {
        this.msg["name"] = "";
      }
    },

    validateMonth(value) {
      if (value.length < 1) {
        this.msg["month"] = "Month is required";
      } else {
        this.msg["name"] = "";
      }
    },

    getExpirationDate() {
      const month = this.month;
      const year = this.year;
      const date = new Date();

      date.setMonth(Number(month) - 1);
      date.setYear(year);
      date.setDate(1);
      return format(new Date(date), "MM/dd/yyyy");
    },

    submitForm() {
      this.validateEmail(this.email);
      this.validateCardNumber(this.cardNumber);
      this.validateCvv(this.cvv);
      this.validateName(this.name);

      const axios = require("axios");
      const qs = require("qs");

      var data = qs.stringify({
        email: this.email,
        cardNumber: this.cardNumber,
        expirationDate: this.getExpirationDate(),
        cvv: this.cvv,
        name: this.name,
      });
      var config = {
        method: "post",
        url: "http://localhost:5000/api/validation",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));
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