import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState([]);
  // const timer = useRef();
  
  useEffect(() => {
    async function getData() {
      let d = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(d.data);
    }
    getData();
  }, [setDeck]);
  console.log(deck.data.deck_id);


  return (
    <>
      <h3>{card}</h3>
      <button>Gimme a Card!</button>
      <Card />
    </>
  );
};

export default Deck;
