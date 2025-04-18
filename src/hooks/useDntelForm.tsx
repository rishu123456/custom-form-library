import { useState, useCallback, useEffect, useMemo } from 'react';
import { DntelForm } from '../components/DntelForm';

interface UseDntelFormProps {
  initialData: any;
  id?: string;
}

export const useDntelForm = ({ initialData, id }: UseDntelFormProps) => {
  const [changes, setChanges] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [lastChanged, setLastChanged] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  // Load draft from localStorage if id is provided
  useEffect(() => {
    if (id) {
      const savedDraft = localStorage.getItem(`dntel-form-${id}`);
      if (savedDraft) {
        try {
          const { changes: savedChanges, timestamp } = JSON.parse(savedDraft);
          setChanges(savedChanges);
          setLastChanged(timestamp);
        } catch (error) {
          console.error('Error loading draft:', error);
        }
      }
    }
  }, [id]);

  // Save draft to localStorage when changes occur
  useEffect(() => {
    if (id && Object.keys(changes).length > 0) {
      const draft = {
        changes,
        timestamp: Date.now(),
      };
      localStorage.setItem(`dntel-form-${id}`, JSON.stringify(draft));
      setLastChanged(draft.timestamp);
    }
  }, [changes, id]);

  const expandAll = useCallback(() => {
    const allSectionIds = Object.keys(initialData.sections);
    setExpandedSections(allSectionIds);
  }, [initialData]);

  const collapseAll = useCallback(() => {
    setExpandedSections([]);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      if (!expandedSections.includes(sectionId)) {
        setExpandedSections((prev) => [...prev, sectionId]);
      }
    }
  }, [expandedSections]);

  const expandSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) => 
      prev.includes(sectionId) ? prev : [...prev, sectionId]
    );
  }, []);

  const reset = useCallback(() => {
    setChanges({});
    setLastChanged(null);
    if (id) {
      localStorage.removeItem(`dntel-form-${id}`);
    }
  }, [id]);

  const changeValue = useCallback((key: string, value: any) => {
    setChanges((prev) => ({
      ...prev,
      [key]: value,
    }));
    setLastChanged(Date.now());
  }, []);

  const clearLS = useCallback(() => {
    if (id) {
      localStorage.removeItem(`dntel-form-${id}`);
      setLastChanged(null);
    }
  }, [id]);

  const FormComponent = useMemo(() => {
    return (props: any) => (
      <DntelForm
        {...props}
        initialData={initialData}
        changes={changes}
        onChangeValue={changeValue}
        expandedSections={expandedSections}
        setExpandedSections={setExpandedSections}
        editMode={editMode}
      />
    );
  }, [initialData, changes, changeValue, expandedSections, editMode]);

  return {
    FormComponent,
    changes,
    activeSection,
    expandedSections,
    lastChanged,
    expandAll,
    collapseAll,
    scrollToSection,
    expandSection,
    reset,
    changeValue,
    clearLS,
    editMode,
    setEditMode,
  };
};