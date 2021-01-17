import React from 'react'
import styles from './App.module.css';
import Header from '../src/components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import MainContent from './containers/MainContent/MainContent'

function App() {
  return (
    <div className={styles.App}>
      <Header className={styles.AppHeader}/>
      <div className={styles.mainContent}>
        <Navbar className={styles.navBar} />
        <MainContent />
      </div>
      
    </div>
  );
}

export default App;
