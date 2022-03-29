import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import {
  Button, 
  Center, 
  Heading, 
  Text, 
  VStack 
} from 'native-base'
import React from 'react'
import { StyleSheet, Dimensions, FlatList, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#fff', white: '#fff' }

const slides = [
  {
    id: '1',
    image: require('../assets/images/onboarding-screen1.png'),
    title: 'Create your account',
    description: 'Users can register and login to their account'
  },
  {
    id: '2',
    image: require('../assets/images/onboarding-screen2.png'),
    title: 'Manage your account',
    description: 'Users can edit their personal information'
  },
  {
    id: '3',
    image: require('../assets/images/onboarding-screen3.png'),
    title: 'Privacy and Data Protection',
    description: 'Securing users accounts information'
  },
  {
    id: '4',
    image: require('../assets/images/onboarding-screen4.png'),
    title: 'Speech Transcription',
    description: 'Speech Recognition using Google Speech'
  },
  {
    id: '5',
    image: require('../assets/images/onboarding-screen5.png'),
    title: 'Transcription History',
    description: 'Users can view & edit their previous transcriptions'
  },
  {
    id: '6',
    image: require('../assets/images/onboarding-screen6.png'),
    title: 'User Reviews',
    description: 'Give us a feedback on improving the application'
  }
]

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image source={item.image} alt="onboarding" style={{ height: '45%', width, resizeMode: 'center' }} />
      <Heading fontSize="xl">{item.title}</Heading>
      <Text color="gray.500" fontSize="sm" marginTop="15">{item.description}</Text>
    </View>
  );
};

const SignIn = ({ 
  signInWithGoogle,
  signInAnonymously, 
  isValidating, 
}) => {

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const Footer = () => {
    return (
      <View
        style={{
          height: '8%',
          justifyContent: 'space-between',
          paddingHorizontal: 20
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
            {slides.map((_, index) => (
              <View key={index} style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: '#000',
                  width: 20,
                }]} />
            ))}
          </View>
        </View>
    )
  }

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <VStack bg="white" flex={1}>
      <Center flex={1}>
        <Heading>Speech Transcriber</Heading>
        <VStack>
          <Text color="gray.500" fontSize="xs">
            Powered by Google Speech Recognition
          </Text>
          </VStack>
        </Center>
        
        <SafeAreaView
          flex={2}
          bg={COLORS.primary}>
            <FlatList
              onMomentumScrollEnd = { updateCurrentSlideIndex}
              data={slides}
              contentContainerStyle={{
                height: height * 0.75
              }}
              pagingEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <Slide item={item} />}
            />
            <Footer />
          </SafeAreaView>
      <VStack
        alignItems="center"
        flex={1}
        justifyContent="center"
        space={4}
      >
        <Button
          _pressed={{ opacity: 0.6, bg: 'black' }}
          bg="black"
          color="white"
          disabled={isValidating}
          w="304"
          onPress={signInAnonymously}
        >
          Sign in as Guest
        </Button>
        <GoogleSigninButton
          color={GoogleSigninButton.Color.Dark}
          disabled={isValidating}
          size={GoogleSigninButton.Size.Wide}
          onPress={signInWithGoogle}
        />
      </VStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  indicator: {
    height: 5.5,
    width: 5,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 5,
  }
})

export default SignIn
