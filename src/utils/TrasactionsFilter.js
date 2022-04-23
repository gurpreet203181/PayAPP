function Transaction() {
  //if search is blank
  if (searchPhrase.trim() === "") {
    setfilterData(data);
  }
  // if search is different then blank
  if (searchPhrase.trim() != "") {
    setfilterData(
      data.filter((x) =>
        x.name
          .toUpperCase()
          .startsWith(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
      )
    );
  }
}

const Filters = {
  Transaction,
};

export default Filters;
