import React from "react";
import { View, Text, StyleSheet, ScrollView ,Image,TouchableOpacity,DevSettings} from "react-native";

const DubaiToursScreen = () => {
  const handlePress = () => {
    // Reload the app
    DevSettings.reload();
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      
      <Image 
      source={require('../assets/Images/logo.png')} 
      style={{ width: 50, height: 50,marginRight:10 }} // Adjust width and height as needed
    />
        <Text style={styles.title}>Top Vision Tourism</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Overview</Text>
        <Text style={styles.tab}>COMING SOON</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content} >
      <View >
        <Text style={styles.heading}>Welcome to Dubai Tours!</Text>
        <Text style={styles.bodyText}>
          We are thrilled to have you embark on a journey through the vibrant
          and dynamic city of Dubai. Whether you’re here to explore the stunning
          skyline, indulge in world-class shopping, or experience the rich
          cultural heritage, our app is your perfect companion.
        </Text>
        <Text style={styles.bodyText}>
          Discover hidden gems, plan your itinerary, and get insider tips to
          make the most of your visit. From the iconic Burj Khalifa to the
          serene beaches, Dubai offers something for every traveler.
        </Text>
        <Text style={styles.bodyText}>
          Thank you for choosing our app to guide you through this incredible
          city. We hope you have an unforgettable experience!
        </Text>
        
      </View>
      <Text style={styles.signature}>
          Warm regards,{"\n"}
          The Dubai Tours Team
        </Text>
      </View>
     

      {/* Footer */}
      <View style={styles.buttonContainer}>
        <Text>Designing & Developing By:</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>MK Brands Marketing</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
    flex:1,
    flexDirection:"column",
    justifyContent:"space-between",
    height:400,
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
    backgroundColor: '#00A0E4', // Primary color for the button
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25, // Rounded corners for the button
    shadowColor: '#00A0E4', // Shadow color for the effect
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6, // Elevation for Android shadow effect
    alignItems: 'center',
    justifyContent: 'center',
    width: 200, // Width of the button
    height: 50, // Height of the button
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF', // White text color
    textTransform: 'uppercase',
  },
});

export default DubaiToursScreen;
