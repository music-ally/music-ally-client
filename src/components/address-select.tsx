import styled from "styled-components";

interface AddressProps {
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const Select = styled.select`
    padding: 15px;
    border-radius: 10px;
    width: 100%;
    font-size: 16px;
    background-color: black;
    color: #BFBFBF;
    box-sizing: border-box; // padding 조절하여도 너비 그대로
    border: 1px solid #ffffff;
`

export default function Address({ address, setAddress}: AddressProps){
    const addressOptions = [
        {value: '서울', label: '서울'},
        {value: '경기', label: '경기'},
        {value: '인천시', label: '인천시'},
        {value: '대전시', label: '대전시'},
        {value: '대구시', label: '대구시'},
        {value: '부산시', label: '부산시'},
        {value: '광주시', label: '광주시'},
        {value: '강원', label: '강원'},
        {value: '충북', label: '충북'},
        {value: '충남', label: '충남'},
        {value: '경북', label: '경북'},
        {value: '경남', label: '경남'},
        {value: '전북', label: '전북'},
        {value: '전남', label: '전남'},
        {value: '제주', label: '제주'},
    ]

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        setAddress(e.target.value);
    }

    return (
        <Select value={address} onChange={onChange} required>
            <option value="">거주지 선택</option>
            {addressOptions.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    )
}