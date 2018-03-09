// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { Platform, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { Images } from './DevTheme'
import { default as Sound } from 'react-native-sound';
import ButtonBox from './ButtonBox'

//Styles
import Metrics from '../../App/Themes/Metrics'
import Colors from '../../App/Themes/Colors'
import Fonts from '../../App/Themes/Fonts'
import styles from '../../App/Containers/Styles/LaunchScreenStyles'

// Examples Render Engine
import ExamplesRegistry from '../../App/Services/ExamplesRegistry'


class MainScreen extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
		  content: [] 
		}
	  }

	play = ()=> {
		console.log("play");
		track.play();
		setTimeout(()=>{this.sync();},30);
	}
	pause = ()=>{
		console.log("pause");
		track.pause();
	}
	stop = ()=>{
		console.log("stop");
		track.stop();
		currentTime = -1;
		this.state.content = paragraph;
		this.setState({paragraph});
	}
	sync = () => {
	if(track === null/* || !track.isPlaying()*/) return;
		//sync logic
		track.getCurrentTime((seconds, isPlaying) => {
			if(!isPlaying) return;
			currentTime = seconds;
			// console.log("seconds = " + seconds);
			this.state.content = paragraph;
			this.setState({paragraph});
			setTimeout(()=>{this.sync();}, 50);
		});
	}
	onWordPressed = (word) => {
		alert(word.word + " is Selected");
	}
  render () {
	  console.log("render");
    return (
      <View style={[styles.container, styles.mainContainer]}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 5,
          zIndex: 10
        }}>
          <Image source={Images.backButton} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
            <View style={style.footerWrapper}>
				{this.state.content.map((word, key) =>
					<TouchableOpacity  key={key} onPress={() => this.onWordPressed(word)}>
                    	<Text style={[style.sectionText,highlight(word)]}>{word.word}</Text>                    
					</TouchableOpacity>
                )}
            </View>
        </ScrollView>
        <View style={style.menuButtons}>
            <TouchableOpacity onPress={this.play} style={[style.menuButton, {backgroundColor: Colors.eggplant}]} >
                <Text style={styles.sectionText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.pause} style={[style.menuButton, {backgroundColor: Colors.eggplant}]} >
                <Text style={styles.sectionText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.stop} style={[style.menuButton, {backgroundColor: Colors.eggplant}]} >
                <Text style={styles.sectionText}>Stop</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

//SOUND SETUP
Sound.setCategory('Playback');

var track = new Sound('luke.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound : ', error);
      alert('failed to load the sound <!>');
      return;
	}
    // loaded successfully
    // alert('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
  });
  
var currentTime = -1;

function highlight(word){
	console.log("highlight? = ");
	if(word.begin <= currentTime && word.end > currentTime){
		console.log("YEA");
		return {backgroundColor: Colors.orange};
	}else{
		return {};
	}
}

