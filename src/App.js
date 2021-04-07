import { Router } from '@reach/router';
import './App.css';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';
import SingleArticle from './components/SingleArticle';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <main className="App">
      <NavBar className="NavBar" />
      <Router className="Content">
        <ArticleList path="/" className="ArticleList" />
        <ArticleList path="/:topic" className="ArticleList" />
        <SingleArticle path="/articles/:article_id" className="SingleArticle" />
        <ErrorPage default status={404} msg={'Oh heck nothing here'} />
      </Router>
    </main>
  );
}

export default App;
