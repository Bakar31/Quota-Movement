import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FormFieldProps, FormData } from "./AddCasualtyForm.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  className = "",
  multiple = false,
}) => (
  <div className="mb-4">
    <Label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    {type === "textarea" ? (
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`mt-1 block w-full ${className}`}
        rows={3}
      />
    ) : (
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`mt-1 block w-full ${className}`}
        multiple={multiple}
      />
    )}
  </div>
);

const AddCasualtyForm: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    fathersName: "",
    mothersName: "",
    image: null,
    permanentAddress: "",
    incidentLocation: "",
    dateOfIncident: "",
    incidentDescription: "",
    nationality: "",
    dateOfBirth: "",
    deathCertificate: "",
    nidNumber: "",
    scenePhotos: [],
    fillerName: "",
    fillerPhone: "",
    fillerInstitution: "",
    fillerAddress: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    if (type === "file" && e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      setFormData((prevData) => ({
        ...prevData,
        [id]: files ? (files.length > 1 ? Array.from(files) : files[0]) : null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/casuality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          fathersName: formData.fathersName,
          mothersName: formData.mothersName,
          image: formData.image,
          permanentAddress: formData.permanentAddress,
          incidentLocation: formData.incidentLocation,
          dateOfIncident: formData.dateOfIncident,
          incidentDescription: formData.incidentDescription,
          nationality: formData.nationality,
          dateOfBirth: formData.dateOfBirth,
          deathCertificate: formData.deathCertificate,
          nidNumber: formData.nidNumber,
          scenePhotos: formData.scenePhotos,
          fillerName: formData.fillerName,
          fillerPhone: formData.fillerPhone,
          fillerInstitution: formData.fillerInstitution,
          fillerAddress: formData.fillerAddress,
        }),
      });

      if (response.ok) {
        // const agent = await response.json();
        // setAgents([...agents, agent]);
        // setEditAgentId(undefined);
        // setEditAgentName("");
        // setEditAgentInstructions("");
        // setAgentDescription("");
        // setIsCreating(false);
        // setShowModal(false);
      } else {
        console.error("An error occurred:", await response.text());
      }
    } catch (error) {
      console.error("Failed to fetch Agent:", error);
    }
    console.log(formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/casualty-added");
  };

  const isTabValid = (tab: string) => {
    switch (tab) {
      case "personal":
        return (
          formData.name &&
          formData.age &&
          formData.fathersName &&
          formData.mothersName &&
          formData.image
        );
      case "incident":
        return (
          formData.incidentLocation &&
          formData.dateOfIncident &&
          formData.incidentDescription
        );
      case "filler":
        return formData.fillerName && formData.fillerPhone;
      default:
        return false;
    }
  };

  const nextTab = () => {
    if (activeTab === "personal" && isTabValid("personal"))
      setActiveTab("incident");
    else if (activeTab === "incident" && isTabValid("incident"))
      setActiveTab("filler");
  };

  const prevTab = () => {
    if (activeTab === "incident") setActiveTab("personal");
    else if (activeTab === "filler") setActiveTab("incident");
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Add Casualty Information
        </h2>

        <Tabs value={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="personal" disabled={activeTab !== "personal"}>
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="incident" disabled={activeTab !== "incident"}>
              Incident Details
            </TabsTrigger>
            <TabsTrigger value="filler" disabled={activeTab !== "filler"}>
              Filler Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <FormField
              label="Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormField
              label="Age"
              id="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <FormField
              label="Father's Name"
              id="fathersName"
              value={formData.fathersName}
              onChange={handleChange}
              required
            />
            <FormField
              label="Mother's Name"
              id="mothersName"
              value={formData.mothersName}
              onChange={handleChange}
              required
            />
            <FormField
              label="Permanent Address"
              id="permanentAddress"
              type="textarea"
              value={formData.permanentAddress}
              onChange={handleChange}
            />
            <FormField
              label="Nationality"
              id="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
            <FormField
              label="Date of Birth"
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <FormField
              label="NID Number"
              id="nidNumber"
              value={formData.nidNumber}
              onChange={handleChange}
            />
            <div className="mb-4">
              <Label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image
              </Label>
              <Input
                id="image"
                type="file"
                onChange={handleChange}
                className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
          </TabsContent>

          <TabsContent value="incident" className="space-y-4">
            <FormField
              label="Incident Location"
              id="incidentLocation"
              value={formData.incidentLocation}
              onChange={handleChange}
              required
            />
            <FormField
              label="Date of Incident"
              id="dateOfIncident"
              type="date"
              value={formData.dateOfIncident}
              onChange={handleChange}
              required
            />
            <FormField
              label="Description of Incident"
              id="incidentDescription"
              type="textarea"
              value={formData.incidentDescription}
              onChange={handleChange}
              required
            />
            <FormField
              label="Death Certificate Number"
              id="deathCertificate"
              value={formData.deathCertificate}
              onChange={handleChange}
            />
            <div className="mb-4">
              <Label
                htmlFor="scenePhotos"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pictures of the Scene
              </Label>
              <Input
                id="scenePhotos"
                type="file"
                onChange={handleChange}
                className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                multiple
              />
            </div>
          </TabsContent>

          <TabsContent value="filler" className="space-y-4">
            <FormField
              label="Name"
              id="fillerName"
              value={formData.fillerName}
              onChange={handleChange}
              required
            />
            <FormField
              label="Phone Number"
              id="fillerPhone"
              type="tel"
              value={formData.fillerPhone}
              onChange={handleChange}
              required
            />
            <FormField
              label="School/College/University"
              id="fillerInstitution"
              value={formData.fillerInstitution}
              onChange={handleChange}
            />
            <FormField
              label="Address"
              id="fillerAddress"
              type="textarea"
              value={formData.fillerAddress}
              onChange={handleChange}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-5">
          {activeTab !== "personal" && (
            <Button
              type="button"
              onClick={prevTab}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Previous
            </Button>
          )}
          {activeTab !== "filler" ? (
            <Button
              type="button"
              onClick={nextTab}
              disabled={!isTabValid(activeTab)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!isTabValid("filler")}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Submit
            </Button>
          )}
        </div>
      </form>
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submission Successful</AlertDialogTitle>
            <AlertDialogDescription>
              Your information has been submitted successfully. It will be added
              to our records after review. Thank you for your contribution.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleModalClose}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default AddCasualtyForm;
