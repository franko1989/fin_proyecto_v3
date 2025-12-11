const Coupon = require('../../domain/entities/coupon.entity');

class CouponService {
  constructor(couponRepository) {
    this.couponRepository = couponRepository;
  }

  async getAllCoupons() {
    return this.couponRepository.getAll();
  }

  async getCouponById(id) {
    return this.couponRepository.getById(id);
  }

  async getCouponByCode(code) {
    return this.couponRepository.getByCode(code);
  }

  async createCoupon(couponData) {
    const coupon = new Coupon(
      null,
      couponData.code,
      couponData.discount,
      couponData.expiresAt,
      couponData.isActive
    );
    return this.couponRepository.create(coupon);
  }

  async updateCoupon(id, couponData) {
    const coupon = new Coupon(
      id,
      couponData.code,
      couponData.discount,
      couponData.expiresAt,
      couponData.isActive
    );
    return this.couponRepository.update(id, coupon);
  }

  async deleteCoupon(id) {
    return this.couponRepository.delete(id);
  }
}

module.exports = CouponService;
