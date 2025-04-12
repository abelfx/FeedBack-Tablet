"use client";

import type React from "react";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";

export default function FeedbackForm() {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<"pending" | "reviewed" | "responded">(
    "pending"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const feedbackData = {
        rating,
        comment: feedback,
        category,
        status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "feedbacks"), feedbackData);

      toast({
        title: "Success",
        description: "Your feedback has been submitted successfully!",
      });

      setRating(null);
      setFeedback("");
      setCategory("");
      setStatus("pending");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description:
          "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Share Your Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-4">
                How would you rate your experience?
              </h3>
              <div className="flex justify-between max-w-md mx-auto">
                <RatingOption
                  emoji="😔"
                  label="Very Poor"
                  value={1}
                  selected={rating === 1}
                  onClick={() => setRating(1)}
                />
                <RatingOption
                  emoji="😕"
                  label="Poor"
                  value={2}
                  selected={rating === 2}
                  onClick={() => setRating(2)}
                />
                <RatingOption
                  emoji="🙂"
                  label="Average"
                  value={3}
                  selected={rating === 3}
                  onClick={() => setRating(3)}
                />
                <RatingOption
                  emoji="😊"
                  label="Good"
                  value={4}
                  selected={rating === 4}
                  onClick={() => setRating(4)}
                />
                <RatingOption
                  emoji="😍"
                  label="Excellent"
                  value={5}
                  selected={rating === 5}
                  onClick={() => setRating(5)}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Category</h3>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Room">Room</SelectItem>
                  <SelectItem value="Spa">Spa</SelectItem>
                  <SelectItem value="WaterPark">WaterPark</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">
                Tell us about your experience
              </h3>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="We value your feedback! Please share your thoughts, suggestions, or concerns..."
                className="min-h-[150px]"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Your feedback helps us improve our services and enhance your
                future experience.
              </p>
            </div>
          </div>

          <CardFooter className="flex justify-between mt-8 px-0">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setRating(null);
                setFeedback("");
                setCategory("");
                setStatus("pending");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-black"
              disabled={!rating || !feedback || !category || isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

interface RatingOptionProps {
  emoji: string;
  label: string;
  value: number;
  selected: boolean;
  onClick: () => void;
}

function RatingOption({
  emoji,
  label,
  value,
  selected,
  onClick,
}: RatingOptionProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        className={`text-4xl p-4 rounded-full transition-all ${
          selected
            ? "bg-amber-100 scale-110 ring-2 ring-amber-400"
            : "hover:bg-gray-100"
        }`}
      >
        {emoji}
      </button>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
