import { Router } from '@reach/router';
import './App.css';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import SingleArticle from './components/SingleArticle';
import ErrorPage from './components/ErrorPage';
import User from './components/User';

function App() {
  return (
    <main className="App">
      <NavBar className="NavBar" loggedIn={true} username="tickle122" />
      <Router className="Content">
        <MainPage
          path="/articles"
          className="main-page"
          loggedIn={true}
          username="tickle122"
        />
        <MainPage
          path="/articles/:topic"
          className="main-page"
          loggedIn={true}
          username="tickle122"
        />
        <SingleArticle
          path="/articles/article/:article_id"
          className="SingleArticle"
          loggedIn={true}
          username="tickle122"
        />
        <User path="/user/:username" loggedIn={true} username="tickle122" />
        <ErrorPage default status={404} msg={'Oh heck, theres nothing here!'} />
      </Router>
    </main>
  );
}

export default App;
