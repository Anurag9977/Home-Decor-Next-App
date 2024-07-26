import { Button } from "../ui/button";
import { GoHeart } from "react-icons/go";

function FavouriteToggleButton() {
  return (
    <Button variant="outline" size="icon" className="bg-background">
      <GoHeart className="text-lg" />
    </Button>
  );
}
export default FavouriteToggleButton;
