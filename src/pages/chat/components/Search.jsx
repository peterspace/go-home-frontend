import styles from "./Search.module.css";
const Search = () => {
  return (
    <div className={styles.search}>
      <img
        className={styles.searchBarContainerIcon}
        alt=""
        src="/searchbarcontainer.svg"
      />
      <div className={styles.searchChild} />
    </div>
  );
};

export default Search;
