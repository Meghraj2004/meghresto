import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "../context/AuthContext";
import { saveReservation } from "../firebase";
import { useToast } from "@/hooks/use-toast";
import Auth from "./Auth";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Reservation form schema
const reservationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  date: z.date({ required_error: "Please select a date for your reservation." }),
  time: z.string({ required_error: "Please select a time for your reservation." }),
  guests: z.string({ required_error: "Please select the number of guests." }),
  requests: z.string().optional(),
  terms: z.boolean().refine(value => value === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const ReservationForm = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Define available time slots
  const timeSlots = [
    "12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
  ];
  
  // Define available guest options
  const guestOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      requests: "",
      terms: false,
    },
  });
  
  // Function to send email confirmation
  const sendEmailConfirmation = async (data: ReservationFormValues) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "e99b466d-e31a-4dfe-9e20-188a24f69b8c",
          subject: "✅ New Reservation Confirmed - MeghResto",
          from_name: "MeghResto Reservation System",
          to_name: data.name,
          name: data.name,
          email: data.email,
          message: `<div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E6D9B8; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #B8860B; margin-bottom: 5px;">Reservation Confirmed!</h1>
              <p style="color: #5A5A5A; font-size: 16px;">Thank you for choosing MeghResto</p>
            </div>
            
            <div style="background-color: #F8F5F0; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <h2 style="color: #8B4513; border-bottom: 2px solid #E6D9B8; padding-bottom: 10px; margin-top: 0;">Reservation Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #5A5A5A; width: 40%;">Guest Name:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5A5A5A;">Email:</td>
                  <td style="padding: 8px 0;">${data.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5A5A5A;">Phone:</td>
                  <td style="padding: 8px 0;">${data.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5A5A5A;">Date:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${format(data.date, "MMMM dd, yyyy")}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5A5A5A;">Time:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${data.time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5A5A5A;">Number of Guests:</td>
                  <td style="padding: 8px 0;">${data.guests} ${parseInt(data.guests) === 1 ? 'Person' : 'People'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5A5A5A;">Special Requests:</td>
                  <td style="padding: 8px 0;">${data.requests || "None"}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #8B4513; color: white; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p style="margin: 0; text-align: center; font-size: 14px;">Please arrive 10 minutes before your scheduled time.</p>
            </div>
            
            <div style="color: #5A5A5A; font-size: 14px; margin-top: 30px; text-align: center;">
              <p>MeghResto | 123 Spice Street, Mumbai, India | +91 94216 12110</p>
              <p>We look forward to serving you the finest Indian cuisine!</p>
            </div>
          </div>`,
          botcheck: "",
          redirect: "https://web3forms.com/success",
          html: true
        }),
      });
      
      console.log("Email confirmation sent successfully");
      return true;
    } catch (error) {
      console.error("Failed to send email confirmation:", error);
      return false;
    }
  };
  
  // Mutation for saving reservation
  const mutation = useMutation({
    mutationFn: async (data: ReservationFormValues) => {
      if (!user) {
        throw new Error("You must be logged in to make a reservation");
      }
      
      // First check if the user exists in the database or create them
      const userResponse = await apiRequest<{ id: number }>("POST", "/api/users/firebase", {
        firebaseUid: user.uid,
        email: data.email,
        name: data.name,
        username: data.email.split('@')[0] // Generate a simple username from email
      });
      
      // Now save reservation using the returned user ID
      await apiRequest("POST", "/api/reservations", {
        userId: userResponse.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: format(data.date, "yyyy-MM-dd"),
        time: data.time,
        guests: parseInt(data.guests),
        requests: data.requests || "",
      });
      
      // Save the firebase reservation
      const firebaseReservationId = await saveReservation(
        user.uid,
        data.name,
        data.email,
        data.phone,
        format(data.date, "yyyy-MM-dd"),
        data.time,
        parseInt(data.guests),
        data.requests || ""
      );
      
      // Try to send confirmation email
      try {
        await sendEmailConfirmation(data);
      } catch (error) {
        console.error("Email confirmation failed:", error);
        // We don't throw here to allow reservation to complete
      }
      
      return { firebaseReservationId };
    },
    onSuccess: () => {
      toast({
        title: "Reservation Confirmed!",
        description: "We've sent you an email with your reservation details.",
      });
      form.reset();
    },
    onError: (error) => {
      console.error("Reservation error:", error);
      
      // Check if this is a Web3Forms error
      const message = error instanceof Error ? error.message : String(error);
      
      if (message.includes("email confirmation")) {
        // If it's just the email sending that failed, we can still consider the reservation successful
        // since it was stored in the database
        toast({
          title: "Reservation Confirmed!",
          description: "Your reservation is confirmed, but there was an issue sending the confirmation email. Please check your reservation details in the 'My Reservations' section.",
          variant: "default",
        });
        form.reset();
      } else {
        // It's a more serious error with the reservation itself
        toast({
          title: "Reservation Failed",
          description: message || "There was an error creating your reservation. Please try again.",
          variant: "destructive",
        });
      }
    },
  });
  
  const onSubmit = (data: ReservationFormValues) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    mutation.mutate(data);
  };
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} disabled={mutation.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} disabled={mutation.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 12345 67890" {...field} disabled={mutation.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={mutation.isPending}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={mutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Guests</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={mutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {guestOptions.map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Person' : 'People'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="requests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any dietary restrictions or special requests?" 
                    className="resize-none" 
                    {...field}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the <a href="#" className="text-amber-500 hover:underline">terms and conditions</a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>Confirm Reservation</span>
                <i className="ri-arrow-right-line ml-2"></i>
              </>
            )}
          </Button>
        </form>
      </Form>
      
      <Auth open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
};

export default ReservationForm;