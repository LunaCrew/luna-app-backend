class InputPattern {
  static readonly PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
  static readonly DATE_TIME_TIMEZONE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(([+-]\d{4})|Z|z)$/
}

export default InputPattern
