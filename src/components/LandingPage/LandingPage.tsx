import React, { useState } from "react";
import { AlertTriangle, Users, Calendar, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddCasualtyForm = () => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="age" className="text-right">
          Age
        </Label>
        <Input id="age" type="number" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">
          Date of Incident
        </Label>
        <Input id="date" type="date" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="location" className="text-right">
          Location
        </Label>
        <Input id="location" className="col-span-3" />
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [casualties, setCasualties] = useState(50);
  const lastUpdated = "2024-07-18";

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Here you would typically send the form data to your backend
    // For this example, we'll just increment the casualty count
    setCasualties(casualties + 1);
    // Close the dialog (you might want to add state for this)
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-2xl font-bold">
          Bangladesh Student Movement Tracker
        </h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="mb-8 border-red-500 border-2">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center">
              <AlertTriangle className="mr-2 text-red-500" />
              Student Casualties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-6xl font-bold text-red-500">{casualties}</p>
            <p className="text-xl mt-2">
              Lives lost in the ongoing student movement
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 bg-red-500 hover:bg-red-600">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Casualty Information
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Casualty Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <AddCasualtyForm />
                  <div className="flex justify-end mt-4">
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Users className="mr-2" />
                About the Movement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The student movement in Bangladesh is fighting for [brief
                description of goals]. This tracker aims to bring attention to
                the human cost of the ongoing situation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Calendar className="mr-2" />
                Last Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                This information was last updated on:{" "}
                <strong>{lastUpdated}</strong>
              </p>
              <p className="mt-2 text-sm">
                We strive to keep this data as accurate and up-to-date as
                possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-green-600 text-white p-4 mt-8">
        <p>
          &copy; 2024 Bangladesh Student Movement Tracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
