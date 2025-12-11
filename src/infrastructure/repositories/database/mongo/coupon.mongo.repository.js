const CouponRepository = require('../../../../domain/repositories/coupon.repository.interface');
const CouponModel = require('./models/coupon.model');
const Coupon = require('../../../../domain/entities/coupon.entity');

class CouponMongoRepository extends CouponRepository {
  async getAll() {
    const coupons = await CouponModel.find();
    return coupons.map(c => new Coupon(c._id.toString(), c.code, c.discount, c.expiresAt, c.isActive));
  }

  async getById(id) {
    const coupon = await CouponModel.findById(id);
    if (!coupon) return null;
    return new Coupon(coupon._id.toString(), coupon.code, coupon.discount, coupon.expiresAt, coupon.isActive);
  }

  async getByCode(code) {
    const coupon = await CouponModel.findOne({ code });
    if (!coupon) return null;
    return new Coupon(coupon._id.toString(), coupon.code, coupon.discount, coupon.expiresAt, coupon.isActive);
  }

  async create(couponEntity) {
    const newCoupon = new CouponModel(couponEntity);
    const savedCoupon = await newCoupon.save();
    return new Coupon(savedCoupon._id.toString(), savedCoupon.code, savedCoupon.discount, savedCoupon.expiresAt, savedCoupon.isActive);
  }

  async update(id, couponEntity) {
    const updated = await CouponModel.findByIdAndUpdate(id, couponEntity, { new: true });
    if (!updated) return null;
    return new Coupon(updated._id.toString(), updated.code, updated.discount, updated.expiresAt, updated.isActive);
  }

  async delete(id) {
    await CouponModel.findByIdAndDelete(id);
  }
}

module.exports = CouponMongoRepository;
