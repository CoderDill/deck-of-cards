import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [draw, setDraw] = useState([]);
  // const timer = useRef();

  useEffect(() => {
    async function getData() {
      let d = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(d.data);
    }
    getData();
  }, [setDeck]);

  useEffect(() => {
    async function getCard() {
      let { deck_id } = deck;

      try {
        let drawResult = await axios.get(`${BASE_URL}/${deck_id}/draw/`);

        if (drawResult.data.remaining === 0) {
          throw new Error("no cards remaining!");
        }

        const card = drawResult.data.cards[0];

        setDraw((c) => [
          ...c,
          {
            id: card.code,
            name: card.value + " of " + card.suit,
            image: card.image,
          },
        ]);
      } catch (err) {
        alert(err);
      }
    }
    getCard();
  }, [deck]);

  const cards = draw.map((c) => <Card name={c.name} image={c.image} />);
  
  return (
    <>
      {deck ? <button onClick={setDraw}>Gimme a Card!</button> : null}
      <div>{cards}</div>
    </>
  );
};

export default Deck;
