class CouponController {
  constructor(couponService) {
    this.couponService = couponService;
  }

  getAll = async (req, res) => {
    const coupons = await this.couponService.getAllCoupons();
    res.status(200).json(coupons);
  }

  getById = async (req, res) => {
    const coupon = await this.couponService.getCouponById(req.params.id);
    res.status(200).json(coupon);
  }

  create = async (req, res) => {
    const coupon = await this.couponService.createCoupon(req.body);
    res.status(201).json(coupon);
  }

  update = async (req, res) => {
    const coupon = await this.couponService.updateCoupon(req.params.id, req.body);
    res.status(200).json(coupon);
  }

  delete = async (req, res) => {
    await this.couponService.deleteCoupon(req.params.id);
    res.status(204).send();
  }
}

module.exports = CouponController;
