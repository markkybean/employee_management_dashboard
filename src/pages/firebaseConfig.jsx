import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

        //firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyCFtkSfvx9RxeHFWfYWN9C_cDi0966jKtI",
          authDomain: "employeerecords-7765c.firebaseapp.com",
          projectId: "employeerecords-7765c",
          storageBucket: "employeerecords-7765c.appspot.com",
          messagingSenderId: "931836782510",
          appId: "1:931836782510:web:97d821dbd50c22c06a4a3f",
          measurementId: "G-40Q2TPWDJB"
        };

        //initialize firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);

        export default app;