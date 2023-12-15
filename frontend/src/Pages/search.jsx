import "../Components/Navbar";
import Navbar from "../Components/Navbar";
import '../styles/search.css'

const Search = () => {
  return (
    <>
      <Navbar />
      <div className="input-main">
        <label>
          Search here
        </label>
        <input className="search-bar" placeholder="Search here" />
      </div>
    </>
  );
};

export default Search;
