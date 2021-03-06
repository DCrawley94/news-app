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
      <NavBar loggedIn={true} username="tickle122" />
      <Router className="content">
        <MainPage path="/" className="main-page" />
        <MainPage path="/articles/:topic" className="main-page" />
        <SingleArticle
          path="/articles/article/:article_id"
          className="SingleArticle"
          loggedIn={true}
          loggedInUser="tickle122"
        />
        <User path="/user/:username" loggedIn={true} loggedInUser="tickle122" />
        <ErrorPage default status={404} msg={'Oh heck, theres nothing here!'} />
      </Router>
    </main>
  );
}

export default App;
