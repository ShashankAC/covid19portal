import React from 'react'
import styles from './App.module.css';
import Header from '../src/components/Header/Header'
import CountBox from './components/CountBox/CountBox'
import Navbar from './components/Navbar/Navbar'
import MainContent from './containers/MainContent/MainContent'

function App() {
  return (
    <div className={styles.App}>
      <Header className={styles.AppHeader}/>
      <div className={styles.mainContent}>
        <Navbar />
        <MainContent />
      </div>
      
      {/* <CountBox title="States" fontWeight="bold" value="25"/> */}
    </div>
  );
}

export default App;
