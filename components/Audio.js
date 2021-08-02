import * as React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native'
import { Audio } from 'expo-av'

export default function Pronounce({ soundUrl }) {

    const [sound, setSound] = React.useState()

    async function playSound() {
        try {
            console.log("Loading Sound!")
            const { sound } = await Audio.Sound.createAsync(
                { uri: soundUrl }
            );
            setSound(sound);

            console.log("Play Sound!")
            await sound.playAsync()
        } catch (e) {
            Alert.alert(
                "Audio Not Playing",
                "Audio not playing/loading due to server problems",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <TouchableOpacity onPress={playSound}>
            <Image
              style={{ width: 44, height: 44 }}
              source={require('../assets/sound.png')}
            />
          </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
})