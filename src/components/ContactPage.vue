<template>
  <div class="contact-page page">
    <div class="col">
      <div class="info">
        <h1>{{$cms.textField($contact_page[0].primary.contact_title)}}</h1>
        <p>{{$cms.textField($contact_page[0].primary.contact_body)}}</p>
      </div>
    </div>
    <div class="col">
      <form class="form" ref="form">
        <transition v-for="(item, i) in $contact_page[0].items" :key="i">
          <div class="row">
            <p>{{$cms.textField(item.input_label)}}</p>
            <input :is="item.input_type" :rows="item.textarea_line_count" />
          </div>
        </transition>
        <div class="submit" @click="testClick">
          <p>Submit</p>
        </div>
      </form>
      <h3 class="message" ref="message">{{message}}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ContactPage",
  props: {
    msg: String,
  },
  data() {
    return {
      message: null,
      api: `https://worldtimeapi.org/api/ip`,
      canClickSubmitButton: true,
    };
  },
  methods: {
    testClick() {
      this.canSubmit = true;
      var sendMessage = "";

      for (let i = 0; i < this.$refs.form.length - 1; i++) {
        // console.log(this.$refs.form[i].attributes);
        var validFormat = this.$refs.form[i].attributes["pattern"]
          ? new RegExp(this.$refs.form[i].attributes["pattern"].value).test(
              this.$refs.form[i].value
            )
          : true;
        // console.log(validFormat);
        if (this.$refs.form[i].value === "") {
          this.canSubmit = false;
          this.message =
            "There was a problem sending your message. Please try again.";
          this.$refs.message.style = "color: red;";
          setTimeout(() => {
            this.message = null;
          }, 3000);
          return;
        } else if (!validFormat) {
          this.message = `Please enter a valid ${this.$refs.form[i].attributes["name"].nodeValue}.`;
          this.$refs.message.style = "color: red;";
          setTimeout(() => {
            this.message = null;
          }, 3000);
          return;
        }
        sendMessage += `${this.$refs.form[i].value}<br/>`;
      }
      sendMessage += `ip: ${this.ip} <br/>
      navigator info: ${window.navigator.userAgent}`;

      if (this.canSubmit) {
        this.doSubmit(sendMessage);
      }
    },
    doSubmit(msg) {
      // console.log(e);
      if (!this.canClickSubmitButton) {
        return;
      }
      this.canClickSubmitButton = false;

      new Promise((res) => {
        res(msg);
      }).then((msg) =>
        this.$smtp
          .send({
            // Host: "smtp.gmail.com",
            // Username: "rebjanec@gmail.com",
            // Password: "gingstergangsteryoyoha",
            SecureToken: "d0125a86-9991-42dd-8bc1-3e6a30fff61b",
            To: "rebjanec@gmail.com",
            From: "rebjanec@gmail.com",
            Subject: "From Website",
            Body: msg,
          })
          .then((msg) => {
            switch (msg) {
              case "OK": {
                this.message =
                  "Successfully sent! I will get in touch with you as soon as I can!";
                this.$refs.message.style = "color: green;";
                break;
              }
              default: {
                this.message =
                  "There was a problem sending your message. Please try again.";
                this.$refs.message.style = "color: red;";
                break;
              }
            }
            setTimeout(() => {
              this.message = null;
              this.canClickSubmitButton = true;
            }, 3000);
            this.$refs.form.reset();
          })
      );
    },
  },
  mounted() {
    console.log(this.$contact_page[0].primary);
    axios.get(this.api).then((res) => {
      this.ip = res.data.client_ip;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles.scss";

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input,
textarea {
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
  padding: 10px;
  padding-left: 0;
  font-size: 14px;
  overflow: hidden;
  width: 100%;
  // background: lightgrey;
  border-bottom: 1px solid grey;
  font-family: Helvetica;
}
.col {
  @include above($tablet) {
    width: 50%;
    display: inline-block;
    vertical-align: top;
  }
  text-align: left;
}
.info,
.form {
  @include above($tablet) {
    padding: 0 50px;
  }
  h1 {
    font-family: $suisse;
    font-size: 50px;
  }
  .submit {
    font-family: $suisse;
    font-size: 30px;
    text-align: right;
  }
}
</style>
