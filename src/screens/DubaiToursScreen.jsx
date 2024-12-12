import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  DevSettings,
  Animated,
  ActivityIndicator,
} from "react-native";
import one from "../assets/Images/one.png";
import two from "../assets/Images/two.png";
import { useNavigation, useTheme } from "@react-navigation/native";
import { getTranslation } from "../components/getTranslation";
import * as RNLocalize from 'react-native-localize';
import texts from "../assets/translations/translations.json";
const DubaiToursScreen = () => {
  const navigate = useNavigation()
  const { colors } = useTheme(); // Access theme colors
  const [imageIndex, setImageIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [contentAnim] = useState(new Animated.Value(0));
  const [showContent, setShowContent] = useState(false);
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    const imageTimeout = setTimeout(() => {
      setImageIndex(1);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setShowContent(true);
          Animated.timing(contentAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        }, 500);
      });
    }, 2000);

    const deviceLanguage = RNLocalize?.getLocales()[0]?.languageCode;
    setLanguage(deviceLanguage);

    return () => clearTimeout(imageTimeout);
  }, []);
  useEffect(() => {
    const initializeTranslations = async () => {
      setLoading(true);
      const deviceLanguage = RNLocalize?.getLocales()[0]?.languageCode || "en";
      setLanguage(deviceLanguage);

      const translatedTexts = await getTranslation(deviceLanguage) || texts.en;
      console.log("translatedTexts", translatedTexts);

      setTranslations(translatedTexts);
      setLoading(false);
    };
    initializeTranslations();
  }, []);

  const handlePress = () => {
    DevSettings.reload();
  };
  const deviceLanguage = RNLocalize?.getLocales()[0]?.languageCode
  const handleLanguageToggle = async () => {
    const newLanguage = language === "en" ? RNLocalize?.getLocales()[0]?.languageCode || "en" : "en";
    setLanguage(newLanguage);
    setLoading(true);
    const translatedTexts = await getTranslation(newLanguage);
    setTranslations(translatedTexts);
    setLoading(false);
  };
  return (
    <>
      {!showContent && (
        <View style={styles.imageContainer}>
          {imageIndex === 0 && (
            <Animated.Image source={one} style={[styles.fullScreenImage, { opacity: 1 }]} />
          )}
          {imageIndex === 1 && (
            <Animated.Image source={two} style={[styles.twoFullScreenImage, { opacity: fadeAnim }]} />

          )}
        </View>
      )}
      {showContent && (
        <Animated.View
          style={{
            flex: 1,
            opacity: contentAnim,
            transform: [{ translateY: contentAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }],
          }}
        >
          <ScrollView
            contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
          >
            <View style={styles.header}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 40,
                  backgroundColor: "#f5f5f5",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/Images/logo.png")}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <TouchableOpacity
              
              // onPress={() => navigate.navigate("LoginScreen")}
              
              >

                <Text style={[styles.title, { color: colors.text }]}>Top Vision Tourism</Text>
              </TouchableOpacity>
              {deviceLanguage !== "en" &&
                <TouchableOpacity
                  style={styles.languageToggle}
                  onPress={handleLanguageToggle}
                >
                  <Text style={styles.languageText}>{language === "en" ? deviceLanguage : "en"}</Text>
                </TouchableOpacity>
              }

            </View>

            <View style={styles.tabs}>
              <Text style={[styles.tab, styles.activeTab, { color: colors.primary }]}>
                {translations.overview}
              </Text>
              <Text style={[styles.tab, { color: colors.text }]}>
                {translations.comingSoon}
              </Text>
            </View>

            <View style={[styles.content, { backgroundColor: colors.card }]}>

              {
                loading ?
                  <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
                    <ActivityIndicator size="large" color="#6200ee" />
                  </View>
                  :
                  <>
                    <Text style={[styles.heading, { color: colors.text }]}>
                      {translations.welcome}
                    </Text>
                    <Text style={[styles.bodyText, { color: colors.text }]}>
                      {translations.intro}
                    </Text>
                    <Text style={[styles.bodyText, { color: colors.text }]}>
                      {translations.discover}
                    </Text>
                    <Text style={[styles.bodyText, { color: colors.text }]}>
                      {translations.thanks}
                    </Text> 
                    <Text style={[styles.signature, { color: colors.text }]}>
                      {translations.ToursTeam}
                    </Text>
                    <Text style={[styles.signature, { color: colors.text }]}>
                      {translations.regards}
                    </Text>
                  </>
              }

            </View>

            <Text style={{ color: colors.text }}>{translations.footer}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>MK Brands Marketing</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    marginBottom: 16,
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activeTab: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  content: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  signature: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#00A0E4",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: "#00A0E4",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "uppercase",
  },
  languageToggle: {
    backgroundColor: "#00A0E4",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  languageText: {
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  twoFullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    backgroundColor: 'black',
    zIndex: 1,
    transition: 'opacity 0.5s ease-in-out',
    // transform: [{ scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.5] }) }],
  }
});

export default DubaiToursScreen;
