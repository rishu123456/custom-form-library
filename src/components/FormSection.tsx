import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FormField } from './FormField';

interface FormSectionProps {
  id: string;
  section: any;
  changes: Record<string, any>;
  onChangeValue: (key: string, value: any) => void;
  isExpanded: boolean;
  onToggleExpand: (expanded: boolean) => void;
  editMode: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  id,
  section,
  changes,
  onChangeValue,
  isExpanded,
  onToggleExpand,
  editMode,
}) => {
  const isCodesSection = id === 'Codes';

  const renderCodesSection = () => {
    return (
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(section.fields).map(([fieldId, field]: [string, any]) => (
          <div key={fieldId} className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium mb-4 text-gray-900">{field.label}</h4>
            <div className="grid grid-cols-2 gap-4">
              {field.options?.map((option: any) => (
                <div key={option.value} className="flex items-center space-x-3 bg-white p-3 rounded-md shadow-sm">
                  <input
                    type="checkbox"
                    id={`${fieldId}.${option.value}`}
                    checked={changes[`${fieldId}.${option.value}`] || false}
                    onChange={(e) => onChangeValue(`${fieldId}.${option.value}`, e.target.checked)}
                    disabled={!editMode}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label 
                    htmlFor={`${fieldId}.${option.value}`}
                    className="text-sm font-medium text-gray-700 select-none cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDynamicSection = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(section.fields).map(([fieldId, field]: [string, any]) => (
          <FormField
            key={fieldId}
            id={fieldId}
            field={field}
            value={changes[fieldId]}
            onChange={(value) => onChangeValue(fieldId, value)}
            editMode={editMode}
            colSpan={field.colSpan || 2}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      id={`section-${id}`}
      className={`border rounded-lg shadow-sm ${
        section.layout === 'full' 
          ? 'col-span-2' 
          : section.layout === 'right' 
          ? 'col-start-2' 
          : ''
      }`}
    >
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        onClick={() => onToggleExpand(!isExpanded)}
      >
        <span className="font-medium text-gray-900">{section.label}</span>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="p-4 border-t">
          {isCodesSection ? renderCodesSection() : renderDynamicSection()}
        </div>
      )}
    </div>
  );
};