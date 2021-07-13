import React, { useState, useEffect } from 'react';

import Container from '../../components/Container';
import SearchBar from '../../components/SearchBar';
import FallbackScreen from '../../components/FallbackScreen';

const Search = ({navigation}) => {
  // const [query, setQuery] = useState('');

  useEffect(() => {
    navigation.setOptions({
      searchBar: {
        onChangeText: (event) => console.log(event.nativeEvent.text),
        // search bar options
      }
    })
  }, [navigation]);

  return (
    <Container scrollEnabled>
      {/* TODO use search box from react-native-screens (iOS) */}
      {/* <SearchBar
        value={query}
        placeholder="Search..."
        onChangeText={setQuery} // TODO
      /> */}

      <FallbackScreen
        title="Search for data"
        message="Type what are you looking for"
      />
    </Container>
  );
};

export default Search;
