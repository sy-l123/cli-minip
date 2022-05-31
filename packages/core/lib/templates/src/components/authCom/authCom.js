Component({
  properties: {
    disabled: {
      type: Boolean,
      default: false,
    },
    openType: {
      type: String,
      default: '', // getUserInfo 'getPhoneNumber'
    },
  },
  methods: {
    getPhoneNumber(e) {
      this.triggerEvent('getphonenumber', e.detail);
    },
  },
});
