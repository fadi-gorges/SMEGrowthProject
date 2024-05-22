"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import { EnterpriseData, enterpriseSchema } from "@/lib/validations/enterprises/enterpriseSchema";
import getPayloadClient from "@/payload/payloadClient";

export const createEnterprise = async (
  data: EnterpriseData
): Promise<ActionResponse> => {
  try {
    // Validate input data
    const validationResult = enterpriseSchema.safeParse(data);
    if (!validationResult.success) {
      // Get validation errors
      const validationErrors = validationResult.error.errors.map(error => error.message).join(", ");
      return { success: false, error: `Validation failed: ${validationErrors}` };
    }

    // Check if user is authenticated
    const user = await getServerUser();
    if (!user) {
      return { success: false, error: "Unauthorized." };
    }

    // Create enterprise
    const payload = await getPayloadClient();
    const enterprise = await payload.create({
      collection: "enterprises",
      data: {
        name: validationResult.data.name! || "", 
        abn: validationResult.data.abn,
        numEmployees: validationResult.data.numEmployees,//math random
        website: validationResult.data.website,
        suburb: validationResult.data.suburb,
        industry : validationResult.data.industry,
        postCode: validationResult.data.postCode,
        sme: validationResult.data.sme,
        manufacturer: validationResult.data.manufacturer,
        growthPotential: validationResult.data.growthPotential,
        description: validationResult.data.description,
        
      },
    });

    // Return success response
    return { success: true };
  } catch (error) {
    console.error("Error creating enterprise:", error);
    return { success: false, error: "An error occurred." };
  }
};