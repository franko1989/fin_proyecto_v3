class Coupon {
  constructor(id, code, discount, expiresAt, isActive = true) {
    this.id = id;
    this.code = code;               
    this.discount = discount;       
    this.expiresAt = expiresAt;     
    this.isActive = isActive;      
  }
}

module.exports = Coupon;