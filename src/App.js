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
      <Router>
        <ArticleList path="/" className="ArticleList" />
      </Router>
    </main>
  );
}

export default App;
