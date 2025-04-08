import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import { getUserReservations, updateReservation } from "../firebase";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar, Clock, Users, MessageSquare } from "lucide-react";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  requests?: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  timestamp: any;
}

const MyReservations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        const userReservations = await getUserReservations(user.uid);
        // Sort by date and time
        const sortedReservations = userReservations.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateB.getTime() - dateA.getTime();
        });
        
        setReservations(sortedReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        toast({
          title: "Failed to load reservations",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReservations();
  }, [user, toast]);
  
  const openCancelDialog = (reservationId: string) => {
    setReservationToCancel(reservationId);
    setCancelDialogOpen(true);
  };
  
  const handleCancelReservation = async () => {
    if (!reservationToCancel) return;
    
    try {
      await updateReservation(reservationToCancel, {
        status: 'cancelled'
      });
      
      // Update local state
      setReservations(prevReservations => 
        prevReservations.map(reservation => 
          reservation.id === reservationToCancel 
            ? { ...reservation, status: 'cancelled' } 
            : reservation
        )
      );
      
      toast({
        title: "Reservation cancelled",
        description: "Your reservation has been successfully cancelled.",
      });
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toast({
        title: "Failed to cancel reservation",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setCancelDialogOpen(false);
      setReservationToCancel(null);
    }
  };
  
  const formatReservationDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch (e) {
      return dateString;
    }
  };
  
  // Check if user is logged in
  if (!user && !isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-playfair font-bold text-gray-800 mb-4">My Reservations</h2>
          <p className="text-gray-600 mb-8">Please log in to view your reservations.</p>
          <Link href="/#reservations">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
              Go to Reservations
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">My Reservations</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">View and manage your upcoming dining experiences</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You don't have any reservations yet.</p>
            <Link href="/#reservations">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Make a Reservation
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="overflow-hidden">
                <CardHeader className={`py-4 px-6 ${
                  reservation.status === 'confirmed' ? 'bg-amber-500 text-white' : 
                  reservation.status === 'cancelled' ? 'bg-gray-700 text-white' :
                  'bg-green-700 text-white'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-playfair font-bold">
                      {reservation.status === 'confirmed' ? 'Upcoming Reservation' : 
                       reservation.status === 'cancelled' ? 'Cancelled Reservation' :
                       'Past Reservation'}
                    </h3>
                    <span className="bg-white text-sm py-1 px-3 rounded-full font-medium 
                      ${reservation.status === 'confirmed' ? 'text-amber-500' : 
                        reservation.status === 'cancelled' ? 'text-gray-700' :
                        'text-green-700'}
                    ">
                      {reservation.status === 'confirmed' ? 'Confirmed' : 
                       reservation.status === 'cancelled' ? 'Cancelled' : 
                       'Completed'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className={`mr-3 ${
                        reservation.status === 'cancelled' ? 'text-gray-500' : 'text-amber-500'
                      }`} />
                      <div>
                        <p className="text-sm text-gray-600">Date & Time</p>
                        <p className="text-gray-800 font-medium">
                          {formatReservationDate(reservation.date)} • {reservation.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className={`mr-3 ${
                        reservation.status === 'cancelled' ? 'text-gray-500' : 'text-amber-500'
                      }`} />
                      <div>
                        <p className="text-sm text-gray-600">Number of Guests</p>
                        <p className="text-gray-800 font-medium">
                          {reservation.guests} {reservation.guests === 1 ? 'Person' : 'People'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MessageSquare className={`mr-3 ${
                        reservation.status === 'cancelled' ? 'text-gray-500' : 'text-amber-500'
                      }`} />
                      <div>
                        <p className="text-sm text-gray-600">Special Requests</p>
                        <p className="text-gray-800 font-medium">
                          {reservation.requests || 'None'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  {reservation.status === 'confirmed' && (
                    <div className="flex space-x-2 w-full">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-green-700 text-green-700 hover:bg-green-50"
                        disabled
                      >
                        Modify
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => openCancelDialog(reservation.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                  
                  {reservation.status === 'cancelled' && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = '/#reservations'}
                    >
                      Book Again
                    </Button>
                  )}
                  
                  {reservation.status === 'completed' && (
                    <Button 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={() => window.location.href = '/#reservations'}
                    >
                      Book Again
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Cancellation Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your reservation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Reservation</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelReservation}
              className="bg-red-700 hover:bg-red-800"
            >
              Yes, Cancel Reservation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyReservations;
