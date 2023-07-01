import { defaultPublicSettings } from "@/saleor-app-checkout/config/defaults";
import { mapPublicSettingsToMetadata } from "@/saleor-app-checkout/frontend/misc/mapPublicSettingsToMetadata";
import { PublicSettingsValues } from "@/saleor-app-checkout/types/api";

describe("/utils/frontend/misc/mapSettingsToMetadata", () => {
  it("maps settings to public metadata", () => {
    const settingsValues: PublicSettingsValues = {
      ...defaultPublicSettings,
      customizations: {
        ...defaultPublicSettings.customizations,
        branding: {
          ...defaultPublicSettings.customizations.branding,
          buttonBgColorPrimary: "#fff",
          buttonBgColorHover: "#fff",
        },
      },
    };

    const mappedMetadata = mapPublicSettingsToMetadata(settingsValues);

    const expectedMetadata: Array<{
      key: string;
      value: string;
    }> = [
      {
        key: "customizations",
        value:
          '{"branding":{"buttonBgColorPrimary":"#fff","buttonBgColorHover":"#fff","borderColorPrimary":"#394052","errorColor":"#B65757","successColor":"#2C9B2A","buttonTextColor":"#ffffff","textColor":"#000000","logoUrl":""},"productSettings":{"lowStockThreshold":""}}',
      },
      {
        key: "channelActivePaymentProviders",
        value: "{}",
      },
    ];

    expect(mappedMetadata).toEqual(expectedMetadata);
  });
});
