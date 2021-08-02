import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image, Alert
} from 'react-native';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';
import Pronounce from './components/Audio'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('hello');
  const [dict, setDict] = useState({});
  const [sound, setSound] = useState()

  async function getDictionaryData() {
    try {
      let url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchQuery}`;
      let res = await fetch(url);
      let data = await res.json();
      let word = data[0].word;
      let phoneticsWord = data[0].phonetics[0].text;
      let pronounciation = data[0].phonetics[0].audio;
      let partOfSpeech = data[0].meanings[0].partOfSpeech;
      let def = data[0].meanings[0].definitions[0].definition;
      let example = data[0].meanings[0].definitions[0].example;
      console.log(pronounciation);
      const dictInfo = {
        word,
        phoneticsWord,
        pronounciation,
        partOfSpeech,
        def,
        example,
      };

      setDict(dictInfo);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getDictionaryData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputdiv}>
        <TextInput
          style={styles.input}
          placeholder="Ex: Hello"
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity onPress={getDictionaryData}>
          <Image
            style={{ width: 44, height: 44 }}
            source={require('./assets/search.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoPallet}>
        <View style={styles.word}>
          <Text style={{ fontSize: 25 }}>
            <Text style={{ fontWeight: 'bold' }}>Word:</Text> {dict.word}
          </Text>
          <Pronounce soundUrl={dict.pronounciation}/>
        </View>

        <View style={styles.word2}>
          <Text style={{ fontSize: 25 }}>
            <Text style={{ fontWeight: 'bold' }}>Part Of Speech: </Text>
            {dict.partOfSpeech}
          </Text>
        </View>

        <View style={styles.word2}>
          <Text style={{ fontSize: 25 }}>
            <Text style={{ fontWeight: 'bold' }}>Phonetics: </Text>
            {dict.phoneticsWord}
          </Text>
        </View>

        <View style={styles.word2}>
          <Text style={{ fontSize: 25 }}>
            <Text style={{ fontWeight: 'bold' }}>Description:</Text> {dict.def}
          </Text>
        </View>

        <View style={styles.word2}>
          <Text style={{ fontSize: 25 }}>
            <Text style={{ fontWeight: 'bold' }}>Example: </Text>
            {dict.example}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FAFAFA",
  },
  input: {
    fontSize: 20,
    padding: 10,
    margin: 10,
    width: '80%',
    borderWidth: 2,
    borderColor: '#212121',
    borderRadius: 10,
  },
  inputdiv: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoPallet: {
    backgroundColor: '#FFD54F',
    width: '100%',
    marginTop: 40,
    height: 700,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
  },
  word: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  word2: {
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
});
