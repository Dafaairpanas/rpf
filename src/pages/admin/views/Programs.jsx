import GenericCrudView from "../components/GenericCrudView";

const config = {
  title: "CSR Programs",
  columns: [
    { key: "name", label: "Program Name", type: "text" },
    { key: "budget", label: "Budget (USD)", type: "number" },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ],
  initialData: [
    { id: 1, name: "Community Outreach", budget: 50000, status: "Active" },
    { id: 2, name: "Environmental Fund", budget: 30000, status: "Active" },
  ],
};

const Programs = () => <GenericCrudView config={config} />;

export default Programs;
