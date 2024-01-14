import { Pressable, StyleSheet, Text } from "react-native";
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
    <Pressable onPress={handlePress} style={styles.categoryButton}>
      <Text style={{ ...FONTS.body5 }}>{item.name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: COLORS.subGray,
    paddingVertical: SIZES.padding - 3,
    paddingHorizontal: SIZES.padding + 5,
    marginBottom: SIZES.padding - 5,
  }
})
export default CategoryButton;