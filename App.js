import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import quizData from './quizData';

export default function App() {

  const [currentQuestion, setCurrentQuestion] = useState (0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswer = (selectedAnswer) => {
      const answer = quizData[currentQuestion]?.answer;
      if (answer === selectedAnswer) {
        setScore((prevScore) => prevScore + 1);
        alert('Great Job!')
      } if (answer !== selectedAnswer){
        setScore((prevScore) => prevScore + 1);
        alert("Oops! that's not good enough")
      }
      const nextQuestion = currentQuestion + 1 ;
      if(nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }
  
    const handleRestart = () => {
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
    }

  return (
    <View style={styles.container}>

      <Text style={styles.textH1} >Know Your Bible</Text>

      {showScore ? <View>
        <Text style={styles.optionStyle}> Score: {score} out of {quizData.length} </Text>
        <TouchableOpacity style={styles.optionContainer} onPress={handleRestart}>
          <Text style={styles.resetBtnText}>Re-take Quiz</Text>
        </TouchableOpacity>
         </View> :
      <View style={styles.questionContainer} key={quizData.id}>
        <Text style={styles.textH2} >Where in the Bible is:</Text>
          <Text style={styles.questionText} >"{quizData[currentQuestion]?.question}"</Text>
          {quizData[currentQuestion]?.options.map((item) => {
            return <TouchableOpacity onPress={()=>handleAnswer(item)} style={styles.optionContainer}>
              <Text style={styles.optionStyle} > {item} </Text>
            </TouchableOpacity>
          } ) }
          
      </View>
      

    }  
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6495ed',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  questionContainer: {
    backgroundColor: '#00bfff',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  optionStyle : {
    color: '#2f4f4f',
    padding: 1,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  optionContainer: {
    borderColor: 'black',
    borderWidth: 2,
    margin: 10,
  },
  questionText: {
      fontSize: 20,
  },
  resetBtnText : {
    fontSize: 18,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5
  },
  textH2 : {
    fontSize: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  textH1 : {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'blue',
    paddingBottom: 3
  }
});
