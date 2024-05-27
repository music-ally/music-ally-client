import { styled } from "styled-components";
import { Row1 } from "./auth-components";

const Select = styled.select`
    padding: 15px;
    border-radius: 10px;
    width: 30%;
    font-size: 16px;
    background-color: black;
    color: #BFBFBF;
    box-sizing: border-box; // padding 조절하여도 너비 그대로
    border: 1px solid #ffffff; 
`

const YearSelect = ()  => (
    <Select>
        <option value="">Year</option>
        {Array.from( { length:100 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
        ))}
    </Select>
);

const MonthSelect = ()  => (
    <Select>
        <option value="">Month</option>
        {Array.from( { length:12 }, (_, i) => i + 1).map(month => (
            <option key={month} value={month}>{month}</option>
        ))}
    </Select>
);

const DaySelect = ()  => (
    <Select>
        <option value="">Day</option>
        {Array.from( { length:31 }, (_, i) => i + 1).map(day => (
            <option key={day} value={day}>{day}</option>
        ))}
    </Select>
);


export default function Birthday() {
    return(
        <Row1>
            <YearSelect />
            <MonthSelect />
            <DaySelect />
        </Row1>
    )
}