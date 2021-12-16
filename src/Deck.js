import { useState, useEffect, useRef } from "react";
import axios from "axios";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState([]);
  const timer = useRef();

  // useEffect(() => {
  //   axios.get(`${BASE_URL}/new`).then((res) => setDeck(res.data));
  // }, [setDeck]);
  useEffect(() => {
    async function getData() {
      let d = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(d.data.deck_id);
    }
    getData();
  }, [setDeck]);
  console.log(deck);
  useEffect(() => {
    console.log(deck + "1");
    async function getCard() {
      console.log(deck + "2");

      let resCard = await axios.get(`${BASE_URL}/${deck}/draw/`);
      let card = resCard.data.cards[0];
      setCard(card);
    }
    timer.current = setInterval(async () => {
      await getCard();
    }, 1000);
    
  }, [card, deck]);

  return (
    <>
      <h3>{card}</h3>
      <button>Gimme a Card!</button>
    </>
  );
};

export default Deck;
