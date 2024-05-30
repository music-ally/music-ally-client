import { styled } from "styled-components";
import { Row1 } from "./auth-components";
import React from "react";

interface SelectProps {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = styled.select`
    padding: 15px;
    border-radius: 10px;
    width: 30%;
    font-size: 16px;
    background-color: black;
    color: #BFBFBF;
    box-sizing: border-box;
    border: 1px solid #ffffff; 
`;

// 각각의 Select 컴포넌트에 props를 추가하여 상태와 상태 설정 함수를 받을 수 있도록 변경
const YearSelect: React.FC<SelectProps> = ({ value, onChange }) => (
    <Select value={value} onChange={onChange}>
        <option value="">Year</option>
        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
        ))}
    </Select>
);

const MonthSelect: React.FC<SelectProps> = ({ value, onChange }) => (
    <Select value={value} onChange={onChange}>
        <option value="">Month</option>
        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <option key={month} value={month}>{month}</option>
        ))}
    </Select>
);

const DaySelect: React.FC<SelectProps> = ({ value, onChange }) => (
    <Select value={value} onChange={onChange}>
        <option value="">Day</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
            <option key={day} value={day}>{day}</option>
        ))}
    </Select>
);

interface BirthdayProps {
    year: string | number;
    month: string | number;
    day: string | number;
    setYear: React.Dispatch<React.SetStateAction<string>>;
    setMonth: React.Dispatch<React.SetStateAction<string>>;
    setDay: React.Dispatch<React.SetStateAction<string>>;
}

// Birthday 컴포넌트에서 props를 받아 각 Select 컴포넌트로 전달
export default function Birthday({ year, month, day, setYear, setMonth, setDay }: BirthdayProps) {
    return (
        <Row1>
            <YearSelect value={year} onChange={(e) => setYear(e.target.value)} />
            <MonthSelect value={month} onChange={(e) => setMonth(e.target.value)} />
            <DaySelect value={day} onChange={(e) => setDay(e.target.value)} />
        </Row1>
    );
}