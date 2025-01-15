// Import dependencies
import mongoose from "mongoose";
import moment from "moment";

// Define the Mongoose Schema for product usage limits
const Schema = mongoose.Schema;
const ProductLimitSchema = new Schema({
  userId: String,
  productType: String,
  maxLimit: Number,
  currentCount: Number,
  resetDate: Date, // Use Date for better handling of time-based logic
});

const ProductLimit = mongoose.model("ProductLimit", ProductLimitSchema);

class ProductAccessManager {
  constructor() {
    // Define constants for action types and product types
    this.ACTION_VALIDATE_ACCESS = "validate_access";
    this.PRODUCT_SESSION = "meetcode_session";
    this.PRODUCT_PROJECT = "meetcode_project";
    this.PRODUCT_AI = "meetcode_ai";
  }

  getErrorMessageByProduct = (productType) => {
    const errorMessages = {
      [this.PRODUCT_SESSION]:
        "You have reached your maximum session creation limit for this month. Upgrade to get unlimited sessions.",
    };

    return errorMessages[productType] || "Usage limit exceeded.";
  };

  /**
   * Builds a default product specification for a new user-product record.
   * @param {Object} params - Parameters for product specification.
   * @param {string} params.userId - The user ID.
   * @param {string} params.productType - The product type.
   * @returns {Object} The payload for creating a new product record.
   */
  createDefaultProductSpec({ userId, productType }) {
    let maxLimit = 0;

    // Set product-specific limits
    switch (productType) {
      case this.PRODUCT_SESSION:
        maxLimit = 5;
        break;
      case this.PRODUCT_PROJECT:
        maxLimit = 20;
        break;
      case this.PRODUCT_AI:
        maxLimit = 3;
        break;
      default:
        throw new Error("Unknown product type");
    }

    // Calculate the reset date (30 days from now)
    const resetDate = moment.utc().add(30, "days").toDate();

    return {
      userId,
      productType,
      maxLimit,
      currentCount: 1,
      resetDate,
    };
  }

  /**
   * Validates whether a user can access a specific product.
   * @param {Object} payload - The validation payload.
   * @param {string} payload.userId - The user ID.
   * @param {string} payload.productType - The product type.
   * @returns {Promise<Object>} The access result.
   */
  async validateAccess({ userId, productType }) {
    const product = await ProductLimit.findOne({ userId, productType });

    if (product) {
      // Check if the current count exceeds the max limit
      const isLimitExceeded = product.currentCount >= product.maxLimit;

      // Check if reset date has passed
      if (moment.utc().isAfter(product.resetDate)) {
        product.currentCount = 1;
        product.resetDate = moment.utc().add(30, "days").toDate();
        await product.save();
        return { canAccess: true };
      }

      if (isLimitExceeded) {
        return {
          canAccess: false,
          message: this.getErrorMessageByProduct(productType),
        };
      }

      // Increment usage count
      product.currentCount++;
      await product.save();
      return { canAccess: true };
    } else {
      // Create a new product record if none exists
      const newProductSpec = this.createDefaultProductSpec({
        userId,
        productType,
      });
      await ProductLimit.create(newProductSpec);
      return { canAccess: true };
    }
  }

  /**
   * Handles actions related to product access.
   * @param {Object} actionPayload - The action payload.
   * @param {string} actionPayload.action - The action type.
   * @param {Object} actionPayload.payload - The payload for the action.
   * @returns {Promise<Object>} The result of the action.
   */
  async handleAction({ action, payload }) {
    if (action === this.ACTION_VALIDATE_ACCESS) {
      return this.validateAccess(payload);
    }
    return { succeeded: false, errorMessage: "Invalid action." };
  }
}

const productAccessManagerApi = new ProductAccessManager();
export default productAccessManagerApi;
