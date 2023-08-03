import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';


//web: 768987258601-e2h6pm60do2lrm8dkpiepn9i6q3nded2.apps.googleusercontent.com
//IOS: 768987258601-97i9kqgaq8qkscg7kbktha21d64509em.apps.googleusercontent.com
//android:

export default function SelfProfileScreen({ navigation }) {
/*


const loadScript = (src) => new Promise((resolve, reject) => {
  if (document.querySelector(`script[src="${src}"]`)) return resolve()
  const script = document.createElement(`script`)
  script.src = src
  script.onload = () => resolve()
  script.onerror = (err) => reject(err)
  document.body.appendChild(script)
})

const GoogleAuth = () => {
  const googleButton = useRef(null);
  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = '768987258601-e2h6pm60do2lrm8dkpiepn9i6q3nded2.apps.googleusercontent.com'
    const iosId = '768987258601-97i9kqgaq8qkscg7kbktha21d64509em.apps.googleusercontent.com'

    loadScript(src) 
      .then(() => {
        //global google
        console.log(google)
        google.accounts.id.initialize({
          client_id: id,
          callback: handelCredentialResponse,
        })
        google.accounts.id.renderbutton(
          googleButton.current, 
          {theme: 'outline', size: 'large'}
        )
      })
      .catch(console.error)

      return () => {
        const scriptTag = document.querySelector(`script[src="${src}"]`)
        if (scriptTag) document.body.removeChild(scriptTag)
      }
  }, [])

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  return (
    <div ref={googleButton}></div>
  )
}
export default GoogleAuth
*/
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setuser] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clidentId: '768987258601-e2h6pm60do2lrm8dkpiepn9i6q3nded2.apps.googleusercontent.com',
    iosClientId: '768987258601-97i9kqgaq8qkscg7kbktha21d64509em.apps.googleusercontent.com'
  });

  React.useEffect(() => {
    if(response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headders: {
        Autherization: `Bearer ${accessToken}`
      }
    });
    const useInfo = await response.json();
    setuser(useInfo)
  }

  const ShowUserInfo = () => {
    if(user) {

      return(
        <View style={{flex: 1, alignItems: 'center', justifyConent: 'center'}}>
          <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom}}>Welcome</Text>
          <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}}></Image>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      {user && <ShowuserInfo/>}
      {user === null && 
        <>
        <Text style={{fontSize: 35, fontWeight: 'bold'}}>Welcome</Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', marginbottom: 20, color: 'gray'}}>Please Login</Text>
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
            }}
        >
          <Image source={require("../assets/google_signin.png")} style={styles.img} />
        </TouchableOpacity>
        </>
      
      }
  </View>
  )






/*

  return (
    <SafeAreaView style={styles.view}>
      <TouchableOpacity onPress={() => navigation.navigate("SwipeScreen")}>
        <Image
          source={require("../assets/back-icon.png")}
          style={{ width: 26, height: 26, left: 15 }}
        />
      </TouchableOpacity>
      <Text style={{ paddingTop: 300, textAlign: "center" }}>
        The profile editing screen is still under development.
      </Text>
    </SafeAreaView>
  );

  */
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 300, 
    height: 50,
    margin: 30,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#555'
  }
});
