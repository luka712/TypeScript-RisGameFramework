export const KTX_LOWEST_QUALITY = "Lowest";
export const KTX_LOW_QUALITY = "Low";
export const KTX_MEDIUM_QUALITY = "Medium";
export const KTX_HIGH_QUALITY = "High";
export const KTX_HIGHEST_QUALITY = "Highest";


/**
 * Gets the compression level for the given compression quality
 * @param compressionQuality The compression quality.
 */
export function getCompressionLevel(compressionQuality: string) : number {
    switch (compressionQuality) {
        case KTX_LOWEST_QUALITY:
            return 0;
        case KTX_LOW_QUALITY:
            return 1;
        case KTX_MEDIUM_QUALITY:
            return 2;
        case KTX_HIGH_QUALITY:
            return 3;
        case KTX_HIGHEST_QUALITY:
            return 4;
        default:
            throw new Error("Invalid compression quality");
    }
}