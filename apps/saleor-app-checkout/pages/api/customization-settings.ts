import { getPublicSettings } from "@/saleor-app-checkout/backend/configuration/settings";
import { allowCors } from "@/saleor-app-checkout/backend/utils";
import { NextApiHandler } from "next";
import { getSaleorApiUrlFromRequest } from "@/saleor-app-checkout/backend/auth";
import { unpackThrowable } from "@/saleor-app-checkout/utils/unpackErrors";

const handler: NextApiHandler = async (req, res) => {
  console.debug("Customization settings endpoint called");
  let settings = { customizations: {} };
  try {
    const [saleorApiUrlError, saleorApiUrl] = unpackThrowable(() =>
      getSaleorApiUrlFromRequest(req)
    );
    if (saleorApiUrlError) {
      res.status(400).json({ message: saleorApiUrlError.message });
      return;
    }

    settings = await getPublicSettings({ saleorApiUrl });
  } catch (error) {}

  res.status(200).json(settings.customizations);
};
export default allowCors(handler);
