import React, { useState } from 'react';
import { useFetchCharacter } from '../api/useFetchCharacter';
import styled from 'styled-components';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Showcase = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem;
`;

const Card = styled.div`
  text-align: center;
  color: white;
  background: var(--dark);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow:
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.1),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.072),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.06),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.05),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.04),
    100px 100px 80px rgba(0, 0, 0, 0.028);

  &:hover {
    outline: 5px solid var(--pink);
  }
`;

const Name = styled.h3`
  margin-block: 1rem;
`;

const CharacterPage = () => {
  const [ inputValue, setInputValue ] = useState("");
  const [ queryValue, setQueryValue ] = useState(null);

  const [ allCharacterData, allCharactersLoading ] = useFetchCharacter({
    type: 'character',
    query: queryValue? `?name=${queryValue}` : ''
  });

  if(allCharactersLoading) return null;

  return (
    <Wrapper>
    {queryValue && <p>{`Results: ${allCharacterData.info.count}`}</p>}
      <form
        onSubmit={e => {
          e.preventDefault();
          setQueryValue(inputValue);
          }}>
      <input
        type="text"
        placeholder="search by name"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        />
      </form>

      {/* <Showcase>
        {allCharacterData.results
          .filter((character) => character.name
          .toLowerCase()
          .includes(filter.toLocaleLowerCase()))
          .map((character) => {
            return (
            <Card key={character.id}>
              <img src={character.image} alt={character.name}/>
              <Name>{character.name}</Name>
            </Card>
          );
          })
        }
      </Showcase> */}
      <Showcase>
        {allCharacterData.results.map((character) => {
          return (
            <Card key={character.id}>
              <img src={character.image} alt={character.name}/>
              <Name>{character.name}</Name>
            </Card>
          );
        })}
      </Showcase>
    </Wrapper>
  )
}

export default CharacterPage
