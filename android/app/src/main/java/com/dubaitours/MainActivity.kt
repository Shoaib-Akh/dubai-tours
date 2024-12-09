package com.dubaitours

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log // Import for debugging
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen // Import SplashScreen library

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "DubaiTours"

  /**
   * Override the onCreate method to show the splash screen with a delay.
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    try {
      SplashScreen.show(this) // Show the splash screen
      Log.d("SplashScreen", "Splash screen is displayed successfully") // Debugging log

      // Add a delay of 5 seconds (5000 milliseconds)
      Handler(Looper.getMainLooper()).postDelayed({
        // Call super.onCreate after the delay
        super.onCreate(savedInstanceState)
        Log.d("SplashScreen", "Main activity started after splash screen delay")
      }, 5000)
    } catch (e: Exception) {
      Log.e("SplashScreen", "Error displaying splash screen: ${e.message}", e) // Log error if splash fails
      super.onCreate(savedInstanceState) // Ensure super is called even in case of exception
    }
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled].
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
