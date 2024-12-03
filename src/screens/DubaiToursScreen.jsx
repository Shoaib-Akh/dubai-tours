import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, DevSettings, Animated } from "react-native";
import * as Localize from "react-native-localize";
import one from "../assets/Images/one.png";
import two from "../assets/Images/two.png";

const DubaiToursScreen = () => {
  const [imageIndex, setImageIndex] = useState(0); 
  const [fadeAnim] = useState(new Animated.Value(0)); 
  const [showContent, setShowContent] = useState(false); 
  const [language, setLanguage] = useState("en"); 

  useEffect(() => {
    const imageTimeout = setTimeout(() => {
      setImageIndex(1);
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {

        setTimeout(() => setShowContent(true), 500);
      });
    }, 1000);
    const deviceLanguage = Localize?.getLocales()[0]?.languageCode;
    setLanguage(deviceLanguage === "ar" ? "ar" : "en");

    return () => clearTimeout(imageTimeout); 
  }, []);

  const translations = {
    en: {
      overview: "Overview",
      comingSoon: "COMING SOON",
      welcome: "Welcome to Dubai Tours!",
      intro: "We are thrilled to have you embark on a journey through the vibrant and dynamic city of Dubai. Whether you’re here to explore the stunning skyline, indulge in world-class shopping, or experience the rich cultural heritage, our app is your perfect companion.",
      discover: "Discover hidden gems, plan your itinerary, and get insider tips to make the most of your visit. From the iconic Burj Khalifa to the serene beaches, Dubai offers something for every traveler.",
      thanks: "Thank you for choosing our app to guide you through this incredible city. We hope you have an unforgettable experience!",
      regards: "Warm regards,\nThe Dubai Tours Team",
      footer: "Designing & Developing By:",
      buttonText: "MK Brands Marketing",
    },
    ar: {
      overview: "نظرة عامة",
      comingSoon: "قريبًا",
      welcome: "مرحبًا بكم في جولات دبي!",
      intro: "يسعدنا أن ترافقنا في رحلة عبر المدينة النابضة بالحياة والديناميكية، دبي. سواء كنت هنا لاستكشاف الأفق المذهل، أو الانغماس في التسوق العالمي، أو تجربة التراث الثقافي الغني، فإن تطبيقنا هو رفيقك المثالي.",
      discover: "اكتشف الجواهر الخفية، وخطط لمسار رحلتك، واحصل على نصائح من الداخل للاستفادة القصوى من زيارتك. من برج خليفة الأيقوني إلى الشواطئ الهادئة، تقدم دبي شيئًا لكل مسافر.",
      thanks: "شكرًا لاختيارك تطبيقنا لإرشادك في هذه المدينة الرائعة. نتمنى لك تجربة لا تُنسى!",
      regards: "أطيب التحيات،\nفريق جولات دبي",
      footer: "تصميم وتطوير بواسطة:",
      buttonText: "MK Brands Marketing",
    },
  };

  const handlePress = () => {
    DevSettings.reload();
  };

  return (
    <>
      {!showContent && (
        <View style={styles.imageContainer}>
          {imageIndex === 0 && (
            <Animated.Image source={one} style={[styles.fullScreenImage, { opacity: 1 }]} />
          )}
          {imageIndex === 1 && (
            <Animated.Image source={two} style={[styles.fullScreenImage, { opacity: fadeAnim }]} />
          )}
        </View>
      )}
      {showContent && (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../assets/Images/logo.png")}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <Text style={styles.title}>Top Vision Tourism</Text>
            <TouchableOpacity
              style={styles.languageToggle}
              onPress={() => setLanguage(language === "en" ? "ar" : "en")}
            >
              <Text style={styles.languageText}>{language === "en" ? "AR" : "EN"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabs}>
            <Text style={[styles.tab, styles.activeTab]}>{translations[language].overview}</Text>
            <Text style={styles.tab}>{translations[language].comingSoon}</Text>
          </View>

          <View style={styles.content}>
            <View>
              <Text style={styles.heading}>{translations[language].welcome}</Text>

              <Text style={styles.bodyText}>{translations[language].intro}</Text>
              <Text style={styles.bodyText}>{translations[language].discover}</Text>
              <Text style={styles.bodyText}>{translations[language].thanks}</Text>

            </View>
            <Text style={styles.signature}>{translations[language].regards}</Text>
          </View>

          <Text>{translations[language].footer}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>{translations[language].buttonText}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
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
    justifyContent: "space-between"
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
    fontFamily: "serif",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#888",
  },
  activeTab: {
    fontWeight: "bold",
    color: "#000",
    textDecorationLine: "underline",
  },
  content: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",

  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 12,
  },
  signature: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#00A0E4', 
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25, 
    shadowColor: '#00A0E4', 
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'uppercase',
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
  },
});

export default DubaiToursScreen;
