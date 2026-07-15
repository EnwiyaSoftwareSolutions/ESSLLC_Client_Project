"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    // Connect your API here
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
  };

  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Hero */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Let's Build Something Great Together
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            Have a question, need a consultation, or want to discuss your next
            project? We'd love to hear from you. Our team typically responds
            within one business day.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <Card className="h-fit shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>

              <CardDescription>
                Reach out directly using the information below.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Phone className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-muted-foreground">
                    (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Mail className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">
                    hello@company.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="font-semibold">Office</p>
                  <p className="text-muted-foreground">
                    123 Business Avenue
                    <br />
                    Phoenix, AZ 85001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="font-semibold">Business Hours</p>
                  <p className="text-muted-foreground">
                    Monday – Friday
                    <br />
                    9:00 AM – 5:00 PM
                  </p>
                </div>
              </div>

              <Separator />

              <div className="rounded-xl bg-muted p-5">
                <p className="font-semibold">
                  Average Response Time
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  We usually reply to all inquiries within 24 business hours.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>

              <CardDescription>
                Complete the form below and we'll get back to you shortly.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>First Name</Label>

                    <Input
                      placeholder="John"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Last Name</Label>

                    <Input
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Email Address</Label>

                    <Input
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number</Label>

                    <Input
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>

                  <Input
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>

                  <Textarea
                    rows={7}
                    placeholder="Tell us about your project or question..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}