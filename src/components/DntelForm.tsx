import React, { useMemo } from 'react';
import { FormSection } from './FormSection';

interface DntelFormProps {
  initialData: any;
  changes: Record<string, any>;
  onChangeValue: (key: string, value: any) => void;
  expandedSections: string[];
  setExpandedSections: React.Dispatch<React.SetStateAction<string[]>>;
  editMode: boolean;
}

export const DntelForm: React.FC<DntelFormProps> = ({
  initialData,
  changes,
  onChangeValue,
  expandedSections,
  setExpandedSections,
  editMode,
}) => {
  const sortedSections = useMemo(() => {
    return Object.entries(initialData.sections)
      .sort(([, a]: [string, any], [, b]: [string, any]) => a.order - b.order);
  }, [initialData]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {sortedSections.map(([sectionId, section]: [string, any]) => (
        <FormSection
          key={sectionId}
          id={sectionId}
          section={section}
          changes={changes}
          onChangeValue={onChangeValue}
          isExpanded={expandedSections.includes(sectionId)}
          onToggleExpand={(expanded) => {
            setExpandedSections((prev) =>
              expanded
                ? [...prev, sectionId]
                : prev.filter((id) => id !== sectionId)
            );
          }}
          editMode={editMode}
        />
      ))}
    </div>
  );
};