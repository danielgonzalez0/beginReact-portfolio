
import { Typography } from "../atom/Typography";
import { MemoryCard } from "./MemoryCard";
import { useMemoryContext } from "./MemoryProvider";

export const MemoryBoard = () => {
  // Memory Game - Exercise

  const { cards, handleClickedCard } = useMemoryContext()

  if (!cards) {
    return (
      <Typography variant="body2">
        An error occurs, there is no board.
      </Typography>
    );
  }

  return (
    <div className="grid grid-cols-6 grid-rows-6 w-max gap-2">
      {/* Memory Game - Exercise */}
      {cards?.map((card) => (
        <MemoryCard key={card.id} card={card} onClick={()=>handleClickedCard(card)}>
          {card.emoji}
       </MemoryCard>
      ))}
    </div>
  );
};
