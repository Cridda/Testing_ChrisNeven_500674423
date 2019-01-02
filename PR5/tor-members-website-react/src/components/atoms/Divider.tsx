import styled from 'styled-components';
import { device } from '../../constants/theme';

export const Divider = styled.div<{ small?: boolean }>`
    @media ${device.m} {
        margin-top: ${({ small }) => (small ? '1' : '4')}rem;
        margin-bottom: ${({ small }) => (small ? '1' : '4')}rem;
    }
    margin-top: ${({ small }) => (small ? '0.8' : '1.5')}rem;
    margin-bottom: ${({ small }) => (small ? '0.8' : '1.5')}rem;

    width: 100%;
    height: 1.1px;
    background: ${({ theme }) => theme.colors.light.flash};
`;
