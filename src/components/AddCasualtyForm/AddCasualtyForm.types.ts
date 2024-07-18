export interface FormData {
  name: string;
  age: string;
  fathersName: string;
  mothersName: string;
  image: File | null | string;
  permanentAddress: string;
  incidentLocation: string;
  dateOfIncident: string;
  incidentDescription: string;
  nationality: string;
  dateOfBirth: string;
  deathCertificate: string;
  nidNumber: string;
  scenePhotos: File[] | null;
  fillerName: string;
  fillerPhone: string;
  fillerInstitution: string;
  fillerAddress: string;
}

export interface FormFieldProps {
  label: string;
  id: keyof FormData;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  className?: string;
  multiple?: boolean;
}
