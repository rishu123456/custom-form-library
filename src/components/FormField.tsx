import React, { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon, X } from 'lucide-react';
import { cn, formatDate, isValidDate } from '../lib/utils';

interface FormFieldProps {
  id: string;
  field: any;
  value: any;
  onChange: (value: any) => void;
  editMode: boolean;
  colSpan?: 1 | 2;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  field,
  value,
  onChange,
  editMode,
  colSpan = 2,
}) => {
  const [dateInput, setDateInput] = useState('');
  const isInvalidType = typeof value === 'string' && field.type !== 'text';

  const handleReset = () => {
    onChange(undefined);
    setDateInput('');
  };

  const renderField = () => {
    

    switch (field.type) {
      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              disabled={!editMode}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">
              {value === true ? 'Yes' : value === false ? 'No' : 'Not set'}
            </span>
          </div>
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={!editMode}
            className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select...</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'date':
        return (
          <div className="relative">
            <Input
              value={dateInput || (value ? formatDate(value) : '')}
              onChange={(e) => {
                setDateInput(e.target.value);
                if (isValidDate(e.target.value)) {
                  onChange(new Date(e.target.value));
                }
              }}
              placeholder="MM/DD/YYYY"
              disabled={!editMode}
              className="pr-10"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "absolute right-0 top-0 h-full px-2",
                    !editMode && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!editMode}
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={(date) => {
                    onChange(date);
                    setDateInput('');
                  }}
                  disabled={!editMode}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        );

        default:
          return (
            <Input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              disabled={!editMode}
              placeholder="Enter something..."
            />
          );
        
    }
  };

  return (
    <div className={`space-y-2 ${colSpan === 2 ? 'col-span-2' : ''}`}>
      <Label htmlFor={id}>{field.label}</Label>
      {renderField()}
    </div>
  );
};