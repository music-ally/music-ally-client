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
        {value: '인천', label: '인천'},
        {value: '대전', label: '대전'},
        {value: '대구', label: '대구'},
        {value: '광주', label: '광주'},
        {value: '부산', label: '부산'},
        {value: '울산', label: '울산'},
        {value: '세종', label: '세종'},
        {value: '경기', label: '경기'},
        {value: '충청', label: '충청'},
        {value: '경상', label: '경상'},
        {value: '전라', label: '전라'},
        {value: '강원', label: '강원'},
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