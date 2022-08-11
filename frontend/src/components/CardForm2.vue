<template>
  <div class="relative flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8 sm:pr-10">
    <div
      class="
        bg-black
        opacity-75
        h-auto
        w-auto
        fixed
        left-0
        top-0
        right-0
        bottom-0
      "
      style="z-index: 2"
    ></div>
    <div
      class="
        modal
        fade
        flex
        justify-center
        items-center
        h-full
        outline-none
        overflow-x-hidden overflow-y-auto
      "
      id="exampleModalCenter"
      tabindex="-1"
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
      role="dialog"
      style="z-index: 3; width: 100%; height: 100%"
    >
      <div
        class="
          modal-dialog modal-dialog-centered
          relative
          w-auto
          pointer-events-none
        "
      >
        <div
          class="
            modal-content
            border-none
            shadow-lg
            relative
            flex flex-col
            w-full
            pointer-events-auto
            bg-white bg-clip-padding
            rounded-md
            outline-none
            text-current
          "
        >
          <div
            class="
              modal-header
              flex flex-shrink-0
              items-center
              justify-between
              p-4
              border-b border-gray-200
              rounded-t-md
            "
          >
            <h5
              class="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalScrollableLabel"
            >
              Fill in Your Card Details
            </h5>
            <h6 class="text-sm font-medium text-gray-500">
              Total: &#8358;{{ total }}
            </h6>
            <button
              @click="toggle"
              type="button"
              class="
                btn-close
                box-content
                w-4
                h-4
                p-1
                text-md text-black
                border-none
                rounded-none
                opacity-50
                focus:shadow-none focus:outline-none focus:opacity-100
                hover:text-black hover:opacity-75 hover:no-underline
              "
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div class="modal-body relative p-4">
            <form>
              <input
                class="
                  py-2.5
                  px-4
                  mb-4
                  w-full
                  bg-gray-50
                  border
                  focus:ring-2 focus:ring-opacity-90 focus:ring-indigo-500
                  border-gray-100
                  rounded
                  focus:outline-none
                "
                type="email"
                placeholder="Email address"
                v-model="email"
                required
              />
              <span v-if="msg.email" class="text-xs text-red-400">{{
                msg.email
              }}</span>
              <div class="flex items-center">
                <input
                  class="
                    py-2.5
                    px-4
                    mb-4
                    w-full
                    bg-gray-50
                    border
                    focus:ring-2 focus:ring-opacity-90 focus:ring-indigo-500
                    border-gray-100
                    rounded
                    focus:outline-none
                  "
                  type="string"
                  placeholder="4242 4242 4242 4242"
                  v-model="cardNumber"
                  required
                />
                <img src="@/assets/card.png" class="w-12 h-6" />
              </div>
              <span v-if="msg.cardNumber" class="text-xs mt-1 text-red-400">{{
                msg.cardNumber
              }}</span>

              <div class="flex flex-wrap mb-4 -mx-2">
                <div
                  class="
                    flex flex-row
                    w-full
                    px-2
                    mb-4
                    lg:mb-0 lg:w-1/2
                    bg-gray-50
                  "
                >
                  <input
                    class="
                      py-2
                      px-4
                      w-24
                      border
                      focus:ring-2 focus:ring-opacity-90 focus:ring-indigo-500
                      border-gray-100
                      rounded
                      focus:outline-none
                    "
                    ref="month"
                    type="text"
                    placeholder="MM"
                    v-model="month"
                    required
                  />
                  <span class="text-lg font-bold">/</span>
                  <input
                    class="
                      py-2
                      px-4
                      w-24
                      border
                      focus:ring-2 focus:ring-opacity-90 focus:ring-indigo-500
                      border-gray-100
                      rounded
                      focus:outline-none
                    "
                    ref="year"
                    type="text"
                    placeholder="YYYY"
                    v-model="year"
                    required
                  />
                  <!-- <span v-if="msg.exYear" class="text-xs text-red-400">{{
                    msg.exYear
                  }}</span> -->
                </div>
                <div class="w-full px-2 lg:w-1/2">
                  <input
                    class="
                      py-2.5
                      px-4
                      w-full
                      bg-gray-50
                      border
                      focus:ring-2 focus:ring-opacity-90 focus:ring-indigo-500
                      border-gray-100
                      rounded
                      focus:outline-none
                    "
                    type="string"
                    placeholder="CVV"
                    v-model="cvv"
                    required
                  />
                  <span v-if="msg.cvv" class="text-xs mt-1 text-red-400">{{
                    msg.cvv
                  }}</span>
                </div>
              </div>

              <input
                class="
                  py-2.5
                  px-4
                  mb-4
                  w-full
                  bg-gray-50
                  border
                  focus:ring-2 focus:ring-opacity-90 focus:ring-indigo-500
                  border-gray-100
                  rounded
                  focus:outline-none
                "
                type="text"
                placeholder="Enter name on Card"
                v-model="name"
                required
              />
              <span v-if="msg.name" class="text-xs mt-1 text-red-400">{{
                msg.name
              }}</span>
              <button
                @click.prevent="submitForm"
                class="
                  inline-block
                  w-full
                  px-6
                  py-2.5
                  mb-4
                  font-bold
                  text-white
                  bg-gray-600
                  rounded
                  hover:bg-gray-500
                "
              >
                BUY
              </button>
            </form>
          </div>
        </div>
      </div>
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
          const errors = error.response.data[0].msg;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errors,
          });
        });
    },
  },

  computed: {},
};
</script>

<style>
</style>