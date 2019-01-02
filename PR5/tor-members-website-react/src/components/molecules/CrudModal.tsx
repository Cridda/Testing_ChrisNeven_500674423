import React, { Component, ReactNode, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import SecondaryButton from '../atoms/SecondaryButton';
import styled from 'styled-components';

interface State {
    open: boolean;
}

interface Props {
    children?: ReactNode;
}

export default class CrudModal extends Component<Props, State> {
    state = {
        open: false
    };
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    public render() {
        const { open } = this.state;
        return (
            <Fragment>
                <Modal center open={open} onClose={this.onCloseModal}>
                    <Container>{this.props.children}</Container>
                </Modal>
                <SecondaryButton onClick={() => this.onOpenModal()} type="button">
                    Badkamer toevoegen
                </SecondaryButton>
            </Fragment>
        );
    }
}

const Container = styled.div`
    padding: 2rem 5rem 3rem 5rem;
`;
