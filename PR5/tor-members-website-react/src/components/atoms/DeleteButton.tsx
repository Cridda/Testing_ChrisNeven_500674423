import styled from 'styled-components';

const SecondaryButton = styled.button`
    font-weight: 600;
    color: white;
    background-color: ${({ theme }) => theme.colors.danger.rose};
    padding: 1.5rem;
    border: none;
    outline: none;
    text-transform: uppercase;
    u :disabled {
        background-color: grey;
    }
`;

export default SecondaryButton;
