import React, { FC, ReactNode } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';

export interface SelectOption {
    value: string;
    item: ReactNode;
}

interface SelectProps {
    value: string | number | number[];
    options: SelectOption[];
    onChange: (value: string) => void;
    label?: string;
    withNone?: boolean;
    size?: 'small' | 'medium'; 
    className?: string;
}

const Select: FC<SelectProps> = ({ 
    value,
    options,
    label,
    withNone=false, 
    size='medium',
    className,
    onChange,
}) => {

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <FormControl sx={{ minWidth: 120 }} size={size} className={className}>
            {label && <InputLabel>{label}</InputLabel>}
            <MuiSelect
                value={value}
                label={label}
                onChange={handleChange}
            >
                {withNone && (
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                )}
                {options.map(({ value, item }) => (
                    <MenuItem key={value} value={value}>
                        {item}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export default Select;
