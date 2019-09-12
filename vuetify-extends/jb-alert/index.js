let Vue = window.Vue

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
Vue['_VAlert'] = _interopRequireDefault(require("vuetify/lib/components/VAlert/VAlert")).default;

Vue.component('jb-alert', require('./JbAlert.vue').default);
