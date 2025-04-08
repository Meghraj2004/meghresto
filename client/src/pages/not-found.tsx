import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] w-full flex items-center justify-center bg-dark">
      <Card className="w-full max-w-md mx-4 shadow-gold bg-darker border-gold">
        <CardContent className="pt-10 pb-8 px-6">
          <div className="flex flex-col items-center text-center mb-6">
            <ChefHat className="h-16 w-16 text-gold mb-4" />
            <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Oops! Page Not Found</h1>
            <div className="w-16 h-1 bg-accent-color mb-4"></div>
            <p className="text-lg text-text-secondary mb-6">
              The culinary delight you're looking for seems to have wandered off our menu.
            </p>
            
            <Link href="/">
              <Button className="bg-primary hover:bg-secondary-color text-white px-6 py-2 rounded-md flex items-center gap-2 transition-all">
                <Home className="h-4 w-4" />
                <span>Back to Homepage</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
