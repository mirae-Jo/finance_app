import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Quote } from "@/app/page";

interface QuoteProps {
  state: Quote[];
}

const Main = ({ state }: QuoteProps) => {
  return (
    <div className='w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {state?.map((Quote) => (
        <Card key={Quote.name}>
          <CardHeader>
            <CardTitle>{Quote.symbol}</CardTitle>
            <CardDescription>{Quote.name}</CardDescription>
          </CardHeader>
          <CardFooter>
            <p>{Quote.price}$</p>
            <span>({Math.round(Quote.changePercent * 100) / 100}%)</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Main;
