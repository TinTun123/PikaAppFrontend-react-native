import React, { useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Octicons from 'react-native-vector-icons/Octicons';
import { SIZES } from "../Theme/Theme";

const AnimatedIcon = Animated.createAnimatedComponent(Octicons);

const CollapsibleView = ({ children, trigger }) => {
  const [collapsed, setCollapsed] = useState(true);
  const animation = new Animated.Value(0);

  const toggle = () => {
    setCollapsed((prev) => !prev);
    Animated.timing(animation, {
      toValue: collapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1], // Adjusted input range
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={{ paddingVertical: SIZES.padding - 5 }}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={toggle}>
        {trigger}
        <AnimatedIcon
          name="chevron-down"
          size={25}
          color="#000"
          style={{ transform: [{ rotate: rotateInterpolate }] }}
        />
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        {children}
      </Collapsible>
    </View>
  );
};

export default CollapsibleView;
