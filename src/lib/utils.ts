import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  
  return format(d, 'MM/dd/yyyy');
}

export function isValidDate(dateString: string): boolean {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  if (!regex.test(dateString)) return false;
  
  const [month, day, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  return date.getMonth() === month - 1 && 
         date.getDate() === day && 
         date.getFullYear() === year;
}

export function generateFormId(): string {
  return `form_${Math.random().toString(36).substr(2, 9)}`;
}