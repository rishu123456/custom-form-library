import React, { useState } from 'react';
import { useDntelForm } from './hooks/useDntelForm';

const sampleData = {
  sections: {
    PersonalInfo: {
      label: "Personal Information",
     // order: 1,
      layout: "full",
      fields: {
        "personal.firstName": {
          label: "First Name",
          type: "text",
          colSpan: 1
        },
        "personal.lastName": {
          label: "Last Name",
          type: "text",
          colSpan: 1
        },
        "personal.dob": {
          label: "Date of Birth",
          type: "date",
          colSpan: 2
        }
      }
    },
    Codes: {
      label: "Codes",
      order: 2,
      layout: "full",
      fields: {
        "codes.diagnosis": {
          label: "Diagnosis Codes",
          type: "select",
          options: [
            { label: "Code 1", value: "code1" },
            { label: "Code 2", value: "code2" },
            { label: "Code 3", value: "code3" }
          ]
        },
        "codes.procedure": {
          label: "Procedure Codes",
          type: "select",
          options: [
            { label: "Proc 1", value: "proc1" },
            { label: "Proc 2", value: "proc2" },
            { label: "Proc 3", value: "proc3" }
          ]
        }
      }
    }
  }
};

function App() {
  const {
    FormComponent,
    changes,
    expandedSections,
    lastChanged,
    expandAll,
    collapseAll,
    editMode,
    setEditMode
  } = useDntelForm({
    initialData: sampleData,
    id: "demo-form"
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dynamic Form Demo</h1>
          <div className="space-x-4">
            <button
              onClick={() => expandAll()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Expand All
            </button>
            <button
              onClick={() => collapseAll()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Collapse All
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 text-sm font-medium ${
                editMode
                  ? 'text-white bg-blue-600 hover:bg-blue-700'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } rounded-md shadow-sm`}
            >
              {editMode ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>

        <FormComponent />

        <div className="mt-4 text-sm text-gray-500">
          {lastChanged && (
            <p>Last changed: {new Date(lastChanged).toLocaleString()}</p>
          )}
          <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto">
            {JSON.stringify(changes, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;