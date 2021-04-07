import { Router } from '@reach/router';
import './App.css';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';
import Title from './components/Title';

function App() {
  return (
    <main className="App">
      <NavBar className="NavBar" />
      <Title className="Title" />
      <Router className="Content">
        <ArticleList path="/" className="ArticleList" />
        <ArticleList path="/:topic" className="ArticleList" />
      </Router>
    </main>
  );
}

export default App;
