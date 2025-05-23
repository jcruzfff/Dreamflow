# Pricing Page Development Plan

This document outlines the strategy and steps for building the interactive pricing page for Dreamflow Designs.

## Goal

Create a `/pricing` page in the Next.js app that allows users to configure design service packages, view selections in a real-time cart, and proceed to checkout. The UX should closely follow the provided image, while the UI should use the existing application components and styling. The page should be fully responsive for all device sizes.

## Strategy Overview

1.  **Page Structure (`/app/pricing/page.tsx`):** ✅ Two-column layout (Configurator Left, Cart Right) on desktop, single column with cart footer on mobile.
2.  **State Management:** ✅ Using React Context for managing selected category, current form configuration, cart items, and total price.
3.  **Component Breakdown:** ✅ Built modular components for Toggles, Configurator Panel (with dynamic forms per category), Cart Panel, and reusable input elements.
4.  **Data Flow:** ✅ State updates working for user interactions (category selection, form input, add-to-cart, remove-from-cart).
5.  **Responsive Design:** ✅ Mobile-first approach with responsive cart, toggle navigation, and form layout.
6.  **Integration:** ⬜ Connect to backend/Square for actual pricing and checkout _after_ the core UI/UX is built.

## Component Breakdown

- **`PricingPageLayout`**: ✅ Main layout component with responsive structure.
- **`CategoryToggles`**: ✅ Navigation between categories with responsive labels.
- **`ConfiguratorPanel`**: ✅ Left panel containing the dynamic form.
  - **`DynamicForm`**: ✅ Conditionally renders category-specific forms.
    - `WebsiteAppForm` ✅
    - `BrandingForm` ✅
    - `MarketingContentForm` ✅
    - `DevelopmentForm` ✅
  - **Reusable Inputs**: ✅ `Toggle`, `Checkbox`, `StylePicker`, `ColorPicker`, `TextArea`
  - **`AddToCart`**: ✅ Adds configured item to cart.
- **`CartPanel`**: ✅ Right panel displaying the order summary (desktop) or slide-out panel (mobile).
  - **`UpsellBanner`**: ✅ "Save X%" banner.
  - **`CartItemsList`**: ✅ List of items in the cart.
  - **`CartItem`**: ✅ Represents a single cart item (details, price, remove button).
  - **`CheckoutButton`**: ✅ Shows total and initiates checkout.
- **Mobile Components**:
  - **`MobileCartIcon`**: ✅ Floating cart button for mobile.
  - **`MobileCartFooter`**: ✅ Fixed bottom bar showing cart summary.
  - **`MobileCart`**: ✅ Slide-out cart panel for mobile.

## Implementation Steps (Logical Order)

1.  **Setup:** ✅ Created `/app/pricing/page.tsx` and basic layout.
2.  **State:** ✅ Set up state management using React Context.
3.  **Toggles:** ✅ Built `CategoryToggles` and linked to state.
4.  **Cart Display:** ✅ Built `CartPanel` components, connected to state, implemented removal.
5.  **Configurator (Iterative):** ✅
    - ✅ Built `DynamicForm` and `WebsiteAppForm` with inputs.
    - ✅ Connected inputs to temporary configuration state.
    - ✅ Implemented `AddToCartButton` logic for the first category.
    - ✅ Completed other category forms (`BrandingForm`, `MarketingForm`, `DevelopmentForm`).
6.  **Pricing:** ✅ Implemented placeholder pricing logic.
7.  **Styling:** ✅ Applied consistent styling.
8.  **Responsive Design:** ✅
    - ✅ Implemented mobile-first approach with Tailwind.
    - ✅ Created mobile cart with slide-out panel.
    - ✅ Added mobile-specific components like floating cart button and footer.
    - ✅ Made all form components responsive.
9.  **Square Integration:** ⬜ Replace placeholders with actual Square item data and pricing logic.
10. **API/Checkout:** ⬜ Connect `CheckoutButton` to the appropriate backend endpoint or function.
11. **Refine:** ⬜ Handle edge cases, add loading states.

## Summary of Accomplishments

We have successfully built the interactive pricing page with the following features:

1. **Interactive Category Selection**: Users can switch between the four service categories (Website & App, Branding, Marketing & Content, Development).
2. **Dynamic Forms**: Each category has its own dedicated form with relevant options.
3. **Real-time Cart Updates**: Items can be added to the cart and removed.
4. **Price Calculation**: Basic pricing logic is implemented for each service type.
5. **Consistent UI**: Using a clean, modern dark-mode interface throughout.
6. **Fully Responsive**: The page works well on all device sizes with dedicated mobile UI components.

## Next Steps

1. **Square Integration**: Connect with Square to fetch actual service items and prices.
2. **Checkout Flow**: Implement the checkout process when clicking the checkout button.
3. **User Feedback**: Add success/error messages and loading states.
4. **Analytics**: Add event tracking to understand user interactions.

---