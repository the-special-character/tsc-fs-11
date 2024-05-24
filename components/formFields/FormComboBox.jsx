import React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';

function FormComboBox({ field, options }) {
  return (
    <FormItem className="flex flex-col">
      <FormLabel>Language</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                'w-[200px] justify-between',
                !field.value && 'text-muted-foreground',
              )}
            >
              {field.value
                ? options.find(x => x.value === field.value)?.text
                : 'Select language'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {/* {options.map(x => (
                <CommandItem
                  value={x.text}
                  key={x.value}
                  onSelect={() => {
                    // form.setValue('language', x.value);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      x.value === field.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {x.text}
                </CommandItem>
              ))} */}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>
        This is the language that will be used in the dashboard.
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
}

export default FormComboBox;
