import styled from 'styled-components';
import { device } from '../../constants/theme';

interface Props {
    threeColumns?: boolean;
}
const ContentBlock = styled.div<Props>`
    display: grid;
    grid-row-gap: 2rem;
    padding: 1rem 0;
    grid-template-columns: 1fr;
    @media ${device.m} {
        grid-template-columns: ${({ threeColumns }) => (threeColumns ? '0.4fr 1.1fr 0.5fr' : '0.4fr 1.6fr')};
    }
`;

export default ContentBlock;
