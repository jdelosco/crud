import  firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDDqn6fw_uLqSv9yhp--PmnowRT-sHTADM",
    authDomain: "crud-8042d.firebaseapp.com",
    projectId: "crud-8042d",
    storageBucket: "crud-8042d.appspot.com",
    messagingSenderId: "649630711751",
    appId: "1:649630711751:web:50e6572d44bd7e403823e2"
  }

  export  const firebaseApp = firebase.initializeApp(firebaseConfig);