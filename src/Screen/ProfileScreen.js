import React, { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../Global/Styles";
import { COLORS, SIZES } from "../Theme/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { AuthContext } from "../Provider/AuthProvider";


const tabs = [
  { icon: 'hearto', display: 'Favorites' },
  { icon: 'download', display: 'Downloads' },
  { icon: 'earth', display: 'Languages' },
  { icon: 'pay-circle-o1', display: 'Paid course' },
  { icon: 'history', display: 'Payment History' },
  { icon: 'rotate', display: 'Check Update' },
  { icon: 'shield-lock', display: 'Privacy & Policy' },
  { icon: 'document-text-outline', display: 'Terms & Conditions' },
  { icon: 'earphones-alt', display: 'Contact Us' },
  { icon: 'sign-out', display: 'Logout' },
];



const ProfileScreen = props => {

  const { handleLogout } = useContext(AuthContext);

  const checkTab = (current, tab) => {
    return tab.display === current;
  }

  const handleTabPress = (tab) => {
    if (checkTab('Logout', tab)) {
      handleLogout();
    }
  }
  const DynamicIcons = (tab) => {
    if (checkTab('Languages', tab) || checkTab('Favorites', tab) || checkTab('Paid course', tab)) {
      return <AntDesign name={tab.icon} size={22} color={COLORS.black} />
    } else if (checkTab('Downloads', tab)) {
      return <Feather name={tab.icon} size={22} color={COLORS.black} />
    } else if (checkTab('Payment History', tab) || checkTab('Privacy & Policy', tab) ||
      checkTab('Logout', tab)) {
      if (checkTab('Logout', tab)) {
        return <Octicons name={tab.icon} size={22} color={COLORS.primary} />
      }
      return <Octicons name={tab.icon} size={22} color={COLORS.black} />
    } else if (checkTab('Check Update', tab)) {
      return <FontAwesome6 name={tab.icon} size={22} color={COLORS.black} />
    } else if (checkTab('Contact Us', tab)) {
      return <SimpleLineIcons name={tab.icon} size={22} color={COLORS.black} />
    }
    else {
      return <Ionicons name={tab.icon} size={22} color={COLORS.black} />
    }
  }


  return (
    <View style={globalStyles.container}>
      <ScrollView style={{ ...globalStyles.subContainer }}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={require("../Graphic/DummyImage/profile.png")} />
          <View >
            <Text style={styles.name}>Beautiful Princess</Text>
            <Text style={styles.email}>beautifulprincess@gmail.com</Text>
          </View>
        </View>
        <View style={styles.editContainer}>
          <TouchableOpacity style={styles.editButton} >
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Feather name="edit" size={20} color={COLORS.white} />
              <Text style={{ color: COLORS.white }}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: COLORS.lightGray4, padding: .5, marginTop: SIZES.padding }}></View>

        <View style={{ marginVertical: SIZES.padding }}>
          {
            tabs.map(tab => (
              <TouchableOpacity key={tab.icon} onPress={() => handleTabPress(tab)} style={styles.tabContainer}>
                <View style={{ flexDirection: 'row', gap: SIZES.padding }}>
                  {DynamicIcons(tab)}
                  <Text style={{
                    color: checkTab('Logout', tab) ? COLORS.primary : COLORS.black,
                    fontSize: SIZES.h5
                  }}>{tab.display}</Text>
                </View>
                <Feather name='chevron-right' color={checkTab('Logout', tab) ? COLORS.primary : COLORS.black} size={22} />
              </TouchableOpacity>
            ))
          }


        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: SIZES.roundRadius,
    borderWidth: 2,
    borderColor: COLORS.primaryBorder,
    marginEnd: SIZES.padding
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: SIZES.padding
  },
  editButton: {
    width: '30%',
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: SIZES.h5,
    marginBottom: 2,
    color: COLORS.black,
  },
  email: {
    color: COLORS.black,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: SIZES.padding * 1.7,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.lightGray4,
    borderBottomWidth: .5,
  },
})

export default ProfileScreen
