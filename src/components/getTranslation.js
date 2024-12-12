import axios from "axios";
import * as RNLocalize from "react-native-localize";

const GOOGLE_TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single";
import texts from "../assets/translations/translations.json";

export const getTranslation = async (deviceLanguage) => {
  try {
    // Get the device language


    // Ensure texts are in the correct format (assuming "en" is the source language)
    const textsArray = Object.keys(texts.en); // Extract all keys (like 'overview', 'comingSoon', etc.)
    if (RNLocalize?.getLocales()[0]?.languageCode == "en") {

      return
    }
    // Map over each key to create a translation request for each individual text
    const translations = await Promise.all(
      textsArray.map(async (key) => {
        const textToTranslate = texts.en[key]; // Original text in English
        const response = await axios.get(GOOGLE_TRANSLATE_URL, {
          params: {
            client: "gtx", // Required client parameter
            sl: "en", // Source language (English)
            tl: deviceLanguage, // Target language (device language)
            dt: "t", // Translate text
            q: textToTranslate, // Text to translate
          },
        });
        // Extract the translated text
        const translatedText = response.data[0][0][0];
        return { key, translation: translatedText }; // Return the translated text
      })
    );


    // Create a new object with the translated texts for the device language
    const translatedTexts = translations.reduce((acc, { key, translation }) => {
      acc[key] = translation;
      return acc;
    }, {});

    return translatedTexts; // Return the translated texts
  } catch (error) {
    console.error("Translation error:", error.message);
    return texts.en; // Fallback to original English texts if error occurs
  }
};
