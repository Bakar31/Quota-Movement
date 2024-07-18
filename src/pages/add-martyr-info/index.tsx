import AddCasualtyForm from "@/components/AddCasualtyForm/AddCaualtyForm";

const AddCasualtyPage = () => {
  return (
    <div>
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-2xl font-bold">
          Bangladesh Student Movement Tracker
        </h1>
      </header>
      <div className="container mx-auto px-4">
        <AddCasualtyForm />
      </div>
      <footer className="bg-green-600 text-white p-4 mt-8">
        <p>
          &copy; 2024 Bangladesh Student Movement Tracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AddCasualtyPage;
