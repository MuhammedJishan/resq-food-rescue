/**
 * Premium entitlement abstraction.
 *
 * The UI never checks a raw boolean scattered across components — it goes
 * through `useApp().isPremium`, which reads from this service. To wire real
 * billing later, replace `MockPremiumService` with a RevenueCat-backed
 * implementation (getCustomerInfo / entitlements) and keep the interface.
 */

export type PremiumPlan = "monthly" | "annual";

export interface PremiumEntitlement {
  isActive: boolean;
  plan: PremiumPlan | null;
}

export interface PremiumService {
  getEntitlement(): PremiumEntitlement;
  subscribe(plan: PremiumPlan): PremiumEntitlement;
  cancel(): PremiumEntitlement;
}

class MockPremiumService implements PremiumService {
  private entitlement: PremiumEntitlement = { isActive: false, plan: null };

  getEntitlement() {
    return this.entitlement;
  }

  subscribe(plan: PremiumPlan) {
    this.entitlement = { isActive: true, plan };
    return this.entitlement;
  }

  cancel() {
    this.entitlement = { isActive: false, plan: null };
    return this.entitlement;
  }
}

export const premiumService: PremiumService = new MockPremiumService();

export const PLUS_PLANS: Record<
  PremiumPlan,
  { price: string; per: string; note?: string }
> = {
  monthly: { price: "₹199", per: "/month" },
  annual: { price: "₹1,499", per: "/year", note: "Save 37%" },
};
