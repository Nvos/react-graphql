import styled from 'styled-components';

const Card = styled.div`
  padding: 12px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  margin: 12px;
  border-radius: 4px;
`;

const CardTitle = styled.h1`
  font-weight: 500;
  text-align: center;
  border-bottom: 1px gray solid;
  margin-bottom: 12px;
  word-break: break-all;
  margin-top: 0;
`;

const CardFooter = styled.h4`
  font-weight: 500;
  text-align: center;
  border-top: 1px gray solid;
  margin-top: 12px;
`;

export default Card;
export { CardTitle, CardFooter };
