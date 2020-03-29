import React, { useRef } from 'react'
import { TouchableWithoutFeedback, Animated, StyleSheet, Easing } from 'react-native'

const AnimatedTabButton = props => {
  const { title, icon, isFocussed, handleNavigate } = props;

  // WITHE CONTAINER
  const animatedItemValues = useRef(new Animated.Value(0)).current;
  const animatedItemStyle = {
    transform: [
      {
        translateY: animatedItemValues
      }
    ]
  }

  // BUBBLE FOR ACTIVE TABS
  const animatedBubbleValues = useRef(new Animated.Value(0)).current;
  const animatedBubbleScaleValues = animatedBubbleValues.interpolate({
    inputRange: [0, 0.25, 0.4, 0.525, 0.8, 1],
    outputRange: [0.01, 3, 2, 1, 3.2, 3],
  })
  const animatedBubbleStyle = {
    transform: [{
      scale: animatedBubbleScaleValues
    }]
  }

  // FADING MINI BUBBLE
  const animatedMiniBubbleValues = useRef(new Animated.Value(0)).current;
  const animatedMiniBubbleHeightValues = animatedMiniBubbleValues.interpolate({
    inputRange: [0, 0.01, 1],
    outputRange: [0, 1, 1]
  })
  const animatedMiniBubbleTranslateValues = animatedMiniBubbleValues.interpolate({
    inputRange: [0, 1],
    outputRange: [13, 0]
  })
  const animatedMiniBubbleStyle = {
    opacity: animatedMiniBubbleHeightValues,
    transform: [{ translateY: animatedMiniBubbleTranslateValues }]
  }

  // FOR TEXT
  const animatedTitleValues = animatedBubbleValues.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 60]
  })
  const animatedTitleStyle = {
    transform: [{ translateY: animatedTitleValues }]
  }

  // FOR ICON
  const animatedIconValues = useRef(new Animated.Value(0)).current;
  const animatedIconColorValues = animatedIconValues.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4C53DD', '#FFF']
  })
  const animatedIconStyle = {
    tintColor: animatedIconColorValues
  }

  // isFocussed ANIMATION CONFIG
  const startAnimation = () => {
    Animated.parallel([
      // WITHE CONTAINER
      Animated.timing(animatedItemValues, {
        toValue: -30,
        duration: 1500,
        delay: 500,
        easing: Easing.in(Easing.elastic(1.5)),
        useNativeDriver: true,
      }),
      // BUBBLE
      Animated.timing(animatedBubbleValues, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.out(Easing.ease)),
        useNativeDriver: true,
      }),
      // MINI BUBBLE
      Animated.timing(animatedMiniBubbleValues, {
        toValue: 1,
        duration: 1500,
        delay: 500,
        useNativeDriver: true,
      }),
      // ICON
      Animated.timing(animatedIconValues, {
        toValue: 1,
        duration: 3000,
      }),
    ]).start();
  };

  // !isFocussed ANIMATION CONFIG
  const endAnimation = () => {
    Animated.parallel([
      // WITHE CONTAINER
      Animated.timing(animatedItemValues, {
        toValue: 0,
        duration: 500,
        delay: 500,
        useNativeDriver: true,
      }),
      // BUBBLE
      Animated.timing(animatedBubbleValues, {
        toValue: 0,
        duration: 3250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // MINI BUBBLE
      Animated.timing(animatedMiniBubbleValues, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      // ICON
      Animated.timing(animatedIconValues, {
        toValue: 0,
        duration: 1000,
        delay: 750,
      }),
    ]).start();
  }

  // STARTS THE ANIMATIONS AFTER THE COMPONENT IS MOUNTED
  React.useEffect(() => {
    if (isFocussed) {
      startAnimation();
    } else {
      endAnimation();
    }
  }, [isFocussed]);

  return (
    <TouchableWithoutFeedback onPress={handleNavigate} >
      <Animated.View style={[styles.container, animatedItemStyle]} >
        <Animated.View style={[styles.bubble, animatedBubbleStyle]} />
        <Animated.View style={[styles.miniBubble, animatedMiniBubbleStyle]} />
        <Animated.Image source={icon} style={animatedIconStyle} />
        <Animated.View style={[styles.titleContainer, animatedTitleStyle]}>
          <Animated.Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              color: isFocussed ? '#4C53DD' : '#FFF',
            }}
          >
            {title}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: 'center'
  },
  bubble: {
    position: 'absolute',
    height: 17,
    width: 17,
    borderRadius: 8.5,
    backgroundColor: '#4C53DD'
  },
  miniBubble: {
    position: 'absolute',
    alignSelf: 'center',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4C53DD'
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


export default AnimatedTabButton;