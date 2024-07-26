import heroImage1 from "@/public/images/hero1.jpg";
import heroImage2 from "@/public/images/hero2.jpg";
import heroImage3 from "@/public/images/hero3.jpg";
import heroImage4 from "@/public/images/hero4.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const carouselImages = [heroImage1, heroImage2, heroImage3, heroImage4];

function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card className="bg-muted">
                  <CardContent className="flex items-center justify-center p-3">
                    <Image
                      src={image}
                      alt={`hero ${index}`}
                      priority
                      className="object-cover w-full h-96 rounded-lg"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
export default HeroCarousel;
