import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../Theme/Theme";
import { useNavigation } from "@react-navigation/native";

const CategoryButton = ({ item, type }) => {

  const navigation = useNavigation();

  const handlePress = () => {
    if (type === 'course') {
      navigation.navigate('CourseFilterByCategoryScreen', { id: item.id })
      return;
    } else {
      navigation.navigate('PodcastFilterByCategoryScreen', { id: item.id })
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.categoryButton}>
      <Text style={{ ...FONTS.body6,color:COLORS.black }}>{item.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding - 3,
    paddingHorizontal: SIZES.padding + 5,
    marginBottom: SIZES.padding - 5,
    width:'31%',
    justifyContent:"center",
    alignItems:"center",
    borderWidth:0.7,
    borderColor:COLORS.primaryBorder,
    borderRadius:SIZES.radius,
    marginEnd:"1%"
  }
})
export default CategoryButton;