const style = {
    footerWrapper: {
        margin: Metrics.section,
        padding: Metrics.baseMargin + 20,
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    menuButtons: {
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    menuButton: {
        flex: 1,
    },
    sectionText: {
        ...Fonts.style.normal,
        color: Colors.snow,
        margin : 3,
        textAlign: 'center'
      }
}

//database
const paragraph = [
	{ "id" : 1, "word": "In", "begin" : "0.775", "end": "0.929"},
	{ "id" : 2, "word": "those", "begin" : "0.929", "end": "1.209"},
	{ "id" : 3, "word": "days", "begin" : "1.218", "end": "1.508"},
	{ "id" : 4, "word": "a", "begin" : "1.508", "end": "1.639"},
	{ "id" : 5, "word": "decree", "begin" : "1.639", "end": "2.164"},
	{ "id" : 6, "word": "went", "begin" : "2.165", "end": "2.356"},
	{ "id" : 7, "word": "out", "begin" : "2.355", "end": "2.58"},
	{ "id" : 8, "word": "from", "begin" : "2.583", "end": "2.828"},
	{ "id" : 9, "word": "Caesar", "begin" : "2.828", "end": "3.266"},
	{ "id" : 10, "word": "Augustus", "begin" : "3.267", "end": "3.904"},
	{ "id" : 11, "word": "that", "begin" : "4.03", "end": "4.196"},
	{ "id" : 12, "word": "all", "begin" : "4.216", "end": "4.484"},
	{ "id" : 13, "word": "the", "begin" : "4.486", "end": "4.597"},
	{ "id" : 14, "word": "world", "begin" : "4.594", "end": "5.005"},
	{ "id" : 15, "word": "should", "begin" : "5.006", "end": "5.211"},
	{ "id" : 16, "word": "be", "begin" : "5.211", "end": "5.345"},
	{ "id" : 17, "word": "registered", "begin" : "5.344", "end": "5.873"},
	{ "id" : 18, "word": "This", "begin" : "6.675", "end": "6.876"},
	{ "id" : 19, "word": "was", "begin" : "6.876", "end": "7"},
	{ "id" : 20, "word": "the", "begin" : "7",  "duration" : "0.11",  "end":"7.11"},
	{ "id" : 21, "word": "first", "begin" : "7.11", "end": "7.431"},
	{ "id" : 22, "word": "registration", "begin" : "7.431", "end": "8.193"},
	{ "id" : 23, "word": "when", "begin" : "8.193", "end": "8.357"},
	{ "id" : 24, "word": "Quirinius", "begin" : "8.357", "end": "8.831"},
	{ "id" : 25, "word": "was", "begin" : "8.834", "end": "9.04"},
	{ "id" : 26, "word": "governor", "begin" : "9.041", "end": "9.379"},
	{ "id" : 27, "word": "of", "begin" : "9.379", "end": "9.461"},
	{ "id" : 28, "word": "Syria", "begin" : "9.46", "end": "9.937"},
	{ "id" : 29, "word": "And", "begin" : "10.676", "end": "10.795"},
	{ "id" : 30, "word": "all", "begin" : "10.794", "end": "11.034"},
	{ "id" : 31, "word": "went", "begin" : "11.034", "end": "11.22"},
	{ "id" : 32, "word": "to", "begin" : "11.22", "end": "11.307"},
	{ "id" : 33, "word": "be", "begin" : "11.307", "end": "11.446"},
	{ "id" : 34, "word": "registered", "begin" : "11.446", "end": "12.038"},
	{ "id" : 35, "word": "each", "begin" : "12.284", "end": "12.535"},
	{ "id" : 36, "word": "to", "begin" : "12.572", "end": "12.665"},
	{ "id" : 37, "word": "his", "begin" : "12.665", "end": "12.799"},
	{ "id" : 38, "word": "own", "begin" : "12.799", "end": "13.074"},
	{ "id" : 39, "word": "town", "begin" : "13.074", "end": "13.541"},
	{ "id" : 40, "word": "And", "begin" : "14.369", "end": "14.553"},
	{ "id" : 41, "word": "Joseph", "begin" : "14.553", "end": "14.911"},
	{ "id" : 42, "word": "also", "begin" : "14.911", "end": "15.262"},
	{ "id" : 43, "word": "went", "begin" : "15.262", "end": "15.39"},
	{ "id" : 44, "word": "up", "begin" : "15.39", "end": "15.542"},
	{ "id" : 45, "word": "from", "begin" : "15.595", "end": "15.81"},
	{ "id" : 46, "word": "Galilee", "begin" : "15.811", "end": "16.352"},
	{ "id" : 47, "word": "from", "begin" : "16.557", "end": "16.631"},
	{ "id" : 48, "word": "the", "begin" : "16.632", "end": "16.753"},
	{ "id" : 49, "word": "town", "begin" : "16.752", "end": "16.988"},
	{ "id" : 50, "word": "of", "begin" : "16.988", "end": "17.085"},
	{ "id" : 51, "word": "Nazareth", "begin" : "17.085", "end": "17.644"},
	{ "id" : 52, "word": "to", "begin" : "17.966", "end": "18.12"},
	{ "id" : 53, "word": "Judea", "begin" : "18.12", "end": "18.695"},
	{ "id" : 54, "word": "to", "begin" : "18.823", "end": "18.952"},
	{ "id" : 55, "word": "the", "begin" : "18.952", "end": "19.011"},
	{ "id" : 56, "word": "city", "begin" : "19.011", "end": "19.321"},
	{ "id" : 57, "word": "of", "begin" : "19.321", "end": "19.487"},
	{ "id" : 58, "word": "David", "begin" : "19.487", "end": "19.88"},
	{ "id" : 59, "word": "which", "begin" : "20.029", "end": "20.19"},
	{ "id" : 60, "word": "is", "begin" : "20.19", "end": "20.299"},
	{ "id" : 61, "word": "called", "begin" : "20.321", "end": "20.628"},
	{ "id" : 62, "word": "Bethlehem", "begin" : "20.628", "end": "21.27"},
	{ "id" : 63, "word": "because", "begin" : "21.76", "end": "22.077"},
	{ "id" : 64, "word": "he", "begin" : "22.077", "end": "22.193"},
	{ "id" : 65, "word": "was", "begin" : "22.193", "end": "22.297"},
	{ "id" : 66, "word": "of", "begin" : "22.297", "end": "22.463"},
	{ "id" : 67, "word": "the", "begin" : "22.463", "end": "22.522"},
	{ "id" : 68, "word": "house", "begin" : "22.522", "end": "22.934"},
	{ "id" : 69, "word": "and", "begin" : "22.935", "end": "23.09"},
	{ "id" : 70, "word": "lineage", "begin" : "23.09", "end": "23.474"},
	{ "id" : 71, "word": "of", "begin" : "23.474", "end": "23.649"},
	{ "id" : 72, "word": "David", "begin" : "23.648", "end": "24.069"},
	{ "id" : 73, "word": "to", "begin" : "24.714", "end": "24.841"},
	{ "id" : 74, "word": "be", "begin" : "24.84", "end": "25.012"},
	{ "id" : 75, "word": "registered", "begin" : "25.013", "end": "25.543"},
	{ "id" : 76, "word": "with", "begin" : "25.543", "end": "25.668"},
	{ "id" : 77, "word": "Mary", "begin" : "25.668", "end": "26.183"},
	{ "id" : 78, "word": "his", "begin" : "26.183", "end": "26.355"},
	{ "id" : 79, "word": "betrothed", "begin" : "26.355", "end": "26.962"},
	{ "id" : 80, "word": "who", "begin" : "27.134", "end": "27.257"},
	{ "id" : 81, "word": "was", "begin" : "27.257", "end": "27.423"},
	{ "id" : 82, "word": "with", "begin" : "27.423", "end": "27.59"},
	{ "id" : 83, "word": "child", "begin" : "27.59", "end": "28.103"},
	{ "id" : 84, "word": "And", "begin" : "29.448", "end": "29.609"},
	{ "id" : 85, "word": "while", "begin" : "29.609", "end": "29.971"},
	{ "id" : 86, "word": "they", "begin" : "29.97", "end": "30.129"},
	{ "id" : 87, "word": "were", "begin" : "30.129", "end": "30.295"},
	{ "id" : 88, "word": "there", "begin" : "30.295", "end": "30.731"},
	{ "id" : 89, "word": "the", "begin" : "31.072", "end": "31.231"},
	{ "id" : 90, "word": "time", "begin" : "31.231", "end": "31.662"},
	{ "id" : 91, "word": "came", "begin" : "31.662", "end": "31.939"},
	{ "id" : 92, "word": "for", "begin" : "31.939", "end": "32.1"},
	{ "id" : 93, "word": "her", "begin" : "32.1", "end": "32.193"},
	{ "id" : 94, "word": "to", "begin" : "32.193", "end": "32.3"},
	{ "id" : 95, "word": "give", "begin" : "32.299", "end": "32.532"},
	{ "id" : 96, "word": "birth", "begin" : "32.522", "end": "32.874"},
	{ "id" : 97, "word": "And", "begin" : "33.972", "end": "34.105"},
	{ "id" : 98, "word": "she", "begin" : "34.105", "end": "34.318"},
	{ "id" : 99, "word": "gave", "begin" : "34.318", "end": "34.595"},
	{ "id" : 100, "word": "birth", "begin" : "34.596", "end": "34.849"},
	{ "id" : 101, "word": "to", "begin" : "34.888", "end": "34.957"},
	{ "id" : 102, "word": "her", "begin" : "34.957", "end": "35.128"},
	{ "id" : 103, "word": "firstborn", "begin" : "35.128", "end": "35.73"},
	{ "id" : 104, "word": "son", "begin" : "35.73", "end": "36.29"},
	{ "id" : 105, "word": "and", "begin" : "36.491", "end": "36.657"},
	{ "id" : 106, "word": "wrapped", "begin" : "36.657", "end": "36.999"},
	{ "id" : 107, "word": "him", "begin" : "36.998", "end": "37.151"},
	{ "id" : 108, "word": "in", "begin" : "37.152", "end": "37.271"},
	{ "id" : 109, "word": "swaddling", "begin" : "37.271", "end": "37.821"},
	{ "id" : 110, "word": "cloths", "begin" : "37.82", "end": "38.362"},
	{ "id" : 111, "word": "and", "begin" : "38.644", "end": "38.798"},
	{ "id" : 112, "word": "laid", "begin" : "38.798", "end": "39.085"},
	{ "id" : 113, "word": "him", "begin" : "39.085", "end": "39.261"},
	{ "id" : 114, "word": "in", "begin" : "39.261", "end": "39.348"},
	{ "id" : 115, "word": "a", "begin" : "39.348", "end": "39.44"},
	{ "id" : 116, "word": "manger", "begin" : "39.44", "end": "40.044"},
	{ "id" : 117, "word": "because", "begin" : "40.182", "end": "40.459"},
	{ "id" : 118, "word": "there", "begin" : "40.46", "end": "40.591"},
	{ "id" : 119, "word": "was", "begin" : "40.591", "end": "40.742"},
	{ "id" : 120, "word": "no", "begin" : "40.742", "end": "40.955"},
	{ "id" : 121, "word": "place", "begin" : "40.975", "end": "41.287"},
	{ "id" : 122, "word": "for", "begin" : "41.287", "end": "41.408"},
	{ "id" : 123, "word": "them", "begin" : "41.408", "end": "41.566"},
	{ "id" : 124, "word": "in", "begin" : "41.566", "end": "41.682"},
	{ "id" : 125, "word": "the", "begin" : "41.683", "end": "41.794"},
	{ "id" : 126, "word": "inn", "begin" : "41.794", "end": "42.2"},
	{ "id" : 127, "word": "And", "begin" : "43.166", "end": "43.31"},
	{ "id" : 128, "word": "in", "begin" : "43.309", "end": "43.398"},
	{ "id" : 129, "word": "the", "begin" : "43.398", "end": "43.5"},
	{ "id" : 130, "word": "same", "begin" : "43.5", "end": "43.829"},
	{ "id" : 131, "word": "region", "begin" : "43.829", "end": "44.235"},
	{ "id" : 132, "word": "there", "begin" : "44.236", "end": "44.382"},
	{ "id" : 133, "word": "were", "begin" : "44.382", "end": "44.464"},
	{ "id" : 134, "word": "shepherds", "begin" : "44.463", "end": "44.958"},
	{ "id" : 135, "word": "out", "begin" : "44.959", "end": "45.113"},
	{ "id" : 136, "word": "in", "begin" : "45.112", "end": "45.216"},
	{ "id" : 137, "word": "the", "begin" : "45.216", "end": "45.31"},
	{ "id" : 138, "word": "field", "begin" : "45.311", "end": "45.872"},
	{ "id" : 139, "word": "keeping", "begin" : "45.954", "end": "46.249"},
	{ "id" : 140, "word": "watch", "begin" : "46.249", "end": "46.583"},
	{ "id" : 141, "word": "over", "begin" : "46.583", "end": "46.756"},
	{ "id" : 142, "word": "their", "begin" : "46.756", "end": "46.863"},
	{ "id" : 143, "word": "flock", "begin" : "46.863", "end": "47.264"},
	{ "id" : 144, "word": "by", "begin" : "47.264", "end": "47.388"},
	{ "id" : 145, "word": "night", "begin" : "47.388", "end": "47.762"},
	{ "id" : 146, "word": "And", "begin" : "48.751", "end": "48.895"},
	{ "id" : 147, "word": "an", "begin" : "48.895", "end": "49.071"},
	{ "id" : 148, "word": "angel", "begin" : "49.071", "end": "49.48"},
	{ "id" : 149, "word": "of", "begin" : "49.479", "end": "49.588"},
	{ "id" : 150, "word": "the", "begin" : "49.588", "end": "49.722"},
	{ "id" : 151, "word": "Lord", "begin" : "49.722", "end": "49.955"},
	{ "id" : 152, "word": "appeared", "begin" : "49.955", "end": "50.446"},
	{ "id" : 153, "word": "to", "begin" : "50.446", "end": "50.553"},
	{ "id" : 154, "word": "them", "begin" : "50.553", "end": "50.863"},
	{ "id" : 155, "word": "and", "begin" : "51.164", "end": "51.29"},
	{ "id" : 156, "word": "the", "begin" : "51.29", "end": "51.476"},
	{ "id" : 157, "word": "glory", "begin" : "51.476", "end": "51.966"},
	{ "id" : 158, "word": "of", "begin" : "51.967", "end": "52.096"},
	{ "id" : 159, "word": "the", "begin" : "52.095", "end": "52.187"},
	{ "id" : 160, "word": "Lord", "begin" : "52.187", "end": "52.548"},
	{ "id" : 161, "word": "shone", "begin" : "52.548", "end": "52.957"},
	{ "id" : 162, "word": "around", "begin" : "52.957", "end": "53.393"},
	{ "id" : 163, "word": "them", "begin" : "53.393", "end": "53.623"},
	{ "id" : 164, "word": "and", "begin" : "53.899", "end": "54.001"},
	{ "id" : 165, "word": "they", "begin" : "54.001", "end": "54.085"},
	{ "id" : 166, "word": "were", "begin" : "54.085", "end": "54.177"},
	{ "id" : 167, "word": "filled", "begin" : "54.177", "end": "54.578"},
	{ "id" : 168, "word": "with", "begin" : "54.578", "end": "54.878"},
	{ "id" : 169, "word": "fear", "begin" : "54.878", "end": "55.359"},
	{ "id" : 170, "word": "And", "begin" : "55.998", "end": "56.105"},
	{ "id" : 171, "word": "the", "begin" : "56.104", "end": "56.213"},
	{ "id" : 172, "word": "angel", "begin" : "56.213", "end": "56.565"},
	{ "id" : 173, "word": "said", "begin" : "56.565", "end": "56.795"},
	{ "id" : 174, "word": "to", "begin" : "56.795", "end": "56.897"},
	{ "id" : 175, "word": "them", "begin" : "56.897", "end": "57.145"},
	{ "id" : 176, "word": "Fear", "begin" : "57.858", "end": "58.185"},
	{ "id" : 177, "word": "not", "begin" : "58.185", "end": "58.566"},
	{ "id" : 178, "word": "for", "begin" : "58.767", "end": "58.883"},
	{ "id" : 179, "word": "behold", "begin" : "58.883", "end": "59.586"},
	{ "id" : 180, "word": "I", "begin" : "60.051", "end": "60.323"},
	{ "id" : 181, "word": "bring", "begin" : "60.323", "end": "60.511"},
	{ "id" : 182, "word": "you", "begin" : "60.512", "end": "60.75"},
	{ "id" : 183, "word": "good", "begin" : "60.75", "end": "60.998"},
	{ "id" : 184, "word": "news", "begin" : "60.998", "end": "61.591"},
	{ "id" : 185, "word": "of", "begin" : "61.749", "end": "61.927"},
	{ "id" : 186, "word": "great", "begin" : "61.927", "end": "62.299"},
	{ "id" : 187, "word": "joy", "begin" : "62.299", "end": "62.921"},
	{ "id" : 188, "word": "that", "begin" : "63.247", "end": "63.361"},
	{ "id" : 189, "word": "will", "begin" : "63.361", "end": "63.532"},
	{ "id" : 190, "word": "be", "begin" : "63.532", "end": "63.701"},
	{ "id" : 191, "word": "for", "begin" : "63.701", "end": "63.852"},
	{ "id" : 192, "word": "all", "begin" : "63.852", "end": "64.167"},
	{ "id" : 193, "word": "the", "begin" : "64.167", "end": "64.316"},
	{ "id" : 194, "word": "people", "begin" : "64.316", "end": "64.797"},
	{ "id" : 195, "word": "For", "begin" : "65.384", "end": "65.55"},
	{ "id" : 196, "word": "unto", "begin" : "65.55", "end": "65.867"},
	{ "id" : 197, "word": "you", "begin" : "65.867", "end": "65.988"},
	{ "id" : 198, "word": "is", "begin" : "65.988", "end": "66.161"},
	{ "id" : 199, "word": "born", "begin" : "66.162", "end": "66.449"},
	{ "id" : 200, "word": "this", "begin" : "66.449", "end": "66.751"},
	{ "id" : 201, "word": "day", "begin" : "66.751", "end": "67.067"},
	{ "id" : 202, "word": "in", "begin" : "67.067", "end": "67.141"},
	{ "id" : 203, "word": "the", "begin" : "67.142", "end": "67.211"},
	{ "id" : 204, "word": "city", "begin" : "67.211", "end": "67.491"},
	{ "id" : 205, "word": "of", "begin" : "67.491", "end": "67.664"},
	{ "id" : 206, "word": "David", "begin" : "67.664", "end": "68.125"},
	{ "id" : 207, "word": "a", "begin" : "68.34", "end": "68.427"},
	{ "id" : 208, "word": "Savior", "begin" : "68.426", "end": "69.115"},
	{ "id" : 209, "word": "who", "begin" : "69.353", "end": "69.479"},
	{ "id" : 210, "word": "is", "begin" : "69.479", "end": "69.663"},
	{ "id" : 211, "word": "Christ", "begin" : "69.663", "end": "70.074"},
	{ "id" : 212, "word": "the", "begin" : "70.075", "end": "70.221"},
	{ "id" : 213, "word": "Lord", "begin" : "70.22", "end": "70.748"},
	{ "id" : 214, "word": "And", "begin" : "71.32", "end": "71.493"},
	{ "id" : 215, "word": "this", "begin" : "71.493", "end": "71.684"},
	{ "id" : 216, "word": "will", "begin" : "71.684", "end": "71.815"},
	{ "id" : 217, "word": "be", "begin" : "71.815", "end": "71.919"},
	{ "id" : 218, "word": "a", "begin" : "71.919", "end": "71.954"},
	{ "id" : 219, "word": "sign", "begin" : "71.954", "end": "72.415"},
	{ "id" : 220, "word": "for", "begin" : "72.415", "end": "72.577"},
	{ "id" : 221, "word": "you", "begin" : "72.577", "end": "73.013"},
	{ "id" : 222, "word": "you", "begin" : "73.352", "end": "73.471"},
	{ "id" : 223, "word": "will", "begin" : "73.471", "end": "73.565"},
	{ "id" : 224, "word": "find", "begin" : "73.565", "end": "73.964"},
	{ "id" : 225, "word": "a", "begin" : "73.963", "end": "74.104"},
	{ "id" : 226, "word": "baby", "begin" : "74.105", "end": "74.568"},
	{ "id" : 227, "word": "wrapped", "begin" : "74.818", "end": "75.234"},
	{ "id" : 228, "word": "in", "begin" : "75.234", "end": "75.38"},
	{ "id" : 229, "word": "swaddling", "begin" : "75.381", "end": "75.983"},
	{ "id" : 230, "word": "cloths", "begin" : "75.982", "end": "76.48"},
	{ "id" : 231, "word": "and", "begin" : "76.48", "end": "76.665"},
	{ "id" : 232, "word": "lying", "begin" : "76.665", "end": "77.024"},
	{ "id" : 233, "word": "in", "begin" : "77.024", "end": "77.116"},
	{ "id" : 234, "word": "a", "begin" : "77.116", "end": "77.19"},
	{ "id" : 235, "word": "manger", "begin" : "77.19", "end": "77.807"},
	{ "id" : 236, "word": "And", "begin" : "78.542", "end": "78.703"},
	{ "id" : 237, "word": "suddenly", "begin" : "78.703", "end": "79.327"},
	{ "id" : 238, "word": "there", "begin" : "79.327", "end": "79.5"},
	{ "id" : 239, "word": "was", "begin" : "79.501", "end": "79.707"},
	{ "id" : 240, "word": "with", "begin" : "79.706", "end": "79.902"},
	{ "id" : 241, "word": "the", "begin" : "79.902", "end": "80.038"},
	{ "id" : 242, "word": "angel", "begin" : "80.038", "end": "80.516"},
	{ "id" : 243, "word": "a", "begin" : "80.516", "end": "80.675"},
	{ "id" : 244, "word": "multitude", "begin" : "80.675", "end": "81.307"},
	{ "id" : 245, "word": "of", "begin" : "81.307", "end": "81.409"},
	{ "id" : 246, "word": "the", "begin" : "81.408", "end": "81.48"},
	{ "id" : 247, "word": "heavenly", "begin" : "81.48", "end": "81.867"},
	{ "id" : 248, "word": "host", "begin" : "81.867", "end": "82.256"},
	{ "id" : 249, "word": "praising", "begin" : "82.657", "end": "83.127"},
	{ "id" : 250, "word": "God", "begin" : "83.126", "end": "83.475"},
	{ "id" : 251, "word": "and", "begin" : "83.475", "end": "83.566"},
	{ "id" : 252, "word": "saying", "begin" : "83.566", "end": "84.074"},
	{ "id" : 253, "word": "Glory", "begin" : "84.905", "end": "85.413"},
	{ "id" : 254, "word": "to", "begin" : "85.413", "end": "85.591"},
	{ "id" : 255, "word": "God", "begin" : "85.591", "end": "85.943"},
	{ "id" : 256, "word": "in", "begin" : "85.943", "end": "86.022"},
	{ "id" : 257, "word": "the", "begin" : "86.022", "end": "86.079"},
	{ "id" : 258, "word": "highest", "begin" : "86.079", "end": "86.659"},
	{ "id" : 259, "word": "and", "begin" : "87.058", "end": "87.224"},
	{ "id" : 260, "word": "on", "begin" : "87.224", "end": "87.404"},
	{ "id" : 261, "word": "earth", "begin" : "87.404", "end": "87.789"},
	{ "id" : 262, "word": "peace", "begin" : "88.025", "end": "88.363"},
	{ "id" : 263, "word": "among", "begin" : "88.363", "end": "88.634"},
	{ "id" : 264, "word": "those", "begin" : "88.634", "end": "88.948"},
	{ "id" : 265, "word": "with", "begin" : "88.948", "end": "89.113"},
	{ "id" : 266, "word": "whom", "begin" : "89.113", "end": "89.31"},
	{ "id" : 267, "word": "he", "begin" : "89.31", "end": "89.466"},
	{ "id" : 268, "word": "is", "begin" : "89.466", "end": "89.626"},
	{ "id" : 269, "word": "pleased", "begin" : "89.626", "end": "90.341"},
	{ "id" : 270, "word": "When", "begin" : "91.824", "end": "91.969"},
	{ "id" : 271, "word": "the", "begin" : "91.969", "end": "92.086"},
	{ "id" : 272, "word": "angels", "begin" : "92.086", "end": "92.482"},
	{ "id" : 273, "word": "went", "begin" : "92.482", "end": "92.64"},
	{ "id" : 274, "word": "away", "begin" : "92.64", "end": "92.896"},
	{ "id" : 275, "word": "from", "begin" : "92.896", "end": "93.111"},
	{ "id" : 276, "word": "them", "begin" : "93.112", "end": "93.3"},
	{ "id" : 277, "word": "into", "begin" : "93.3", "end": "93.569"},
	{ "id" : 278, "word": "heaven", "begin" : "93.569", "end": "94.028"},
	{ "id" : 279, "word": "the", "begin" : "94.204", "end": "94.269"},
	{ "id" : 280, "word": "shepherds", "begin" : "94.269", "end": "94.758"},
	{ "id" : 281, "word": "said", "begin" : "94.758", "end": "94.994"},
	{ "id" : 282, "word": "to", "begin" : "94.994", "end": "95.098"},
	{ "id" : 283, "word": "one", "begin" : "95.098", "end": "95.226"},
	{ "id" : 284, "word": "another", "begin" : "95.226", "end": "95.709"},
	{ "id" : 285, "word": "Let", "begin" : "96.508", "end": "96.644"},
	{ "id" : 286, "word": "us", "begin" : "96.644", "end": "96.82"},
	{ "id" : 287, "word": "go", "begin" : "96.82", "end": "96.959"},
	{ "id" : 288, "word": "over", "begin" : "96.959", "end": "97.124"},
	{ "id" : 289, "word": "to", "begin" : "97.124", "end": "97.28"},
	{ "id" : 290, "word": "Bethlehem", "begin" : "97.281", "end": "97.76"},
	{ "id" : 291, "word": "and", "begin" : "97.76", "end": "97.84"},
	{ "id" : 292, "word": "see", "begin" : "97.84", "end": "98.152"},
	{ "id" : 293, "word": "this", "begin" : "98.152", "end": "98.462"},
	{ "id" : 294, "word": "thing", "begin" : "98.462", "end": "98.715"},
	{ "id" : 295, "word": "that", "begin" : "98.715", "end": "98.808"},
	{ "id" : 296, "word": "has", "begin" : "98.808", "end": "98.942"},
	{ "id" : 297, "word": "happened", "begin" : "98.942", "end": "99.458"},
	{ "id" : 298, "word": "which", "begin" : "99.642", "end": "99.85"},
	{ "id" : 299, "word": "the", "begin" : "99.85", "end": "99.963"},
	{ "id" : 300, "word": "Lord", "begin" : "99.964", "end": "100.204"},
	{ "id" : 301, "word": "has", "begin" : "100.203", "end": "100.333"},
	{ "id" : 302, "word": "made", "begin" : "100.333", "end": "100.558"},
	{ "id" : 303, "word": "known", "begin" : "100.558", "end": "100.839"},
	{ "id" : 304, "word": "to", "begin" : "100.839", "end": "100.924"},
	{ "id" : 305, "word": "us", "begin" : "100.924", "end": "101.277"},
	{ "id" : 306, "word": "And", "begin" : "101.996", "end": "102.124"},
	{ "id" : 307, "word": "they", "begin" : "102.124", "end": "102.293"},
	{ "id" : 308, "word": "went", "begin" : "102.293", "end": "102.572"},
	{ "id" : 309, "word": "with", "begin" : "102.572", "end": "102.702"},
	{ "id" : 310, "word": "haste", "begin" : "102.702", "end": "103.168"},
	{ "id" : 311, "word": "and", "begin" : "103.168", "end": "103.285"},
	{ "id" : 312, "word": "found", "begin" : "103.285", "end": "103.644"},
	{ "id" : 313, "word": "Mary", "begin" : "103.644", "end": "103.999"},
	{ "id" : 314, "word": "and", "begin" : "103.999", "end": "104.168"},
	{ "id" : 315, "word": "Joseph", "begin" : "104.168", "end": "104.584"},
	{ "id" : 316, "word": "and", "begin" : "104.584", "end": "104.716"},
	{ "id" : 317, "word": "the", "begin" : "104.716", "end": "104.855"},
	{ "id" : 318, "word": "baby", "begin" : "104.855", "end": "105.193"},
	{ "id" : 319, "word": "lying", "begin" : "105.193", "end": "105.55"},
	{ "id" : 320, "word": "in", "begin" : "105.55", "end": "105.606"},
	{ "id" : 321, "word": "a", "begin" : "105.606", "end": "105.664"},
	{ "id" : 322, "word": "manger", "begin" : "105.664", "end": "106.231"},
	{ "id" : 323, "word": "And", "begin" : "107.011", "end": "107.184"},
	{ "id" : 324, "word": "when", "begin" : "107.184", "end": "107.383"},
	{ "id" : 325, "word": "they", "begin" : "107.382", "end": "107.503"},
	{ "id" : 326, "word": "saw", "begin" : "107.503", "end": "107.849"},
	{ "id" : 327, "word": "it", "begin" : "107.849", "end": "108.085"},
	{ "id" : 328, "word": "they", "begin" : "108.382", "end": "108.534"},
	{ "id" : 329, "word": "made", "begin" : "108.534", "end": "108.744"},
	{ "id" : 330, "word": "known", "begin" : "108.744", "end": "109.117"},
	{ "id" : 331, "word": "the", "begin" : "109.117", "end": "109.188"},
	{ "id" : 332, "word": "saying", "begin" : "109.188", "end": "109.612"},
	{ "id" : 333, "word": "that", "begin" : "109.611", "end": "109.713"},
	{ "id" : 334, "word": "had", "begin" : "109.714", "end": "109.848"},
	{ "id" : 335, "word": "been", "begin" : "109.848", "end": "110.037"},
	{ "id" : 336, "word": "told", "begin" : "110.037", "end": "110.41"},
	{ "id" : 337, "word": "them", "begin" : "110.411", "end": "110.591"},
	{ "id" : 338, "word": "concerning", "begin" : "110.591", "end": "111.093"},
	{ "id" : 339, "word": "this", "begin" : "111.092", "end": "111.228"},
	{ "id" : 340, "word": "child", "begin" : "111.228", "end": "111.912"},
	{ "id" : 341, "word": "And", "begin" : "112.668", "end": "112.82"},
	{ "id" : 342, "word": "all", "begin" : "112.82", "end": "113.156"},
	{ "id" : 343, "word": "who", "begin" : "113.157", "end": "113.294"},
	{ "id" : 344, "word": "heard", "begin" : "113.294", "end": "113.565"},
	{ "id" : 345, "word": "it", "begin" : "113.565", "end": "113.827"},
	{ "id" : 346, "word": "wondered", "begin" : "113.827", "end": "114.273"},
	{ "id" : 347, "word": "at", "begin" : "114.273", "end": "114.386"},
	{ "id" : 348, "word": "what", "begin" : "114.387", "end": "114.563"},
	{ "id" : 349, "word": "the", "begin" : "114.563", "end": "114.641"},
	{ "id" : 350, "word": "shepherds", "begin" : "114.641", "end": "115.146"},
	{ "id" : 351, "word": "told", "begin" : "115.147", "end": "115.492"},
	{ "id" : 352, "word": "them", "begin" : "115.492", "end": "115.81"},
	{ "id" : 353, "word": "But", "begin" : "116.538", "end": "116.726"},
	{ "id" : 354, "word": "Mary", "begin" : "116.726", "end": "117.202"},
	{ "id" : 355, "word": "treasured", "begin" : "117.201", "end": "117.572"},
	{ "id" : 356, "word": "up", "begin" : "117.572", "end": "117.732"},
	{ "id" : 357, "word": "all", "begin" : "117.731", "end": "117.972"},
	{ "id" : 358, "word": "these", "begin" : "117.973", "end": "118.255"},
	{ "id" : 359, "word": "things", "begin" : "118.254", "end": "118.787"},
	{ "id" : 360, "word": "pondering", "begin" : "119.178", "end": "119.715"},
	{ "id" : 361, "word": "them", "begin" : "119.715", "end": "119.854"},
	{ "id" : 362, "word": "in", "begin" : "119.854", "end": "119.952"},
	{ "id" : 363, "word": "her", "begin" : "119.952", "end": "120.132"},
	{ "id" : 364, "word": "heart", "begin" : "120.133", "end": "120.661"},
	{ "id" : 365, "word": "And", "begin" : "121.551", "end": "121.636"},
	{ "id" : 366, "word": "the", "begin" : "121.636", "end": "121.707"},
	{ "id" : 367, "word": "shepherds", "begin" : "121.707", "end": "122.136"},
	{ "id" : 368, "word": "returned", "begin" : "122.136", "end": "122.795"},
	{ "id" : 369, "word": "glorifying", "begin" : "123.144", "end": "123.893"},
	{ "id" : 370, "word": "and", "begin" : "123.893", "end": "124.151"},
	{ "id" : 371, "word": "praising", "begin" : "124.151", "end": "124.714"},
	{ "id" : 372, "word": "God", "begin" : "124.715", "end": "125.092"},
	{ "id" : 373, "word": "for", "begin" : "125.092", "end": "125.339"},
	{ "id" : 374, "word": "all", "begin" : "125.339", "end": "125.556"},
	{ "id" : 375, "word": "they", "begin" : "125.556", "end": "125.723"},
	{ "id" : 376, "word": "had", "begin" : "125.723", "end": "125.92"},
	{ "id" : 377, "word": "heard", "begin" : "125.92", "end": "126.249"},
	{ "id" : 378, "word": "and", "begin" : "126.249", "end": "126.368"},
	{ "id" : 379, "word": "seen", "begin" : "126.368", "end": "126.959"},
	{ "id" : 380, "word": "as", "begin" : "127.239", "end": "127.393"},
	{ "id" : 381, "word": "it", "begin" : "127.394", "end": "127.467"},
	{ "id" : 382, "word": "had", "begin" : "127.467", "end": "127.64"},
	{ "id" : 383, "word": "been", "begin" : "127.641", "end": "127.815"},
	{ "id" : 384, "word": "told", "begin" : "127.815", "end": "128.125"},
	{ "id" : 385, "word": "them", "begin" : "128.125", "end": "128.374"}
]
export default MainScreen
