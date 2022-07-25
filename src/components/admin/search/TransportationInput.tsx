import React, { ChangeEvent, KeyboardEvent, RefObject, useState } from 'react';
import styled from 'styled-components';

const transportaions = [
  '버스',
  '지하철',
  '택시',
  'KTX/기차',
  '도보',
  '전동킥보드',
  '자가용',
];

interface ITransportationInputProps {
  placeholder: string;
  inputRef: RefObject<HTMLInputElement>;
  handelKeypress: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function TransportationInput({
  placeholder,
  inputRef,
  handelKeypress,
}: ITransportationInputProps) {
  const [options, setOptions] = useState(transportaions);

  const changeOptionList = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const blankRegex = /\s/gi;
    const lastCommaRegex = /,$/;
    const data = value.replace(blankRegex, '').split(',');

    if (value.match(lastCommaRegex)) {
      if (!transportaions.includes(data[data.length - 2]))
        return alert('리스트에 없는 이용수단입니다');

      const list = transportaions
        .filter(transportaion => !data.includes(transportaion))
        .map(item => `${value}${item}`);

      list.unshift(value.replace(lastCommaRegex, ''));

      setOptions(list);
    }
  };

  return (
    <>
      <Input
        type="text"
        list="transportation"
        ref={inputRef}
        onChange={changeOptionList}
        onKeyDown={handelKeypress}
        placeholder={placeholder}
      />
      <DataList id="transportation">
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </DataList>
    </>
  );
}

const Input = styled.input`
  width: 360px;
  height: 30px;
`;
const DataList = styled.datalist``;
const Option = styled.option``;