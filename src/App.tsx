import { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import SearchBar from './components/SearchBar';
import AppRouter from 'AppRouter';
import logo from "./assets/images/logo__large_plus.png";

const App = () => {  
  const [query, setQuery] = useState("");
  //const history = useHistory();
  //const params = new URLSearchParams();
  /* const history = useHistory();
  const [query, setQuery] = useState("");
  const [productList, setProductList] = useState();
  const [redirect, setRedirect] = useState(false);

  const setKeyword = (value: string) => {
    console.log("setKeyword" + value);
    setQuery(value);
    setRedirect(true);
    //const url: string = `/api/items?q=${value}`;
    //history.push(url);
  } */

  /* if (redirect) {
      return <Redirect to={`/api/items?q=${query}`} />;
  } */

  /* useEffect(() => {    
    
    
  }, [query]); */

  function keywordHandler(value: string) {
    setQuery(value);
    /* /* if (query) {
        params.append("q", query);
    } else {
        params.delete("q");
    } */
    //history.push({ search: params.toString() }); */
  }

  return (
      <Router>
          <div className="page-wrapper">
              <header className="banner h-14">
                  <div className="container mx-auto flex flex-row px-4 py-2 items-center content-between">
                      <Link to="/" className="flex-grow-0 mr-14">
                          <img src={logo} alt="logo" height="34" />
                      </Link>
                      <SearchBar keyword={query} setKeyword={keywordHandler}></SearchBar>
                  </div>
              </header>
              <main className="container mx-auto py-2">
                  <AppRouter></AppRouter>
              </main>
          </div>
      </Router>
  );
}
export default App;
