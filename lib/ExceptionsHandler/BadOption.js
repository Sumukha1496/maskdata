class BadOption {
  constructor(where, reasons) {
    this.where = where;
    this.reasons = reasons;
  }

  throwBadOptionException() {
    throw `Bad config value : ${JSON.stringify({where : this.where, reasons : this.reasons})}`;
  }
}

module.exports = BadOption;