import axios from "axios";
import * as RNLocalize from "react-native-localize";

const GOOGLE_TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single";
import texts from "../assets/translations/translations.json";

export const getTranslation = async (deviceLanguage) => {
  try {
    // Combine all texts into a single string, separated by a delimiter
    const delimiter = "|||";
    const combinedTexts = Object.values(texts.en).join(delimiter);

    // Make a single API request to translate the combined texts
    const response = await axios.get(GOOGLE_TRANSLATE_URL, {
      params: {
        client: "gtx", // Required client parameter
        sl: "en", // Source language (English)
        tl: deviceLanguage, // Target language (device language)
        dt: "t", // Translate text
        q: combinedTexts, // Combined text to translate
      },
    });

    // Split the translated text back into individual texts
    const translatedArray = response.data[0][0][0].split(delimiter);

    // Map translated texts back to their keys
    const translatedTexts = Object.keys(texts.en).reduce((acc, key, index) => {
      acc[key] = translatedArray[index];
      return acc;
    }, {});

    return translatedTexts; // Return the translated texts
  } catch (error) {
    console.error("Translation error:", error.message);
    return texts.en; // Fallback to original English texts if error occurs
  }
};
