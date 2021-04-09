import { Router } from '@reach/router';
import './App.css';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import SingleArticle from './components/SingleArticle';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <main className="App">
      <NavBar className="NavBar" />
      <Router className="Content">
        <MainPage
          path="/"
          className="main-page"
          loggedIn={true}
          username="tickle122"
        />
        <MainPage
          path="/:topic"
          className="maine-page"
          loggedIn={true}
          username="tickle122"
        />
        <SingleArticle
          path="/articles/:article_id"
          className="SingleArticle"
          loggedIn={true}
          username="tickle122"
        />
        <ErrorPage default status={404} msg={'Oh heck nothing here'} />
      </Router>
    </main>
  );
}

export default App;
