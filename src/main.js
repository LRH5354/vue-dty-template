import Vue from "vue";

import App from "./App";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import store from "./store/index.js";
import router from "./router/index.js";
import _ from "lodash";
// import VuetifyDialog from "vuetify-dialog";
import { v4 as uuidv4 } from "uuid";

// Vue.use(VuetifyDialog, {
//   context: {
//     vuetify,
//   },
// });
Vue.prototype.$uuid = uuidv4;
Vue.prototype.$_ = _;
Vue.prototype.$bus = new Vue();
/* eslint-disable no-new */
new Vue({
  vuetify,
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
